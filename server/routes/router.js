const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// this is to render pages when specified buttons are clicked due to which certain get requests are made
/**
 * @description Login Route
 * @method GET /
 */
route.get('/', services.loginRoute);

/**
 * @description SignUp Route
 * @method GET /signup
 */
route.get('/signup', services.signUpRoute);

/**
 * @description home Route
 * @method GET /home
 */
route.get('/home', services.homeRoute);

/**
 * @description home Route
 * @method GET /feedback
 */
route.get('/feedback', services.feedback);

// handing API requests
// signup new user
route.post('/signup', controller.signup);

// login user
route.post('/login', controller.login);

// book a ride
route.post('/ride-booking', controller.ridebooking);

module.exports = route;
