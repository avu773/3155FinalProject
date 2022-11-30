//require module
const express = require('express');
const morgan = require('morgan');
const NFGCroutes = require('./routes/NFGCroutes');
const NFGCMainRoutes = require('./routes/NFGCMainRoutes')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


//create app
const app = express();

//config app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD'
app.set('view engine', 'ejs');

//connect to mongoose
mongoose.connect(url)
.then(()=>{
//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})

//mount middle ware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'));
app.use(methodOverride('_method'))


//set up routes
app.get('/', (req, res) => {
    res.render('index');
})
app.use('/Connections', NFGCroutes );
app.use('/Main', NFGCMainRoutes);

//error middleware
app.use(( req, res, next)=>{
    let err = new Error('Cannot find'+ req.url)
    err.status = 404
    //console.log('no')
    next(err)
})
app.use((err, req, res, next)=>{
    console.log(err.stack)
    if(!err.status){
        err.status = 500
        //console.log(err.status)
        err.message = ('Internal server error')
    }
    //console.log('noo')
    res.status(err.status) 
    res.render('./Error.ejs', {error:err})
})





