'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
(
  module.exports = {
    async up(queryInterface, Sequelize) {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
       */
      const users = [];
      for (let i = 0; i < 100; i++) {
        users.push({
          id: uuidv4(),
          email: faker.internet.email(),
          password: await bcrypt.hash(faker.internet.password(), 10),
          role: 'USER',
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          avatar: faker.internet.avatar(),
        });
      }
      await queryInterface.bulkInsert('users', users, {});
    },

    async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await queryInterface.bulkDelete('users', null, {});
    },
  }
);
