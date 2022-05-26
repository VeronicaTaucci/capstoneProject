'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media_albums extends Model {
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
        models.Media.belongsToMany(models.albums, {
          through: 'media_albums',
          foreignKey: 'mediaId'
        })
    }
  }
  media_albums.init({
    mediaId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'media_albums',
    timestamps: false
  });
  return media_albums;
};