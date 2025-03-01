const express = require('express');
const { AddMessage, Listing } = require('../controllers/chat.controller');
const { verifyToken } = require('../middleware/middleware');

const ChatRoute = express();

ChatRoute.post('/add', verifyToken(), AddMessage);
ChatRoute.post('/listing', verifyToken(), Listing);

module.exports = { ChatRoute }