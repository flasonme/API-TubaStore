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
    // Get all users
    const users = await queryInterface.sequelize.query(
      'SELECT id from users;',
      { type: Sequelize.QueryTypes.SELECT },
    );
    const products = await queryInterface.sequelize.query(
      'SELECT *, variants.id as variant_id, variants.price as variant_price from products left join variants on products.id = variants.product_id;',
      { type: Sequelize.QueryTypes.SELECT },
    );
    const carts = [];
    const orders = [];
    for (let i = 0; i < users.length; i++) {
      const haveCart = faker.datatype.boolean();
      const isBought = faker.datatype.boolean();
      if (isBought && haveCart) {
        const boughtProducts = {
          cart: [
            {
              id: uuidv4(),
              user_id: users[i].id,
              product_id:
                products[faker.number.int({ min: 0, max: products.length - 1 })]
                  .id,
              variant_id:
                products[faker.number.int({ min: 0, max: products.length - 1 })]
                  .variant_id,
              quantity: faker.number.int({ min: 1, max: 10 }),
              price:
                products[faker.number.int({ min: 0, max: products.length - 1 })]
                  .variant_price,
            },
          ],
          total_price: 0,
        };
        orders.push({
          id: uuidv4(),
          order_code: faker.string.fromCharacters(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            6,
          ),
          user_id: users[i].id,
          products: JSON.stringify(boughtProducts),
          total_price:
            +boughtProducts.cart[0].price * +boughtProducts.cart[0].quantity,
          status: faker.number.int({ min: 1, max: 6 }),
          payment_method: faker.number.int({ min: 1, max: 2 }),
          payment_status: faker.number.int({ min: 0, max: 1 }),
          created_at: faker.date.past(),
          updated_at: faker.date.past(),
        });
        continue;
      }
      if (haveCart) {
        carts.push({
          id: uuidv4(),
          user_id: users[i].id,
          product_id:
            products[faker.number.int({ min: 0, max: products.length - 1 })]
              .product_id,
          variant_id:
            products[faker.number.int({ min: 0, max: products.length - 1 })]
              .variant_id,
          quantity: faker.number.int({ min: 1, max: 10 }),
          price:
            products[faker.number.int({ min: 0, max: products.length - 1 })]
              .variant_price,
        });
      }
    }
    await queryInterface.bulkInsert('carts', carts);
    await queryInterface.bulkInsert('orders', orders);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
