"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("user", "UserDeletedDate", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("user", "UserDeletedUser", {
        type: Sequelize.BIGINT(20)
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("user", "UserDeletedDate"),
      queryInterface.removeColumn("user", "UserDeletedUser")
    ]);
  }
};
