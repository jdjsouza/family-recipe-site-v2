const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Create GET for Admin Page to use
// url /api/user/access
router.get('/access', rejectUnauthenticated, (req, res) => {
  console.log('User Access levels', req.params);
  const queryText = `SELECT "id", "username", "first_name", "last_name", "email", "access_level" FROM "user";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting units', err);
      res.sendStatus(500);
    });
});

// Create Delete for deleting a requested account
router.delete('/del/:id', rejectUnauthenticated, (req, res) => {
  console.log('Delete route', req.params.id);
  console.log('Access Level', req.user);
  if (req.user.access_level === 0) {
    pool
      .query('DELETE FROM "user" WHERE id=$1', [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error DELETE', error);
        res.sendStatus(500);
      });
    return;
  }
  res.sendStatus(403);
});

// Create PUT for authorizing a new user
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
  console.log('Update route', req.params.id);
  console.log('Access Level', req.user);
  if (req.user.access_level === 0) {
    pool
      .query('UPDATE "user" SET access_level = 1 WHERE "user".id=$1;', [
        req.params.id,
      ])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error Update', error);
        res.sendStatus(500);
      });
    return;
  }
  res.sendStatus(403);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, firstName, lastName, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
