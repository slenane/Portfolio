require('dotenv').config();
const ExpressError = require("./util/ExpressError");
const express = require('express');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const socketio = require("socket.io");
const helmet = require('helmet');
const http = require('http');
const path = require('path');
const mailService = require('./util/mailService');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(compression());

app.use(async (req, res, next) => {
    try {
        let randomNonce = uuidv4();
        res.setHeader('Content-Security-Policy', `base-uri 'self'; object-src 'none'; script-src 'nonce-${randomNonce}' 'unsafe-eval' 'strict-dynamic' https: http:;`);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.get('/', (req, res, next) => {
    // res.sendFile((__dirname + '/views/coming-soon.html'));
    res.render("index");
});

// ERROR SETTINGS
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.log(err);
    err.message = "Oh no, something went wrong!";
    err.statusCode = statusCode;
    res.status(statusCode).render("error", { err, path: '/error' });
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