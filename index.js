const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);

app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    // res.send("pints")
    res.render("index");
});

// LISTENING
server.listen(process.env.PORT || 3000, () => {
    console.log('Serving on port 3000');
})