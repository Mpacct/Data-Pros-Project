const { Users } = require('../models');

const userData = [
    {
      name: "Nick",
      email: "nick@n.com",
      password: "Abc123"
    }
  ];

  const seedUser = () => Users.bulkCreate(userData);

  module.exports = seedUser;