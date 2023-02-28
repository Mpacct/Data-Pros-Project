const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- Users SEEDED -----\n');
  
    await seedEvents();
    console.log('\n----- Events SEEDED -----\n');
  
    process.exit(0);
  };
  
  seedAll();
