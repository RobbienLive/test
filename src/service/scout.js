const { getLogger } = require("../core/logging");
const handleDBError = require("./_handleDBError");
const { hashPassword, verifyPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const scoutRepository = require("../repository/scout");
const Role = require("../core/roles");
const ServiceError = require("../core/serviceError");

/**
 *
 * @param {String} authHeader - Authorization header
 *
 * @returns {Object} Session data
 *
 * @throws {ServiceError} - If the user is not signed in or the token is invalid
 *
 */

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substring(7);
  try {
    const { Roles, ScoutID } = await verifyJWT(authToken);

    return {
      ScoutID,
      Roles,
      authToken,
    };
  } catch (error) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  }
};

/**
 * 
 * @param {Number} ScoutID - ScoutID
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
 * @returns {Object} Scout without password_hash
 */

const makeExposedUser = ({
  ScoutID,
  FirstName,
  LastName,
  Email,
  Roles,
  DateOfBirth,
  PhoneNumber,
  Tak,
  Adress,
  GroupID,
  IsChief,
}) => ({
  ScoutID,
  FirstName,
  LastName,
  Email,
  DateOfBirth,
  PhoneNumber,
  Tak,
  GroupID,
  Adress,
  IsChief,
  Roles,
});

/**
 * 
 * @param {Object} scout - Scout object
 * 
 * @returns {Object} Scout object with token
 */

const makeLoginData = async (scout) => {
  const token = await generateJWT(scout);
  return {
    scout: makeExposedUser(scout),
    token,
  };
};

/**
 * 
 * @param {String} role - Role of the scout
 * @param {Array} Roles - Roles of the scout
 * 
 * @throws {ServiceError} - If the user is not allowed to view this part of the application
 */

const checkRole = (role, Roles) => {
  const hasPermission = Roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

/**
 * 
 * @param {String} Email - Email of the scout
 * @param {String} Password - Password of the scout
 * 
 * @throws {ServiceError} - If the given email and password do not match
 * 
 * @returns {Object} Scout object with token
 */

const login = async (Email, Password) => {
  const scout = await scoutRepository.findByEmail(Email);

  if (!scout) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }

  const passwordValid = await verifyPassword(Password, scout.Password_hash);

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }

  return await makeLoginData(scout);
};

/**
 * 
 * @returns {Array} All scouts
 */

const getAll = async () => {
  const scouts = await scoutRepository.findAll();
  return {
    items: scouts.map(makeExposedUser),
    count: scouts.length,
  };
};

/**
 * 
 * @param {Number} id - ScoutID
 * 
 * @returns {Object} Scout with the given id
 */

const getById = async (id) => {
  const scout = await scoutRepository.findById(id);
  if (!scout) {
    throw ServiceError.notFound("No ID provided");
  }
  return makeExposedUser(scout);
};

/**
 * 
 * @param {Number} GroupID - GroupID
 * 
 * @returns {Array} All scouts of the group with the given id
 */

const getByGroup = async (GroupID) => {
  const scouts = await scoutRepository.findByGroup(GroupID);
  return {
    items: scouts.map(makeExposedUser),
    count: scouts.length,
  };
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
 * @param {String} Password - Password of the scout
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
  Password,
}) => {
  try {
    const Password_hash = await hashPassword(Password);
    const formattedPhoneNumber =
      PhoneNumber[0] == "0" ? PhoneNumber : `0${PhoneNumber}`;
    const newScout = await scoutRepository.create({
      LastName,
      FirstName,
      DateOfBirth,
      Email,
      PhoneNumber: formattedPhoneNumber,
      Adress,
      Tak,
      IsChief,
      GroupID,
      Password_hash,
      Roles: JSON.stringify([Role.USER]),
    });
    return await getById(newScout);
  } catch (error) {
    throw handleDBError(error);
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
  const formattedPhoneNumber =
    PhoneNumber[0] == "0" ? PhoneNumber : `0${PhoneNumber}`;
  const scoutToUpdate = await scoutRepository.updateById(id, {
    LastName,
    FirstName,
    DateOfBirth,
    Email,
    PhoneNumber: formattedPhoneNumber,
    Adress,
    Tak,
    IsChief,
    GroupID,
  });

  if (!scoutToUpdate) {
    throw ServiceError.notFound(`No Scout found with ID ${id}`);
  }

  return scoutToUpdate;
};

/**
 * 
 * @param {Number} id - ScoutID
 */

const deleteById = async (id) => {
  const scoutToDelete = await scoutRepository.deleteById(id);
  if (!scoutToDelete) {
    throw ServiceError.notFound(`No Scout found with ID ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  login,
  checkAndParseSession,
  makeExposedUser,
  makeLoginData,
  checkRole,
  getByGroup,
};
