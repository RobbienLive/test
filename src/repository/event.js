const { tables, getKnex } = require("../data/index");

/**
 *
 * @returns Array of all events
 */

const findAll = () => {
  return getKnex()(tables.event).select().orderBy("startDate", "ASC");
};

/**
 *
 * @param {Number} id EventID
 *
 * @returns {object} Event with the given id
 */

const findById = async (id) => {
  const event = await getKnex()(tables.event).where("EventID", id).first();

  return event;
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
  const [id] = await getKnex()(tables.event).insert({
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

  return id;
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
  const result = await getKnex()(tables.event).where("EventID", id).update({
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

  return result;
};

/**
 *
 * @param {Number} id - EventID
 *
 * @returns {boolean} true if deleted
 */

const deleteById = async (id) => {
  const rowsAffected = await getKnex()(tables.event).where("EventID", id).del();

  return rowsAffected > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
