// const Sequelize = require("sequelize");
import Sequelize from 'sequelize';
const sequelize = new Sequelize('map', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;