const model = require('../Models/personel');
//GET /ticket send new ticket form
exports.getTicket = (req, res) =>{
    res.render('./main/newTicket.ejs');
}

//GET /about send about page
exports.getAbout = (req, res) =>{
    res.render('./main/aboutUs.ejs')
}

//get /faq send faq page
exports.getFAQ = (req, res) =>{
    //console.log('ahoy')
    res.render('./main/faq.ejs')
}

//get /guest send guest list
exports.getGuestList = (req, res) =>{
    res.render('./main/guest.ejs')
}

//get / send terms of condition
exports.getTerms = (req, res) =>{
    res.render('./main/termOfCondition.ejs')
}
