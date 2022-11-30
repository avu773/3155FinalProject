const express = require('express');
const Mainrouter = express.Router();
const Maincontroller = require('../controllers/NFGCMaincontroller')

//GET Main/ticket: send new ticket form
Mainrouter.get('/ticket', Maincontroller.getTicket);

//GET Main/about: send about us page
Mainrouter.get('/about', Maincontroller.getAbout)

//GET Main/FAQ: send about us page, should make a model in the future
Mainrouter.get('/faq', Maincontroller.getFAQ)

//GET MAIN/guest: send guest list page, can make a model in the future
Mainrouter.get('/guest', Maincontroller.getGuestList)

//GET MAIN/TOC: send term of condition
Mainrouter.get('/TOC', Maincontroller.getTerms)

module.exports = Mainrouter;