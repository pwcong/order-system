'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;

  const authTokenMiddleware = app.middlewares.auth.authToken(app.config.auth);

  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);

  router.get('/userinfo/:id', authTokenMiddleware, controller.userinfo.search);
  router.post('/userinfo/:id', authTokenMiddleware, controller.userinfo.modify);

};
