const router = require('express').Router();
const { Events } = require('../../models');
const withAuth = require('../../utils/auth');

// check the post route once views are complete and we can login/signup
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newEvent = await Events.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});
// delete route to delete an event based off of an id (for future development)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // paramaters where id has to equal session id
    const eventData = await Events.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No Event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// route to update an event based off of an id with fields for title, description, date, and time
router.put('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Events.update(
        {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },  
        });
    if (!eventData) {
        res.status(404).json({ message: 'No Event found with this id!' });
        return;
        }
      
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
