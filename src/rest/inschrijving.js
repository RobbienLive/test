// const Router = require("@koa/router");
// const inschrijvingService = require("../service/inschrijving");
// const Role = require("../core/roles");
// const { makeRequireRole, requireAuthentication } = require("../core/auth");
// const Joi = require("joi");
// const validate = require("../core/validation");
// const { get } = require("config");

// const getAllInschrijving = async (ctx) => {
//   ctx.body = await inschrijvingService.getAll();
// };

// const createInschrijving = async (ctx) => {
//   const newInschrijving = await inschrijvingService.create({
//     ...ctx.request.body,
//     EventID: Number(ctx.request.body.EventID),
//     ScoutID: Number(ctx.request.body.ScoutID),
//   });
//   ctx.body = newInschrijving;
// };

// createInschrijving.valdationScheme = {
//   body: {
//     EventID: Joi.number().integer().positive().required(),
//     ScoutID: Joi.number().integer().positive().required(),
//   },
// };

// const getInschrijvingById = async (ctx) => {
//   ctx.body = await inschrijvingService.getById(Number(ctx.params.id));
// };

// getInschrijvingById.valdationScheme = {
//   params: {
//     id: Joi.number().integer().positive().required(),
//   },
// };

// const getInschrijvingByEventId = async (ctx) => {
//   ctx.body = await inschrijvingService.getByEventId(Number(ctx.params.id));
// };

// getInschrijvingByEventId.valdationScheme = {
//   params: {
//     id: Joi.number().integer().positive().required(),
//   },
// };

// const getInschrijvingByScoutId = async (ctx) => {
//   const { ScoutID } = ctx.state.session;
//   ctx.body = await inschrijvingService.getByScoutId(ScoutID);
// };

// const deleteInschrijving = async (ctx) => {
//   await inschrijvingService.deleteById(Number(ctx.params.id));
//   ctx.status = 204;
// };

// deleteInschrijving.valdationScheme = {
//   params: {
//     id: Joi.number().integer().positive().required(),
//   },
// };

// const checkScoutId = (ctx, next) => {
//   const { ScoutID, Roles } = ctx.state.session;
//   const { id } = ctx.params;

//   if (id != ScoutID && !Roles.includes(Role.ADMIN)) {
//     return ctx.throw(
//       403,
//       "You are not allowed to view this user's information",
//       {
//         code: "FORBIDDEN",
//       }
//     );
//   }
//   return next();
// };

// module.exports = (app) => {
//   const router = new Router({
//     prefix: "/inschrijvingen",
//   });
//   const requireAdmin = makeRequireRole(Role.ADMIN);
//   const requireUser = makeRequireRole(Role.USER);

//   router.get("/", requireAuthentication, requireAdmin, getAllInschrijving);
//   router.post(
//     "/",
//     requireAuthentication,
//     requireUser,
//     validate(createInschrijving.valdationScheme),
//     createInschrijving
//   );

//   router.get(
//     "/event/:id",
//     requireAuthentication,
//     requireAdmin,
//     validate(getInschrijvingByEventId.valdationScheme),
//     getInschrijvingByEventId
//   );
//   router.get("/scout", requireAuthentication, getInschrijvingByScoutId);
//   router.get(
//     "/:id",
//     requireAuthentication,
//     requireAdmin,
//     validate(getInschrijvingById.valdationScheme),
//     getInschrijvingById
//   );
//   router.delete(
//     "/:id",
//     requireAuthentication,
//     validate(deleteInschrijving.valdationScheme),
//     deleteInschrijving
//   );

//   app.use(router.routes()).use(router.allowedMethods());
// };
