const Router = require("@koa/router");
const eventService = require("../service/event");
const validate = require("../core/validation");
const Joi = require("joi");
const Role = require("../core/roles");
const { makeRequireRole, requireAuthentication } = require("../core/auth");

/**
 * Gives all events
 */
const getAllEvents = async (ctx) => {
  ctx.body = await eventService.getAll();
};

/**
 * Creates a new event
 * @param {String} EventName - Name of the event
 * @param {Date} StartDate - Start date of the event
 * @param {Date} EndDate - End date of the event
 * @param {String} Location - Location of the event
 * @param {String} Adress - Adress of the event
 * @param {String} StartTime - Start time of the event
 * @param {String} EndTime - End time of the event
 * @param {Number} Price - Price of the event
 * @param {Number} MaximumParticipants - Maximum number of participants
 *
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

/**
 * Gives all inschrijvingen for the event with the given id
 */

const inschrijvingenByEvent = async (ctx) => {
  ctx.body = await eventService.getInschrijvingByEventId(Number(ctx.params.id));
};
inschrijvingenByEvent.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Gives all inschrijvingen for the scout with the given id
 */

const inschrijvingenByScout = async (ctx) => {
  const { ScoutID } = ctx.state.session;
  ctx.body = await eventService.getInschrijvingByScoutId(ScoutID);
};

/**
 * Deletes the inschrijving with the given id
 */

const deleteInschrijving = async (ctx) => {
  await eventService.deleteInschrijvingById(Number(ctx.params.id));
  ctx.status = 204;
};

deleteInschrijving.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Creates a new inschrijving
 * @param {Number} EventID - EventID
 * @param {Number} ScoutID - ScoutID
 */

const createInschrijving = async (ctx) => {
  const { EventID, ScoutID } = ctx.request.body;
  const newInschrijving = await eventService.createInschrijving({
    ScoutID: ScoutID,
    EventID: EventID,
  });
  ctx.body = newInschrijving;
};
createInschrijving.validationScheme = {
  body: {
    EventID: Joi.number().integer().positive().required(),
    ScoutID: Joi.number().integer().positive().required(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/events",
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", getAllEvents);
  router.post(
    "/",
    validate(createEvent.validationScheme),
    createEvent
  );
  router.get("/:id", validate(getEventById.validationScheme), getEventById);
  router.put(
    "/:id",
    validate(updateEvent.validationScheme),
    updateEvent
  );
  router.delete(
    "/:id",
    validate(deleteEvent.validationScheme),
    deleteEvent
  );
  //----------- Inschrijvingen ------------
  router.get(
    "/inschrijvingen/scout",

    inschrijvingenByScout
  );
  router.get(
    "/inschrijvingen/:id",

    validate(inschrijvingenByEvent.validationScheme),
    inschrijvingenByEvent
  );

  router.delete(
    "/inschrijvingen/scout/:id",

    validate(deleteInschrijving.validationScheme),
    deleteInschrijving
  );

  router.post(
    "/inschrijvingen",
    
    validate(createInschrijving.validationScheme),
    createInschrijving
  );

  app.use(router.routes()).use(router.allowedMethods());
};
