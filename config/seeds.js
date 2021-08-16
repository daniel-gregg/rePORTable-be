require('dotenv').config()
const db = require('./connection');
const { User } = require('../models');
const { Report } = require('../models');

db.once('open', async () => {

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    designation: "Dr",
    bio: "<p>A special doctor<p>",
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    designation: "Ms",
    bio: "<p>A special lady<p>",
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  await Report.create({
    title: "<p>Natural capital and farm performance</p>",
    owner: "6114b7eaab8bfc49646c3b94",
    contributors: ["61123b8ad7512a52d84a13bc","61123b8ad7512a52d84a13bf"],
    synopsis: "<p>Natural capital on farms has more than intrinsic value, or value for society through amenity and existence values. It is the fundamental factor that enables farming in Australia. This report outlines a program to assess the value of natural capital to farm enterprises in Australia.</p>",
    content: "<p></p>",
    state: "Draft"
  });


  console.log('users seeded');

  process.exit();
});
