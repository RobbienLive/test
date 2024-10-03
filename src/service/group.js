const ServiceError = require("../core/serviceError");
const handleDBError = require("./_handleDBError");
const groupRepository = require("../repository/group");

/**
 *
 * @returns Array of all groups and the number of groups
 */

const getAll = async () => {
  const items = await groupRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

/**
 *
 * @param {Number} id - GroupID
 *
 * @returns {object} Group with the given id
 */

const getById = async (id) => {
  const item = await groupRepository.findById(id);

  if (!item) {
    throw ServiceError.notFound(`Group with id ${id} not found`);
  }
  return item;
};

/**
 *
 * @param {String} GroupName - Name of the group
 * @param {String} Adress - Adress of the group
 *
 * @returns {Object} created group
 */

const create = async ({ GroupName, Adress }) => {
  const newGroup = await groupRepository.create({
    GroupName,
    Adress,
  });

  return getById(newGroup);
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
  const groupToUpdate = await groupRepository.updateById(id, {
    GroupName,
    Adress,
  });

  if (!groupToUpdate) {
    throw ServiceError.notFound(`Group with id ${id} not found`);
  }

  return getById(id);
};

/**
 *
 * @param {Number} GroupID - GroupID
 *
 * @returns {Object} deleted group
 */

const deleteById = async (GroupID) => {
  try {
    const groupToDelete = await groupRepository.deleteById(GroupID);
    if (!groupToDelete) {
      throw ServiceError.notFound(`No group found with ID ${GroupID}`);
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
