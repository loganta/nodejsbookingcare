//require sequelize to use this services
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bookingcare', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

let conectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = conectDB;