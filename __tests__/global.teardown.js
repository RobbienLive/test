const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.inschrijving).delete();
  await getKnex()(tables.event).delete();
  await getKnex()(tables.scout).delete();
  await getKnex()(tables.group).delete();

  // Close database connection
  await shutdownData();
};
