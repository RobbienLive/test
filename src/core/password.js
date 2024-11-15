const config = require("config");
const argon2 = require("argon2");

const ARGON_SALT_LENGTH = config.get("auth.argon.saltLength");
const ARGON_HASH_LENGTH = config.get("auth.argon.hashLength");
const ARGON_TIME_COST = config.get("auth.argon.timeCost");
const ARGON_MEMORY_COST = config.get("auth.argon.memoryCost");

/**
 * Hashes the given password.
 *
 * @param {String} password - The password to hash.
 *
 * @returns {String} The hashed password.
 */

const hashPassword = async (password) => {
  const passwordHash = await argon2.hash(password, {
    saltLength: ARGON_SALT_LENGTH,
    hashLength: ARGON_HASH_LENGTH,
    timeCost: ARGON_TIME_COST,
    memoryCost: ARGON_MEMORY_COST,
    type: argon2.argon2id,
  });
  return passwordHash;
};

/**
 * 
 * @param {String} password - The password to verify
 * @param {String} passwordHash - The password hash to verify against
 * 
 * @returns {Boolean} True if the password matches the hash, false otherwise
 */

const verifyPassword = async (password, passwordHash) => {
  const valid = await argon2.verify(passwordHash, password, {
    type: argon2.argon2id,
    saltLength: ARGON_SALT_LENGTH,
    hashLength: ARGON_HASH_LENGTH,
    timeCost: ARGON_TIME_COST,
    memoryCost: ARGON_MEMORY_COST,
  });
  return valid;
};

module.exports = {
  hashPassword,
  verifyPassword,
};
