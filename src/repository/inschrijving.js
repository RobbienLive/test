const { tables, getKnex } = require("../data/index");

/**
 *
 * @returns {Array} Array of all inschrijvingen
 */

const findAll = () => {
  return getKnex()(tables.inschrijving).select().orderBy("EventID", "ASC");
};

/**
 *
 * @param {Number} id - InschrijvingID
 *
 * @returns {Object} Inschrijving with the given id
 */
const findById = async (id) => {
  const inschrijving = await getKnex()(tables.inschrijving)
    .where("InschrijvingID", id)
    .first();

  return inschrijving;
};

/**
 *
 * @param {Number} id - EventID
 *
 * @returns {Array} All inschrijvingen of the event with the given id
 */

const findByEventId = async (id) => {
  const inschrijving = await getKnex()(tables.inschrijving + " as i")
    .select("i.InschrijvingID", "i.ScoutID", "e.*")
    .join(tables.event + " as e", "i.EventID", "e.EventID")
    .where("i.EventID", id);

  return inschrijving;
};

/**
 * 
 * @param {Number} id - ScoutID
 * 
 * @returns {Array} All inschrijvingen of the scout with the given id
 */

const findByScoutId = async (id) => {
  // Ontvang scoutId als parameter
  const inschrijving = await getKnex()(tables.inschrijving + " as i")
    .select("i.InschrijvingID", "i.EventID", "e.*")
    .join(tables.event + " as e", "i.EventID", "e.EventID")
    .where("i.ScoutID", id);

  return inschrijving;
};

/**
 * 
 * @param {Number} EventID - EventID
 * @param {Number} ScoutID - ScoutID
 * 
 * @returns {Object} created inschrijving
 */

const create = async ({ EventID, ScoutID }) => {
  const [id] = await getKnex()(tables.inschrijving).insert({
    EventID,
    ScoutID,
  });

  return id;
};

/**
 * 
 * @param {Number} id - InschrijvingID
 * 
 * @returns {Boolean} true if inschrijving is deleted
 */

const deleteById = async (id) => {
  try {
    const del = await getKnex()(tables.inschrijving)
      .where("InschrijvingID", id)
      .del();
    return del > 0;
  } catch (error) {
    getLogger().error("Error while deleting inschrijving", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  findByEventId,
  findByScoutId,
  create,
  deleteById,
};
