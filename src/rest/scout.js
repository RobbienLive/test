const Router = require("@koa/router");
const scoutService = require("../service/scout");
const Joi = require("joi");
const validate = require("../core/validation");
const Role = require("../core/roles");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const { get } = require("config");

const getAllScout = async (ctx) => {
  ctx.body = await scoutService.getAll();
};

const createScout = async (ctx) => {
  const newScout = await scoutService.create({
    ...ctx.request.body,
    DateOfBirth: new Date(ctx.request.body.DateOfBirth),
    GroupID: Number(ctx.request.body.GroupID),
  });
  ctx.body = newScout;
};

createScout.validationScheme = {
  body: {
    FirstName: Joi.string().max(255).required(),
    LastName: Joi.string().max(255).required(),
    DateOfBirth: Joi.date().required(),
    PhoneNumber: Joi.string().max(10).required(),
    Email: Joi.string().email().required(),
    GroupID: Joi.number().integer().required(),
    IsChief: Joi.boolean().required(),
    Adress: Joi.string().max(255).required(),
    Tak: Joi.string().max(255).required(),
    Password: Joi.string().min(8).max(30).required(),
  },
};


const getScoutById = async (ctx) => {
  ctx.body = await scoutService.getById(Number(ctx.params.id));
};

getScoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const getScoutByGroup = async (ctx) => {
  ctx.body = await scoutService.getByGroup(Number(ctx.params.id));
};

getScoutByGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const updateScout = async (ctx) => {
  ctx.body = await scoutService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    DateOfBirth: new Date(ctx.request.body.DateOfBirth),
    PhoneNumber: Number(ctx.request.body.PhoneNumber),
    GroupID: Number(ctx.request.body.GroupID),
    IsChief: Boolean(ctx.request.body.IsChief),
  });
};
updateScout.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    FirstName: Joi.string().max(255).required(),
    LastName: Joi.string().max(255).required(),
    DateOfBirth: Joi.date().required(),
    PhoneNumber: Joi.string().max(10).required(),
    Email: Joi.string().email().required(),
    GroupID: Joi.number().integer().required(),
    IsChief: Joi.boolean().required(),
    Adress: Joi.string().max(255).required(),
    Tak: Joi.string().max(255).required(),
  },
};

const deleteScout = async (ctx) => {
  await scoutService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteScout.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const login = async (ctx) => {
  const { Email, Password } = ctx.request.body;
  const token = await scoutService.login(Email, Password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    Email: Joi.string().email(),
    Password: Joi.string(),
  },
};

const checkScoutId = (ctx, next) => {
  const { ScoutID, Roles } = ctx.state.session;
  const { id } = ctx.params;

  if (id != ScoutID && !Roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      "You are not allowed to view this user's information",
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: "/scouts",
  });
  router.post("/login", validate(login.validationScheme), login);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", getAllScout);
  router.post("/", validate(createScout.validationScheme), validate(createScout.validationScheme), createScout);
  router.get("/:id", validate(getScoutById.validationScheme), getScoutById);
  router.put("/:id", validate(updateScout.validationScheme), updateScout);
  router.delete("/:id", validate(deleteScout.validationScheme), deleteScout);
  router.get("/group/:id", validate(getScoutByGroup.validationScheme), getScoutByGroup);

  app.use(router.routes()).use(router.allowedMethods());
};
