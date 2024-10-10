const { getKnex, tables } = require("../data/index");

/**
 * Finds all events in the database
 * @returns {Array} List of all events
 */
const findAll = async () => {
  return await getKnex()(tables.event).select();
};

/**
 * Finds the event by the given id
 * @param {Number} id - EventID
 * @returns {Object} Event with the given id
 */
const findById = async (id) => {
  return await getKnex()(tables.event).where("EventID", id).first();
};

/**
 * Creates a new event in the database
 * @param {Object} event - Event to be created
 * @returns {Number} The id of the created event
 */
const create = async (event) => {
  const [id] = await getKnex()(tables.event).insert(event);
  return id;
};

/**
 * Updates the event by the given id
 * @param {Number} id - EventID
 * @param {Object} data - Data to update the event with
 * @returns {Number} Number of updated rows
 */
const updateById = async (id, data) => {
  return await getKnex()(tables.event).where("EventID", id).update(data);
};

/**
 * Deletes the event by the given id
 * @param {Number} id - EventID
 * @returns {Number} Number of deleted rows
 */
const deleteById = async (id) => {
  return await getKnex()(tables.event).where("EventID", id).delete();
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
