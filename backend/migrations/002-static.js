'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_types', [
      {
        id: 1,
        name: '客户'
      },
      {
        id: 2,
        name: '商户'
      },
      {
        id: 3,
        name: '企业'
      },
      {
        id: 999,
        name: '管理员'
      }
    ]);

    await queryInterface.bulkInsert('payment_types', [
      {
        id: 1,
        name: '微信'
      },
      {
        id: 2,
        name: '支付宝'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {}
};
