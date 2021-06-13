const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');


//Routes of Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

//Routes of contact
route.get('/contact', contactController.contact);

module.exports = route;

