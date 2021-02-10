const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');//by defult index invoked
const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    next();
});

app.use('/', routes);

//Get /users
//Get /posts 


app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'Not Found Error' });

});

app.use((err, req, res, next) => {

    if (err instanceof mongoose.Error.ValidationError )
    return  res.status(422).json(err.errors);

    if (err.code === 11000)
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });

    if (err.message === 'UN_AUTHENTICATED')
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });

    if (err.status === 400) {
        res.status(400).json({ type: err.type });
    }
 
    res.json(err.message);
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log('ServerIsReadyOn:', PORT);
});