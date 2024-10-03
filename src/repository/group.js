const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

/**
 *
 * @returns Array of all groups
 */

const findAll = () => {
  return getKnex()(tables.group).select().orderBy("GroupID", "ASC");
};

/**
 *
 * @param {Number} id - GroupID
 *
 * @returns {Object} Group with the given id
 */

const findById = async (id) => {
  const group = await getKnex()(tables.group).where("GroupID", id).first();

  return group;
};

/** 
 * 
 * @param {String} GroupName - Name of the group
 * @param {String} Adress - Adress of the group
 * 
 * @returns {Object} created group
 
*/

const create = async ({ GroupName, Adress }) => {
  const [id] = await getKnex()(tables.group).insert({
    GroupName,
    Adress,
  });

  return id;
};

/**
 *
 * @param {Number} id - GroupID
 * @param {String} GroupName - Name of the group
 * @param {String} Adress - Adress of the group
 *
 * @returns {Object} updated group
 */
const updateById = async (id, { GroupName, Adress }) => {
  const result = await getKnex()(tables.group).where("GroupID", id).update({
    GroupName,
    Adress,
  });
  return result;
};

/**
 *
 * @param {Number} id - GroupID
 *
 * @returns {Boolean} true if deleted
 */
const deleteById = async (id) => {
  try {
    const del = await getKnex()(tables.group).where("GroupID", id).delete();
    return del > 0;
  } catch (error) {
    getLogger().error("Error while deleting group", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
