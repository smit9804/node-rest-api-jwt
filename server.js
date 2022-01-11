const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const movies = require('./routes/MovieRoutes');
const users = require('./routes/UserRoutes');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    res.json({"tutorial": "Build REST API with Node JS"});
});

app.listen(3000, function() {
    console.log('Node server listening on port 3000');
});

//public route
app.use('/users', users);

//private route
app.use('/movies', validateUser, movies);

function validateUser(req, res, next){
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if (err){
            res.json({status: "error", message: err.message, data: null});
        }
        else{
            req.body.userId = decoded.id;
            next();
        }
    });
}

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    console.log(err);
    if(err.status === 404){
        res.status(404).json({message: "Not found"});
    }
    else{
        res.status(500).json({message: "Something went wrong"});
    }
});