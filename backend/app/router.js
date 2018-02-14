'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;

  const authTokenMiddleware = middlewares.auth.authToken(app.config.auth);
  const authUserTypeMiddleware = middlewares.auth.authUserType;

  router.get('/test', controller.test.default);
  router.post('/test', controller.test.default);

  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);

  router.post('/user/register', controller.user.register);

  router.post('/user/check', authTokenMiddleware, controller.user.check);

  router.post('/user/lock/:id', authTokenMiddleware, authUserTypeMiddleware([999]), controller.user.lock);
  router.post(
    '/user/unlock/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([999]),
    controller.user.unlock
  );
  router.post(
    '/user/remove/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([999]),
    controller.user.remove
  );

  router.get('/user/info', authTokenMiddleware, controller.userInfo.search);
  router.get('/user/info/:id', authTokenMiddleware, controller.userInfo.search);
  router.post('/user/info', authTokenMiddleware, controller.userInfo.modifySelf);
  // router.post(
  //   '/user/info/:id',
  //   authTokenMiddleware,
  //   authUserTypeMiddleware([999]),
  //   controller.userInfo.modifyOther
  // );

  router.post(
    '/recipe_category/create',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.create
  );

  router.get('/recipe_category/:id', controller.recipeCategory.searchById);
  router.get('/recipe_categories/:user_id', controller.recipeCategory.searchByUserId);

  router.post(
    '/recipe_category/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.modify
  );

  router.post(
    '/recipe_category/remove/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.remove
  );

  router.post('/recipe/create', authTokenMiddleware, authUserTypeMiddleware([2]), controller.recipe.create);

  router.get('/recipe/:id', controller.recipe.searchById);
  router.post('/recipe/:id', authTokenMiddleware, authUserTypeMiddleware([2]), controller.recipe.modify);
  router.post(
    '/recipe/remove/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipe.remove
  );
  router.post('/recipe/up/:id', authTokenMiddleware, authUserTypeMiddleware([2]), controller.recipe.online);
  router.post(
    '/recipe/down/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipe.offline
  );
  router.get('/recipes/:user_id', controller.recipe.searchByUserId);
  router.post('/recipes/:user_id', controller.recipe.searchByUserId);
  router.get('/recipes/:user_id/:category_id', controller.recipe.searchByUserIdWithCategoryId);
  router.post('/recipes/:user_id', controller.recipe.searchByUserId);

  router.get('/payment/support', controller.payment.support);
  router.post('/payment/up/:id', authTokenMiddleware, authUserTypeMiddleware([999]), controller.payment.up);
  router.post(
    '/payment/down/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([999]),
    controller.payment.down
  );

  router.post(
    '/order/create/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([1]),
    controller.order.create
  );
  router.post(
    '/orders/sended',
    authTokenMiddleware,
    authUserTypeMiddleware([1]),
    controller.order.getSendedList
  );
  router.post(
    '/orders/sended/:filter',
    authTokenMiddleware,
    authUserTypeMiddleware([1]),
    controller.order.getSendedList
  );

  router.post('/order/pay/:id', authTokenMiddleware, authUserTypeMiddleware([1]), controller.order.pay);
  router.post(
    '/order/cancel/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([1]),
    controller.order.cancel
  );
  router.post(
    '/order/finish/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([1, 2]),
    controller.order.finish
  );
  router.post(
    '/orders/received',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.order.getReceivedList
  );
  router.post(
    '/orders/received/:filter',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.order.getReceivedList
  );

  router.post(
    '/order/confirm/:id',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.order.confirm
  );
  router.post('/order/close/:id', authTokenMiddleware, authUserTypeMiddleware([2]), controller.order.close);

  router.post('/bills', authTokenMiddleware, authUserTypeMiddleware([1, 2]), controller.bill.search);
  router.post(
    '/bills/:filter',
    authTokenMiddleware,
    authUserTypeMiddleware([1, 2]),
    controller.bill.search
  );

  router.post('/attachment/upload', authTokenMiddleware, controller.attachment.upload);

  router.get('/system/time', controller.system.time);

  app.io.of('/business').route('disconnecting', app.io.controller.business.disconnecting);
  app.io.of('/business').route('disconnect', app.io.controller.business.disconnect);
  app.io.of('/business').route('error', app.io.controller.business.error);
};
