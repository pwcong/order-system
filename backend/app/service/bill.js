'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  async search(id, type, parent_id = null) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        if (parent_id) {
          let i = 0,
            l = id.length;
          for (i; i < l; i++) {
            const _user = await app.model.User.findById(id[i]);
            if (!_user || _user.parent_id !== parent_id) {
              throw new Error('没有权限');
            }
          }
        }

        const condition = {
          user_id: id
        };

        if (type && type.length > 0) {
          condition.type = type;
        }

        const _bills = await app.model.Bill.findAll({
          where: condition,
          order: [['created_at', 'DESC']]
        });

        resolve({
          bills: _bills
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = BillService;
