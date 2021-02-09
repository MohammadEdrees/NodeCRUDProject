const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');//by defult index invoked
const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect( MONGODB_URI , { useUnifiedTopology: true });
const cors = require('cors');

app.use(express.json());``
app.use(cors());
app.use('/', routes);

//Get /users
//Get /posts 


app.use((req, res, next) => {
    res.status(404).json({ err: 'Not Found Error' });

});

app.use((err, req, res, next) => {
    
        if( err instanceof (mongoose.Error.ValidationError))
        res.status(422).json(err.errors);
        if( err.code===11000 )
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
        if( err.code===500 )
        res.status(500).json({ statusCode: 'Server Err ', property: err.keyValue });
        if(err.message==='UN_AUTHENTICATED')
        res.status(401).json({ statusCode:'UN_AUTHENTICATED' } );
        else    
        res.status(503).json({statusCode:"Not Valid  "});
   
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log('ServerIsReadyOn:', PORT);
});