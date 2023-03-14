// connects routes to express, the auth to verify they are logged in, and with both models
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
    let css = ['calendar.css']
    res.render('homepage', {
      css,
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
  let css = ['login.css']
  res.render('login', { css });
});
// signup route that redurects them to the homepage if they are logged in
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  let css = ['signup.css']
  res.render('signup', { css });
});
// sends user to the add event page if they are logged in
router.get('/addevent', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  let css = ['add.css']
  res.render('addevent', { css });
});
// sends user to the update event page if they are logged in (for future development)
router.get('/updateevent', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  let css = ['edit.css']
  res.render('updateevent', { css });
});

// route to display events that are tied to a users session_id
router.get('/test', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Events }], 
    });
    
    res.json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;