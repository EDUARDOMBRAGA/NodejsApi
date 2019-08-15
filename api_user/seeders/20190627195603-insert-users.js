'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          //CustomerId: '1',
          //DepartmentId: '1',
          //FunctionId: '1',
          //ProfileId: '1',
          //UserStatusId: '1',
          Avatar: '',
          UserMainEmail: 'admin@email.com',
          UserPassword: 'admin123',
          UserName: 'Administrador',
          UserGender: 'M',
          UserBirthDate: '1985-10-11',
          UserCPF: '485789654789',
          UserFirstLoginDate: '1985-10-11'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
