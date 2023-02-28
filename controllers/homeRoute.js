const router = require('express').Router();
const { Events, Users } = require('../models');
const withAuth = require('../utils/auth');


// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Events }],
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/addevent', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('addevent');
});

router.get('/updateevent', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('updateevent');
});


router.get('/test', (req, res) => {
  // Get all books from the book table
  Events.findAll().then((bookData) => {
    res.json(bookData);
  });
});

module.exports = router;