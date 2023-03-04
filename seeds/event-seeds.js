const { Events } = require('../models');

const eventsData = [
  {
    title: 'Halloween',
    description: 'Happy Halloween!',
    date: '2023-10-31',
    time: '10:35:00',
    user_id: 1,
  },
  {
    title: 'Christmas',
    description: 'Merry Christmas!',
    date: '2023-12-25',
    time: '10:35:00',
    user_id: 1,
  },
];

const seedEvents = () => Events.bulkCreate(eventsData);

module.exports = seedEvents;
