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
  router.post('/user/register', controller.user.register);
  router.post('/user/check', authTokenMiddleware, controller.user.check);
  router.post('/user/logout', controller.user.logout);

  router.get('/user/info/:id', controller.userInfo.search);
  router.post('/user/info/:id', authTokenMiddleware, controller.userInfo.modify);
};
