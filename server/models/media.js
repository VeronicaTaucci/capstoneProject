'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.media.belongsTo(models.users, { foreignKey: 'userId' }),
      models.media.belongsTo(models.users, { foreignKey: 'userProfileId' })

    }
  }
  media.init({
    comment: DataTypes.STRING,
    recording: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userProfileId: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING,
    mediaFormat: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};