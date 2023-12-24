import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const Location = sequelize.define("location", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING,
  imagePath: Sequelize.STRING,
});
export default Location;