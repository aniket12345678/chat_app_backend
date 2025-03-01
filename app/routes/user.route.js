const express = require('express');
const { SignUp, SignIn, fetchAllUsers } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/middleware');

const UserRoute = express();

UserRoute.post('/signup', SignUp);
UserRoute.post('/signin', SignIn);
UserRoute.post('/user-list', verifyToken(), fetchAllUsers);

module.exports = { UserRoute }