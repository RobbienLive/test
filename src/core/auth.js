const scoutService = require('../service/scout');

/**
 * 
 * @param {Object} ctx - Koa context object
 * @param {Function} next - Koa next middleware function
 * 
 * @returns {Promise} Promise object
 * 
 * @throws {ServiceError} If the user is not authenticated
 */

const requireAuthentication = async (ctx, next) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await scoutService.checkAndParseSession(
    authorization
  );

  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};

/**
 * 
 * @param {String} role - Role of the scout
 * 
 * @returns {Function} Koa middleware function
 */

const makeRequireRole = (role) => async (ctx, next) => {
  const { Roles = [] } = ctx.state.session;

  scoutService.checkRole(role, Roles);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};