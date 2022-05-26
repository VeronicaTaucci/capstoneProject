'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('media_albums', {
      mediaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Media',
          key: 'id'
        }
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'albums',
          key: 'id'
        }
      },
    })
  },

      async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    }
  }
;
