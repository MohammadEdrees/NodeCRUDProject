const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const routes = require('./routes');

const app = express();

//--Mongoose Connection
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });
//----------------------------------------------multer//
const storage=multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'./images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://myfirstnode7.herokuapp.com");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    

    next();
});
app.use(express.json());

app.use('/', routes);


app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'Not Found Error' });

});


//Err Handler
app.use((err, req, res, next) => {

    if (err instanceof mongoose.Error.ValidationError )
      return res.status(422).json(err.errors);

    if (err.code === 11000)
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });

    if (err.message === 'UN_AUTHENTICATED')
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });

    if (err.code === 400) {
        res.status(400).json({ type: err.type });
    }
 
    res.json(err);
});

//PORT
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log('ServerIsReadyOn:', PORT);
});