const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

/**
 * 
 * @returns Array of all scouts
 */

const findAll = () => {
  return getKnex()(tables.scout)
    .select()
    .orderBy("LastName", "ASC", "FirstName", "ASC");
};

/**
 * 
 * @param {Number} id - ScoutID
 * 
 * @returns {Object} Scout with the given id
 */

const findById = async (id) => {
  const scout = await getKnex()(tables.scout).where("ScoutID", id).first();

  return scout;
};

/**
 * 
 * @param {Number} id - GroupID
 * 
 * @returns {Array} All scouts of the group with the given id
 */

const findByGroup = async (id) => {
  const scout = await getKnex()(tables.scout).where("GroupID", id);

  return scout;
};

/**
 * 
 * @param {String} LastName - Last name of the scout
 * @param {String} FirstName - First name of the scout
 * @param {Date} DateOfBirth - Date of birth of the scout
 * @param {String} Email - Email of the scout
 * @param {String} PhoneNumber - Phone number of the scout
 * @param {String} Adress - Adress of the scout
 * @param {String} Tak - Tak of the scout
 * @param {Boolean} IsChief - Is the scout a chief or not
 * @param {Number} GroupID - GroupID of the scout
 * @param {String} Password_hash - Password of the scout
 * @param {String} Roles - Roles of the scout
 * 
 * @returns {Object} created scout
 */

const create = async ({
  LastName,
  FirstName,
  DateOfBirth,
  Email,
  PhoneNumber,
  Adress,
  Tak,
  IsChief,
  GroupID,
  Password_hash,
  Roles,
}) => {
  try {
    const [id] = await getKnex()(tables.scout).insert({
      LastName,
      FirstName,
      DateOfBirth,
      Email,
      PhoneNumber,
      Adress,
      Tak,
      IsChief,
      GroupID,
      password_hash: Password_hash,
      Roles,
    });

    return id;
  } catch (error) {
    getLogger().error("Error in create", { error });
    throw error;
  }
};

/**
 * 
 * @param {Number} id - ScoutID
 * @param {String} LastName - Last name of the scout
 * @param {String} FirstName - First name of the scout
 * @param {Date} DateOfBirth - Date of birth of the scout
 * @param {String} Email - Email of the scout
 * @param {String} PhoneNumber - Phone number of the scout
 * @param {String} Adress - Adress of the scout
 * @param {String} Tak - Tak of the scout
 * @param {Boolean} IsChief - Is the scout a chief or not
 * @param {Number} GroupID - GroupID of the scout
 * 
 * @returns {Object} updated scout
 */

const updateById = async (
  id,
  {
    LastName,
    FirstName,
    DateOfBirth,
    Email,
    PhoneNumber,
    Adress,
    Tak,
    IsChief,
    GroupID,
  }
) => {
  try {
    const result = await getKnex()(tables.scout).where("ScoutID", id).update({
      LastName,
      FirstName,
      DateOfBirth,
      Email,
      PhoneNumber,
      Adress,
      Tak,
      IsChief,
      GroupID,
    });

    return result;
  } catch (error) {
    console.error("Error in updateById:", error);
    throw error;
  }
};

/**
 * 
 * @param {Number} id - ScoutID
 * 
 * @returns {Boolean} true if scout is deleted
 */

const deleteById = async (id) => {
  try {
    const del = await getKnex()(tables.scout).where("ScoutID", id).del();
    return del > 0;
  } catch (error) {
    getLogger().error("Error while deleting inschrijving", { error });
    throw error;
  }
};

/**
 * 
 * @param {String} email - Email of the scout
 * 
 * @returns {Object} Scout with the given email
 */

const findByEmail = async (email) => {
  const scout = await getKnex()(tables.scout).where("Email", email).first();

  return scout;
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  findByEmail,
  findByGroup,
};
