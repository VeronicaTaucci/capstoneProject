'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Media.belongsTo(models.users, {foreignKey: 'userId', targetKey: 'id'})
    }
  }
  Media.init({
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING,
    mediaFormat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};