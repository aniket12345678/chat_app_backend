const express = require('express');
const { UserRoute } = require('./user.route');
const { ChatRoute } = require('./chat.route');

const AllRoutes = express();

AllRoutes.use('/user', UserRoute);
AllRoutes.use('/chat', ChatRoute);

module.exports = { AllRoutes }