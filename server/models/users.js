'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.media, { foreignKey: 'userId' })
    }
    }

  users.init({
    email: DataTypes.STRING,
<<<<<<< HEAD
    password: DataTypes.STRING,
    name: DataTypes.STRING
    
=======
    name: DataTypes.STRING,
    password: DataTypes.STRING
>>>>>>> main
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};