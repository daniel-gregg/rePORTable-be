require('dotenv').config()
const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    designation: "Dr",
    bio: "A special doctor",
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    designation: "Ms",
    bio: "A special lady",
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
