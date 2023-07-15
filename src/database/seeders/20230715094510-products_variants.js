'use strict';
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
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
    const products = [];
    const variants = [];
    for (let i = 0; i < 10; i++) {
      const productId = uuidv4();
      products.push({
        id: productId,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        price: faker.commerce.price({ dec: 0 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        images: [faker.image.url()],
        status: 'ACTIVE',
      });
      for (let i = 1; i <= 5; i++) {
        variants.push({
          id: uuidv4(),
          product_id: productId,
          size: i,
          color: faker.color.rgb(),
          price: faker.commerce.price({ dec: 0 }),
          stock: faker.number.int({ min: 1, max: 10 }),
          images: [faker.image.url()],
          status: 1,
        });
      }
    }
    await queryInterface.bulkInsert('products', products, {});
    await queryInterface.bulkInsert('variants', variants, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('variants', null, {});
    await queryInterface.bulkDelete('products', null, {});
  },
};
