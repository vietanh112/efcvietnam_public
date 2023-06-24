'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        id:1,
        username: 'admin',
        password: '$2b$10$d2.U.Y.dV0JF1X3FlGcCNeWTb/0YHf4ZPzFPIMPgb4vqUv8xABe3S', //admin123
        email: 'admin@efc.com.vn',
        roleId: 2,
        allow: 1,
        status: 1,
        token: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        username: 'superadmin',
        password: '$2b$10$.Yylat1mec6H5cEoEVE1o.zD4rsPRrFaD4S4DxueMGR78lT2X2N4y', //superadmin123
        email: 'admin@efc.com.vn',
        roleId: 1,
        allow: 1,
        status: 1,
        token: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3,
        username: 'user',
        password: '$2b$10$L7UyHqjJjmV9t0BffXMP5.9wgF3O3veQw3V7M1CboDfIvuTI2HtTG', //user123!!
        email: 'admin@efc.com.vn',
        roleId: 3,
        allow: 1,
        status: 1,
        token: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
        {
            id: 4,
            username: 'anhnhv',
            password: '$2b$10$d3EiAQLVYZATD097JxRHmeihGaVA2wjKZByj3HE2sfCFjNchHYxdW',
            email: 'anh.nhv@shb.com.vn',
            roleId: 1,
            allow: 1,
            status: 1,
            token: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
