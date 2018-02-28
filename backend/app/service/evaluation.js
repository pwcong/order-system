'use strict';

const Service = require('egg').Service;

class EvaluationService extends Service {
  async evaluateOrder(id, userId, userEvaluation, recipeEvaluation) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        /************ 查询订单 ************/
        const _order = await app.model.Order.findOne({
          where: {
            id,
            sender_id: userId,
            has_finished: true,
            has_evaluated: false
          }
        });

        if (!_order) {
          throw new Error('订单无效');
        }

        /************ 更新订单状态 ************/
        _order.has_evaluated = true;
        await _order.save({ transaction: t });

        /************ 查询评价方 ************/
        const _user = await app.model.User.findById(userId);
        if (!_user || _user.status !== 0) {
          throw new Error('评价方账户无效');
        }

        /************ 新建商家评价 ************/
        await app.model.UserEvaluation.create(
          {
            user_id: userId,
            user_info_id: userId,
            target_id: _order.receiver_id,
            score: userEvaluation.score || 5,
            content: userEvaluation.content || '暂无评价'
          },
          { transaction: t }
        );

        /************ 新建菜单评价 ************/
        const orderDetails = JSON.parse(_order.details);
        let i = 0,
          l = orderDetails.length || 0;
        for (i; i < l; i++) {
          const _recipeId = orderDetails[i].id;

          let _score = null;
          let _content = null;

          if (recipeEvaluation['' + _recipeId]) {
            _score = recipeEvaluation['' + _recipeId].score;
            _content = recipeEvaluation['' + _recipeId].content;
          }

          await app.model.RecipeEvaluation.create(
            {
              user_id: userId,
              user_info_id: userId,
              target_id: _recipeId,
              score: _score || 5,
              content: _content || '暂无评价'
            },
            { transaction: t }
          );
        }

        await t.commit();

        resolve();
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }

  async autoEvaluateOrder() {
    const { app, config } = this;

    let deadline = 592200;
    if (config.service && config.service.auto_evaluate_order) {
      deadline = config.service.auto_evaluate_order.deadline || 592200;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const _orders = await app.model.Order.findAll({
          where: {
            has_finished: true,
            has_evaluated: false
          }
        });

        let i = 0,
          l = _orders.length || 0;

        for (i; i < l; i++) {
          /************ 开启事务 ************/
          const _order = _orders[i];

          if (Date.now() / 1000 - _order.updated_at / 1000 < deadline) {
            continue;
          }

          const t = await app.model.transaction();

          try {
            /************ 更新订单状态 ************/
            _order.has_evaluated = true;
            await _order.save({ transaction: t });

            /************ 新建商家评价 ************/
            await app.model.UserEvaluation.create(
              {
                user_id: _order.sender_id,
                user_info_id: _order.sender_id,
                target_id: _order.receiver_id,
                score: 5,
                content: '暂无评价',
                is_auto: true
              },
              { transaction: t }
            );

            /************ 新建菜单评价 ************/
            const orderDetails = JSON.parse(_order.details);
            let _i = 0,
              _l = orderDetails.length || 0;
            for (_i; _i < _l; _i++) {
              const _recipeId = orderDetails[_i].id;

              await app.model.RecipeEvaluation.create(
                {
                  user_id: _order.sender_id,
                  user_info_id: _order.sender_id,
                  target_id: _recipeId,
                  score: 5,
                  content: '暂无评价',
                  is_auto: true
                },
                { transaction: t }
              );
            }

            await t.commit();
          } catch (err) {
            await t.rollback();
          }
        }
        resolve();
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findUserEvaluations(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _evaluations = await app.model.UserEvaluation.findAll({
          where: {
            target_id: id,
            status: 0
          },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            }
          ]
        });

        resolve({
          evaluations: _evaluations
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async findRecipeEvaluations(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        const _evaluations = await app.model.RecipeEvaluation.findAll({
          where: {
            target_id: id,
            status: 0
          },
          order: [['created_at', 'DESC']],
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            }
          ]
        });

        resolve({
          evaluations: _evaluations
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = EvaluationService;
