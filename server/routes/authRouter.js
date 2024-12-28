const express = require('express');
const { loginValidation, signupValidation } = require('../middleware/authValidation');
const { login, signup } = require('../controllers/authControllers');

const authRouter = express.Router();

authRouter.route('/login').post(loginValidation, login);
authRouter.route('/signup').post(signupValidation, signup);

module.exports = authRouter;