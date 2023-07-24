'use strict';
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
/** @type {import("sequelize-cli").Migration} */
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
    const products = [];
    const variants = [];
    for (let i = 0; i < 10; i++) {
      const productId = uuidv4();
      const isSale = faker.datatype.boolean();
      products.push({
        id: productId,
        sku: faker.string.alphanumeric(8),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        brand: faker.helpers.arrayElement([
          'NO_BRAND',
          'NIKE',
          'ADIDAS',
          'PUMA',
          'REEBOK',
        ]),
        category: faker.commerce.department(),
        price: faker.commerce.price({ dec: 0 }),
        sale: isSale,
        discount: isSale ? faker.number.int({ min: 1, max: 99 }) : 0,
        stock: faker.number.int({ min: 1, max: 100 }),
        new: faker.datatype.boolean(),
        images: [faker.image.url()],
        status: 'ACTIVE',
        tags: [faker.commerce.productAdjective()],
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
    try {
      await queryInterface.bulkInsert('products', products, { transaction });
      await queryInterface.bulkInsert('variants', variants, { transaction });
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
      await queryInterface.bulkDelete('variants', null, { transaction });
      await queryInterface.bulkDelete('products', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
