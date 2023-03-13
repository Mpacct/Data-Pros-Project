//connects express and users model to the user routes
const router = require('express').Router();
const { Users } = require('../../models');
// post route to save signup data to the database
router.post('/signup', async (req, res) => {
  try {
    const userData = await Users.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// post route to send password information to check if it was the correct password and logs in the u ser if it was
router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("Please Work")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("Show Password")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
// sets userdata.id to equal session.userid
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
});
// logout route to end the logged in session and set the logged_in status to false
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
