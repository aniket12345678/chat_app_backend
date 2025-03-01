const { DataTypes } = require("sequelize");
const { newConnection } = require("../config/connection");

const ChatModel = newConnection.define("chat", {
    // c_id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

ChatModel.sync({ alter: true }).then(() => {
    console.log('ChatModel formed');
}).catch((err) => {
    console.log('ChatModel not formed', err);
})

module.exports = { ChatModel }