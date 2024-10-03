// const inschrijvingRepository = require("../repository/inschrijving");
// const ServiceError = require("../core/serviceError");
// const handleDBError = require("./_handleDBError");

// const getAll = async () => {
//   const items = await inschrijvingRepository.findAll();
//   return {
//     items,
//     count: items.length,
//   };
// };

// const getById = (id) => {
//   const inschrijving = inschrijvingRepository.findById(id);

//   if (!inschrijving) {
//     throw new Error("No ID provided");
//   }
//   return inschrijving;
// };

// const getByEventId = (id) => {
//   const inschrijving = inschrijvingRepository.findByEventId(id);

//   if (!inschrijving) {
//     throw new Error("No ID provided");
//   }
//   return inschrijving;
// };

// const getByScoutId = async (scoutId) => {
//   // Ontvang scoutId als parameter
//   const items = await inschrijvingRepository.findByScoutId(scoutId);
//   if (!items) {
//     throw new Error("No ID provided");
//   }
//   return { items, count: items.length };
// };

// const create = async ({ EventID, ScoutID }) => {
//   const newInschrijving = await inschrijvingRepository.create({
//     EventID,
//     ScoutID,
//   });

//   return getById(newInschrijving);
// };

// const deleteById = async (id) => {
//   try {
//     const inschrijvingToDelete = await inschrijvingRepository.deleteById(id);
//     if (!inschrijvingToDelete) {
//       throw ServiceError.notFound(`No inschrijving found with ID ${id}`);
//     }
//   } catch (error) {
//     throw handleDBError(error);
//   }
// };

// module.exports = {
//   getAll,
//   getById,
//   getByEventId,
//   getByScoutId,
//   create,
//   deleteById,
// };
