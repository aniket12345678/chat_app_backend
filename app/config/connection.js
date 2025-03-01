const { Sequelize } = require("sequelize");

const newConnection = new Sequelize('chat_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
    }
})

newConnection.authenticate().then(() => {
    console.log('Connection success');
}).catch((err) => {
    console.log('Connection failure', err);
});

module.exports = { newConnection }