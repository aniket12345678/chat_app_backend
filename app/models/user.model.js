const { DataTypes } = require("sequelize");
const { newConnection } = require("../config/connection");

const UserModel = newConnection.define('users', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

UserModel.sync({ alter: true }).then(() => {
    console.log('UserModel formed');
}).catch((err) => {
    console.log('UserModel not formed', err);
});

module.exports = { UserModel };