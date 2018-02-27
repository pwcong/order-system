'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, BOOLEAN, DECIMAL, DATE, TEXT } = Sequelize;

    /********** 用户类型表 **********/
    await queryInterface.createTable('user_types', {
      id: {
        type: INTEGER,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 用户表 **********/
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      /**
       * 用户类型 1.商家 2.客户 3.企业 999.管理员
       */
      type: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_types',
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
      },

      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 用户信息表 **********/
    await queryInterface.createTable('user_infos', {
      id: {
        type: INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
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
      address: {
        type: STRING,
        defaultValue: ''
      },
      contact: {
        type: STRING,
        defaultValue: ''
      },
      intro: {
        type: STRING,
        defaultValue: ''
      },
      avatar: {
        type: STRING,
        defaultValue: ''
      },
      /**
       * 横幅图片，逗号拼接
       */
      banner: {
        type: TEXT,
        defaultValue: ''
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 用户点评表 **********/
    await queryInterface.createTable('user_evaluates', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      user_info_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_infos',
          key: 'id'
        }
      },
      target_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
      },

      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 菜单分类表 **********/
    await queryInterface.createTable('recipe_categories', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      name: {
        type: STRING,
        allowNull: false
      },

      /**
       * 菜单分类状态
       * 0.正常 1.冻结 2.删除
       */
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 菜单表 **********/
    await queryInterface.createTable('recipes', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      category_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'recipe_categories',
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
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 菜单点评表 **********/
    await queryInterface.createTable('recipe_evaluates', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      user_info_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_infos',
          key: 'id'
        }
      },
      target_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'recipes',
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
      },

      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 支付方式表 **********/
    await queryInterface.createTable('payment_types', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false
      },
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 订单表 **********/
    await queryInterface.createTable('orders', {
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
          model: 'users',
          key: 'id'
        }
      },

      sender_info_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_infos',
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
          model: 'users',
          key: 'id'
        }
      },

      receiver_info_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'user_infos',
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
       * 订单地址
       */
      address: {
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

      has_paid: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: 0
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
        type: DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },

      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 账单表 **********/
    await queryInterface.createTable('bills', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      name: {
        type: STRING,
        allowNull: false
      },
      amount: {
        type: DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      payment_type: {
        type: INTEGER,
        references: {
          model: 'payment_types',
          key: 'id'
        }
      },

      /**
       * 账单类型
       * 0.收入 1.支出
       */
      type: {
        type: INTEGER,
        allowNull: false
      },

      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });

    /********** 附件表 **********/
    await queryInterface.createTable('attachments', {
      id: {
        type: STRING,
        primaryKey: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      year: {
        type: STRING,
        allowNull: false
      },
      month: {
        type: STRING,
        allowNull: false
      },
      date: {
        type: STRING,
        allowNull: false
      },
      extname: {
        type: STRING
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attachments');
    await queryInterface.dropTable('bills');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('payment_types');
    await queryInterface.dropTable('recipe_evaluates');
    await queryInterface.dropTable('recipes');
    await queryInterface.dropTable('recipe_categories');
    await queryInterface.dropTable('user_evaluates');
    await queryInterface.dropTable('user_infos');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('user_types');
  }
};
