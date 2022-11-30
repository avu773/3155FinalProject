const model = require('../Models/connection')
//GET all connections
exports.index = (req, res, next) =>{
    model.find()
    .then(connections =>res.render('./Connection/connections.ejs', {connections}))
    .catch(err => next(err))
    
    
};


//GET /connections/new: Make new connection. send form
exports.new = (req, res) => {
    res.render('./Connection/new_connection.ejs');
};


//POST /connections: create new connections
exports.create = (req, res,next) =>{
    //console.log(req.body)
    //create new doc
    let connection = new model(req.body)
    //insert doc to db
    connection.save()
    .then((connection)=>{
        res.redirect('/Connections')
    })
    .catch(err =>{
        if (err.name == "ValidationError"){
            err.status = 404
        }
        next(err)
    })
    
    //res.send('uhhhh')
};

//GET /connections/id: get events by id
exports.show = (req, res, next) =>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id')
        err.status = 400
        return next(err)
    }
    model.findById(id)
    .then(connection =>{
        if(connection) {
            res.render('./Connection/connection.ejs', {connection} )
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    } )
    .catch(err => next(err))
    
};

//GET /connectiond/:id/edits: send connection by id for editing
exports.edit = (req, res, next) =>{
    let id = req.params.id
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id')
        err.status = 400
        return next(err)
    }
    model.findById(id)
    .then(connection =>{
        if(connection) {
            console.log('edit')
            res.render('./Connection/edit_connection.ejs', {connection});
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }
    } )
    .catch(err => next(err)) 
};

//PUT /connections/:id: update connections with id
exports.update = (req, res, next) =>{
    //res.send('send edited connections with id ' + req.params.id);
    let connection = req.body
    let id = req.params.id
    //console.log(connection)
    //console.log(id)
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id')
        err.status = 400
        return next(err)
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then( connection=>{
        if (connection) {
            //console.log(1)
            res.redirect('/Connections/' + id)
        } else {
         let err = new Error('Cannot find a event with id ' + id);
             err.status = 404;
             next(err);
        }
    })
    .catch( err =>{
        if (err.name == "ValidationError"){
            err.status = 404
        }
        next(err)
    })
};

//delete /connections/:id delete cevent with id
exports.delete = (req, res, next) =>{
    let id = req.params.id

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id')
        err.status = 400
        return next(err)
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        if (connection){
            res.redirect('/Connections')
        }
        else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err)) 
    
};


