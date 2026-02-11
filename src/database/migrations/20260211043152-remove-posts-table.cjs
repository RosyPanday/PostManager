'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * We drop the 'Posts' table. 
     * We use "cascade: true" if you want to ensure any 
     * forgotten foreign keys don't block the deletion.
     */
    await queryInterface.dropTable('Posts', { cascade: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Usually, we'd recreate the table here for a rollback,
     * but since you are moving to a new tracking system, 
     * leaving this empty is fine.
     */
  }
};