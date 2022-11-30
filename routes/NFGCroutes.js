const express = require('express');
const router = express.Router();
const controller = require('../Controllers/NFGCcontroller')

//GET all connections
router.get('/', controller.index);


//GET /connections/new: Make new connection. send form
router.get('/new', controller.new);


//POST /connections: create new connections
router.post('/', controller.create)

//GET /connections/id: get events by id
router.get('/:id',controller.show);

//GET /connectiond/:id/edits: send connection by id for editing
router.get('/:id/edit',controller.edit);

//PUT /connections/:id: update connections with id
router.put('/:id', controller.update);

//delete /connections/:id delete cevent with id
router.delete('/:id', controller.delete);




module.exports = router;



