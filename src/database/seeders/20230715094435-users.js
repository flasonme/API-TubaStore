'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
/** @type {import("sequelize-cli").Migration} */
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
      const transaction = await queryInterface.sequelize.transaction();
      const users = [];
      const profiles = [];
      for (let i = 0; i < 100; i++) {
        const userId = uuidv4();
        users.push({
          id: userId,
          email: faker.internet.email(),
          password: await bcrypt.hash(faker.internet.password(), 10),
          role: 'USER',
        });
        profiles.push({
          user_id: userId,
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          phone_number: faker.phone.number(),
          date_of_birth: faker.date.past(),
          home_address: faker.location.streetAddress(),
          work_address: faker.location.secondaryAddress(),
          custom_address: faker.location.secondaryAddress(),
          avatar: faker.internet.avatar(),
        });
      }
      try {
        await queryInterface.bulkInsert('users', users, { transaction });
        await queryInterface.bulkInsert('profiles', profiles, { transaction });
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },

    async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      const transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.bulkDelete('profiles', null, { transaction });
        await queryInterface.bulkDelete('users', null, { transaction });
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },
  }
);
