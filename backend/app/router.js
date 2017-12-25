'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;

  const authTokenMiddleware = middlewares.auth.authToken(app.config.auth);

  router.post('/user/login', controller.user.login);
  router.post('/user/register/customer', controller.user.registerCustomer);
  router.post('/user/register/business', controller.user.registerBusiness);
  router.post('/user/register/enterprise', controller.user.registerEnterprise);

  router.get('/userinfo/:id', authTokenMiddleware, controller.userInfo.search);
  router.post('/userinfo/:id', authTokenMiddleware, controller.userInfo.modify);

};
