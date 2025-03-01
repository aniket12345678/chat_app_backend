const express = require("express");
require("dotenv").config();
const cors = require('cors');
const { AllRoutes } = require("./routes/index.route");

// Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer,
    {
        cors: {
            origin: "http://localhost:5173"
        }
    }
);

io.on('connection', (socket) => {
    console.log('socket.id:- ', socket.id);
    socket.on('send_message', (message) => {
        io.emit('fetch_user_messages', message);
    });
});

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Sample route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to express app" });
});

app.use('/api', AllRoutes);