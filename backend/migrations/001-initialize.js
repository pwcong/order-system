'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, BOOLEAN, DECIMAL, DATE, TEXT } = Sequelize;

    /////////////////////
    // 用户类型表
    ////////////////////
    await queryInterface.createTable('user_type', {
      id: {
        type: INTEGER,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false
      }
    });

    /////////////////////
    // 用户表
    ////////////////////
    await queryInterface.createTable('user', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      /**
       * 用户类型 0.企业 1.商家 2.客户 999.管理员
       */
      type: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_type',
          key: 'id'
        }
      },
      username: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: STRING,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false
      },
      password_salt: {
        type: STRING,
        allowNull: false
      },

      /**
       * 用户状态 0.正常 1.锁定 2.注销
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      /**
       * 账户余额（保留两位）
       */
      balance: {
        type: DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      }
    });

    /////////////////////
    // 用户信息表
    ////////////////////
    await queryInterface.createTable('user_info', {
      id: {
        type: INTEGER,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      nickname: STRING,
      birthday: DATE,

      /**
       * 性别
       * 0.未知 1.男 2.女
       */
      sex: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      address: STRING,
      intro: STRING,
      avatar: STRING
    });

    /////////////////////
    // 菜单分类表
    ////////////////////
    await queryInterface.createTable('recipe_category', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      name: {
        type: STRING,
        allowNull: false
      },

      /**
       * 菜单分类状态
       * 0.正常 1.删除
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    /////////////////////
    // 菜单表
    ////////////////////
    await queryInterface.createTable('recipe', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      category_id: {
        type: INTEGER,
        references: {
          model: 'recipe_category',
          key: 'id'
        }
      },
      name: {
        type: STRING,
        allowNull: false
      },
      price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      avatar: STRING,
      content: TEXT,

      /**
       * 菜单状态
       * 0.正常 1.下线 2.删除
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    /////////////////////
    // 菜单点评表
    ////////////////////
    await queryInterface.createTable('recipe_evaluate', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      recipe_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'recipe',
          key: 'id'
        }
      },

      /**
       * 评分（1-5）
       */
      score: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 5
      },

      /**
       * 评价
       */
      content: {
        type: STRING,
        allowNull: false
      },

      /**
       * 状态
       * 0.正常 1.删除
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    /////////////////////
    // 支付方式表
    ////////////////////
    await queryInterface.createTable('payment_type', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false
      }
    });

    /////////////////////
    // 订单表
    ////////////////////
    await queryInterface.createTable('order', {
      /**
       * 订单号，长度为26位数
       * 订单前缀（2位） + 订单类型（3） + 时间（17位） + 随机数（4位） = 26位，例如：
       * 66 000  20170101000000000 0000
       */
      id: {
        type: STRING,
        primaryKey: true
      },

      /**
       * 订单发起人ID
       */
      sender_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },

      /**
       * 订单接收人ID
       */
      receiver_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },

      /**
       * 订单标题
       */
      name: {
        type: STRING,
        allowNull: false
      },

      /**
       * 订单详情
       */
      details: {
        type: TEXT,
        allowNull: false
      },

      /**
       * 订单状态
       * 0.发起 1.已支付 2.已完成 3.取消 4.已取消
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      payment_type: {
        type: INTEGER,
        references: {
          model: 'payment_type',
          key: 'id'
        }
      },

      /**
       * 是否取消订单
       */
      has_refunded: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },

      /**
       * 是否完成订单
       */
      has_finished: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },

      /**
       * 是否评价订单
       */
      has_evaluated: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },

      /**
       * 订单金额
       */
      amount: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 0
      }
    });

    /////////////////////
    // 账单表
    ////////////////////
    await queryInterface.createTable('bill', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      name: {
        type: STRING,
        allowNull: false
      },
      amount: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      balance_before: {
        type: DECIMAL,
        allowNull: false
      },
      balance_after: {
        type: DECIMAL,
        allowNull: false
      },

      /**
       * 账单类型
       * 0.收入 1.支出
       */
      type: {
        type: INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bill');
    await queryInterface.dropTable('order');
    await queryInterface.dropTable('payment_type');
    await queryInterface.dropTable('recipe_evaluate');
    await queryInterface.dropTable('recipe');
    await queryInterface.dropTable('recipe_category');
    await queryInterface.dropTable('user_info');
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('user_type');
  }
};
