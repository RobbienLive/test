const Router = require("@koa/router");
const installEventRouter = require("./event");
const installHealthRouter = require("./health");
const installScoutRouter = require("./scout");
const installGroupRouter = require("./group");

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installEventRouter(router);
  installHealthRouter(router);
  installScoutRouter(router);
  installGroupRouter(router);
  app.use(router.routes()).use(router.allowedMethods()); 
};
