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

  router.post('/user/lock', authTokenMiddleware, authUserTypeMiddleware([999]), controller.user.lock);
  router.post('/user/unlock', authTokenMiddleware, authUserTypeMiddleware([999]), controller.user.unlock);
  router.post('/user/remove', authTokenMiddleware, authUserTypeMiddleware([999]), controller.user.remove);

  router.get('/user/info', authTokenMiddleware, controller.userInfo.search);
  router.get('/user/info/:id', authTokenMiddleware, controller.userInfo.search);
  router.post('/user/info', authTokenMiddleware, controller.userInfo.modify);

  router.get(
    '/recipe_category',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.search
  );
  router.post(
    '/recipe_category',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.create
  );

  router.post(
    '/recipe_category/remove',
    authTokenMiddleware,
    authUserTypeMiddleware([2]),
    controller.recipeCategory.remove
  );
};
