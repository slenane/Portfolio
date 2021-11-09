const express = require('express');
const compression = require('compression');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);

app.use(compression());

// app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile((__dirname + '/views/coming-soon.html'));
    // res.render("index");
});

// LISTENING
server.listen(process.env.PORT || 3000, () => {
    console.log('Serving on port 3000');
})