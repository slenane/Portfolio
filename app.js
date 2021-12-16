require('dotenv').config();
const mailService = require('./util/mailService');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const socketio = require("socket.io");
const ejsMate = require('ejs-mate');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

// APP SETTINGS
app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());

// If the user is not on HTTPS, then redirect
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

app.use(async (req, res, next) => {
    try {
        let randomNonce = uuidv4();
        res.setHeader('Content-Security-Policy', `base-uri 'self'; object-src 'none'; script-src 'nonce-${randomNonce}' 'unsafe-eval' 'strict-dynamic' https: http:;`);
        res.locals.randomNonce = randomNonce;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.get('/', (req, res, next) => {
    res.render("index");
});

// ERROR SETTINGS
app.all("*", (req, res, next) => {
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.redirect('/');
});

// SOCKET.IO
io.on('connection', (socket) => {
    socket.on("send mail", async (mail) => {
        try {
            // Send the mail
            let mailSent = await mailService.sendMail(mail);
            // Return delivery status of email
            socket.emit("mail sent", mailSent);
        } catch (err) {
            return err;
        }
    });
});

// LISTENING
server.listen(process.env.PORT || 3000, () => {
    console.log('Serving on port 3000');
})