const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');//by defult index invoked
const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect( MONGODB_URI , { useUnifiedTopology: true });


app.use(express.json());
app.use('/', routes);
//Get /users
//Get /posts 


app.use((req, res, next) => {
    res.status(404).json({ err: 'Not Found Error' });

});

app.use((err, req, res, next) => {
    //map Error Then send it for user
    // Which type of error???
    // debugger;
    // if (err instanceof (mongoose.Error.ValidationError)) {
    //     res.status(422).json(err.errors);
    // }
    switch(err){
        case err instanceof (mongoose.Error.ValidationError):
        res.status(422).json(err.errors);
        break;

        case err.code===11000 :
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
        break;

        case err.message==='UN_AUTHENTICATED':
        res.status(401).json({ statusCode:'UN_AUTHENTICATED' } );
        break;
    }
    res.status(503).json({er:'reqiredValues'});
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log('ServerIsReadyOn:', PORT);
});