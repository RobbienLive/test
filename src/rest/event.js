const Router = require("@koa/router");
const eventService = require("../service/event");
const validate = require("../core/validation");
const Joi = require("joi");
const { makeRequireRole, requireAuthentication } = require("../core/auth");

/**
 * Gives all events
 */
const getAllEvents = async (ctx) => {
  ctx.body = await eventService.getAll();
};

/**
 * Creates a new event
 */
const createEvent = async (ctx) => {
  const newEvent = await eventService.create({
    EventName: ctx.request.body.EventName,
    StartDate: new Date(ctx.request.body.StartDate),
    EndDate: new Date(ctx.request.body.EndDate),
    Location: ctx.request.body.Location,
    Adress: ctx.request.body.Adress,
    StartTime: ctx.request.body.StartTime,
    EndTime: ctx.request.body.EndTime,
    Price: Number(ctx.request.body.Price),
    MaximumParticipants: Number(ctx.request.body.MaximumParticipants),
  });
  ctx.body = newEvent;
};

createEvent.validationScheme = {
  body: {
    EventName: Joi.string().max(255).required(),
    StartDate: Joi.date().required(),
    EndDate: Joi.date().min(Joi.ref("StartDate")).required(),
    Location: Joi.string().max(255).required(),
    Adress: Joi.string().max(255).required(),
    StartTime: Joi.string().max(255).required(),
    EndTime: Joi.string().max(255).required(),
    Price: Joi.number().min(0).required(),
    MaximumParticipants: Joi.number().min(0).required(),
  },
};

/**
 * Gives the event with the given id
 */
const getEventById = async (ctx) => {
  ctx.body = await eventService.getById(Number(ctx.params.id));
};

getEventById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Updates the event with the given id
 */
const updateEvent = async (ctx) => {
  ctx.body = await eventService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};
updateEvent.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    EventName: Joi.string().max(255).required(),
    StartDate: Joi.date().required(),
    EndDate: Joi.date().min(Joi.ref("StartDate")).required(),
    Location: Joi.string().max(255).required(),
    Adress: Joi.string().max(255).required(),
    StartTime: Joi.string().max(255).required(),
    EndTime: Joi.string().max(255).required(),
    Price: Joi.number().min(0).required(),
    MaximumParticipants: Joi.number().min(0).required(),
  },
};

/**
 * Partially updates the event with the given id
 */
const patchEvent = async (ctx) => {
  ctx.body = await eventService.patchById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

/**
 * Deletes the event with the given id
 */
const deleteEvent = async (ctx) => {
  await eventService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

deleteEvent.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/events" });

  router.get("/", getAllEvents);
  router.post(
    "/",
    requireAuthentication,
    makeRequireRole("admin"),
    validate(createEvent.validationScheme),
    createEvent
  );
  router.get(
    "/:id",
    validate(getEventById.validationScheme),
    getEventById
  );
  router.put(
    "/:id",
    requireAuthentication,
    makeRequireRole("admin"),
    validate(updateEvent.validationScheme),
    updateEvent
  );
  router.patch(
    "/:id",
    requireAuthentication,
    makeRequireRole("admin"),
    patchEvent
  );
  router.delete(
    "/:id",
    requireAuthentication,
    makeRequireRole("admin"),
    validate(deleteEvent.validationScheme),
    deleteEvent
  );

  app.use(router.routes()).use(router.allowedMethods());
};
