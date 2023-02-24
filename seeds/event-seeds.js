const { Events } = require('../models');

const eventsData = [
  {
    title: 'Halloween',
    description: 'Happy Halloween!',
    date: '10/31/2023',
    user_id: 1,
  },
  {
    title: 'Christmas',
    description: 'Merry Christmas!',
    date: '12/25/2023',
    user_id: 1,
  },
];

const seedEvents = () => Events.bulkCreate(eventsData);

module.exports = seedEvents;
