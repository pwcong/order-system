'use strict';

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

module.exports = {
  async up(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const salt = uuidv1();

    await queryInterface.bulkInsert('users', [
      {
        id: 10000,
        type: 999,
        username: 'admin',
        phone: '13000000000',
        email: 'admin@os.com',
        password: uuidv5('123456', salt),
        password_salt: salt
      },
      {
        id: 10001,
        type: 1,
        username: 'customer',
        phone: '13000000001',
        email: 'customer@email.com',
        password: uuidv5('123456', salt),
        password_salt: salt
      },
      {
        id: 10002,
        type: 2,
        username: 'business',
        phone: '13000000002',
        email: 'business@email.com',
        password: uuidv5('123456', salt),
        password_salt: salt
      },
      {
        id: 10003,
        type: 3,
        username: 'enterprise',
        phone: '13000000003',
        email: 'enterprise@email.com',
        password: uuidv5('123456', salt),
        password_salt: salt
      }
    ]);

    await queryInterface.bulkInsert('user_infos', [
      {
        id: 10000,
        nickname: 'Admin',
        birthday: new Date('2018/01/01'),
        sex: 0,
        address: 'Address',
        intro: 'Hello World',
        avatar: 'http://avatar.png'
      },
      {
        id: 10001,
        nickname: 'Customer',
        birthday: new Date('2018/01/01'),
        sex: 0,
        address: 'Address',
        intro: 'Hello World',
        avatar: 'http://avatar.png'
      },
      {
        id: 10002,
        nickname: 'Business',
        birthday: new Date('2018/01/01'),
        sex: 0,
        address: 'Address',
        intro: 'Hello World',
        avatar: 'http://avatar.png'
      },
      {
        id: 10003,
        nickname: 'Enterprise',
        birthday: new Date('2018/01/01'),
        sex: 0,
        address: 'Address',
        intro: 'Hello World',
        avatar: 'http://avatar.png'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {}
};
