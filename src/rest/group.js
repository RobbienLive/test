const Router = require("@koa/router");
const groupService = require("../service/group");
const Role = require("../core/roles");
const validate = require("../core/validation");
const Joi = require("joi");
const { makeRequireRole, requireAuthentication } = require("../core/auth");

const getAllGroup = async (ctx) => {
  ctx.body = await groupService.getAll();
};

const createGroup = async (ctx) => {
  const newGroup = await groupService.create({
    ...ctx.request.body,
  });
  ctx.body = newGroup;
};
createGroup.validationScheme = {
  body: {
    GroupName: Joi.string().max(255).required(),
    Adress: Joi.string().max(255).required(),
  },
};

const getGroupById = async (ctx) => {
  ctx.body = await groupService.getById(Number(ctx.params.id));
};

getGroupById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const updateGroup = async (ctx) => {
  ctx.body = await groupService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

updateGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    GroupName: Joi.string().max(255).required(),
    Adress: Joi.string().max(255).required(),
  },
};

const deleteGroup = async (ctx) => {
  await groupService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

deleteGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/groups",
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", getAllGroup);
  router.post(
    "/",
    requireAuthentication,
    requireAdmin,
    validate(createGroup.validationScheme),
    createGroup
  );
  router.get("/:id", validate(getGroupById.validationScheme), getGroupById);
  router.put(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(updateGroup.validationScheme),
    updateGroup
  );
  router.delete(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(deleteGroup.validationScheme),
    deleteGroup
  );

  app.use(router.routes()).use(router.allowedMethods());
};
