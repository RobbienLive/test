const ServiceError = require("../core/serviceError");
const eventRepository = require("../repository/event");
const InschrijvingRepository = require("../repository/inschrijving");

/**
 * 
 * @returns Array of all events and the number of events
 * 
 */

const getAll = async () => {
  const items = await eventRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

/**
 * 
 * @param {Number} id - EventID
 * 
 * @returns {object} Event with the given id
 */

const getById = async (id) => {
  const item = await eventRepository.findById(id);
  if (!item) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
  return item;
};

/**
 * 
 * @param {Number} id - InschrijvingID 
 * 
 * @returns {object} Inschrijving with the given id
 */

const getInschrijvingById = async (id) => {
  const item = await InschrijvingRepository.findById(id);
  if (!item) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
  return item;
};

/**
 * 
 * @param {Number} id - EventID
 * 
 * @returns {Array} All inschrijvingen of the event with the given id
 */

const getInschrijvingByEventId = async (id) => {
  const item = await InschrijvingRepository.findByEventId(id);
  if (!item) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
  return item;
};

/**
 * 
 * @param {Number} id - ScoutID
 * 
 * @returns {Array} All inschrijvingen of the scout with the given id
 */

const getInschrijvingByScoutId = async (id) => {
  const items = await InschrijvingRepository.findByScoutId(id);
  if (!items) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
  return {
    items,
    count: items.length,
  };
};

/**
 * 
 * @param {Number} EventID - EventID
 * @param {Number} ScoutID - ScoutID
 * 
 * @returns {Object} created inschrijving
 */

const createInschrijving = async ({ EventID, ScoutID }) => {
  const id = await InschrijvingRepository.create({
    EventID,
    ScoutID,
  });
  return getInschrijvingById(id);
};

/**
 * 
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
 * @returns {object} created event
 */

const create = async ({
  EventName,
  StartDate,
  EndDate,
  Location,
  Adress,
  StartTime,
  EndTime,
  Price,
  MaximumParticipants,
}) => {
  const id = await eventRepository.create({
    EventName,
    StartDate,
    EndDate,
    Location,
    Adress,
    StartTime,
    EndTime,
    Price,
    MaximumParticipants,
  });
  return getById(id);
};

/**
 * 
 * @param {Number} id - EventID
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
 * @returns {object} updated event
 */

const updateById = async (
  id,
  {
    EventName,
    StartDate,
    EndDate,
    Location,
    Adress,
    StartTime,
    EndTime,
    Price,
    MaximumParticipants,
  }
) => {
  await eventRepository.updateById(id, {
    EventName,
    StartDate,
    EndDate,
    Location,
    Adress,
    StartTime,
    EndTime,
    Price,
    MaximumParticipants,
  });
  return getById(id);
};

const patchById = async (id, data) => {
  const existingEvent = await getById(id); // Fetch the existing event
  const updatedData = { ...existingEvent, ...data }; // Merge the existing event with the new data
  
  await eventRepository.updateById(id, updatedData); // Update only with the merged data
  return getById(id); // Return the updated event
};


/**
 * 
 * @param {Number} id - EventID
 * 
 * @returns {object} deleted event
 */

const deleteById = async (id) => {
  const deleted = await eventRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
};

/**
 * 
 * @param {Number} id - InschrijvingID
 * 
 * @returns {object} deleted inschrijving
 */

const deleteInschrijvingById = async (id) => {
  const deleted = await InschrijvingRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`Event with id ${id} not found`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  patchById,
  deleteById,
  getInschrijvingByEventId,
  getInschrijvingByScoutId,
  deleteInschrijvingById,
  createInschrijving,
};
