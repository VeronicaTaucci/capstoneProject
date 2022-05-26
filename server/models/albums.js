'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
 
    static associate(models) {
      // define association here
      models.albums.belongsToMany(models.Media, {
        through: 'media_albums',
        foreignKey: 'albumId'
      }),
        models.albums.belongsTo(models.users, {
          foreignKey: 'userId',
          key: 'id'
      })
    }
  }
  albums.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'albums',
  });
  return albums;
};