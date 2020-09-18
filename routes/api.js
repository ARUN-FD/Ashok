// API
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/User.Controller')

const passport = require('passport')
const path = require('path')

const jwtAuth = require('../middleware/passport')
const { route } = require('../app')

const authUser = jwtAuth(passport).authenticate("jwt", { session: false });

//user routes

router.post('/create', UserController.create);
router.get('/get', UserController.get);
router.get('/gets', UserController.gets);


// router.post('/payment', authUser, PaymentController.createPayment);

module.exports = router