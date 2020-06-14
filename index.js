const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const server = express();
const path = require('path');

const apiRoute = require('./routes/API/index.js')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

server.use('/', express.static(path.join(__dirname, '/public')))
server.use('/api', apiRoute.route);

const port = process.env.PORT || 3000;

server.listen(port, function(){
    console.log(`Server up and running on port: ${port}`);
})