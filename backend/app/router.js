'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;

  const authTokenMiddleware = middlewares.auth.authToken(app.config.auth);

  router.get('/test', controller.test.default);
  router.post('/test', controller.test.default);

  router.post('/user/login', controller.user.login);
  router.post('/user/register/:type', controller.user.register);

  router.get('/userinfo/:id', authTokenMiddleware, controller.userInfo.search);
  router.post('/userinfo/:id', authTokenMiddleware, controller.userInfo.modify);
};
