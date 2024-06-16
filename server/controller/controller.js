const usercollection = require('../model/loginSchema');
const bcrypt = require('bcrypt');

// add new user details during signup
exports.signup = async (req, res) => {
  // validate request
  if (!req.body) {
    // return a error message if the user sends empty content in finding user
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }

  // retrieve data from form
  const new_user = usercollection({
    name: req.body.name,
    password: req.body.password,
  });

  // check if user already exists
  const existingUser = await usercollection.findOne({ name: new_user.name });

  if (existingUser) {
    res
      .status(401)
      .send({ message: 'User already exists. Please try using other name' });
  } else {
    // hashing password using bcrypt for preventing hacking
    const saltrounds = 10; // Number of salt rounds for bcrypt
    // convert the password into hash form and save in hashpassword
    const hashpassword = await bcrypt.hash(new_user.password, saltrounds);
    new_user.password = hashpassword;

    // save user in the database
    new_user
      .save(new_user)
      .then((data) => {
        res.redirect('/?signup=success');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while signup',
        });
      });
  }
};

exports.login = async (req, res) => {
  // validate request
  if (!req.body) {
    // return an error message if the user sends empty content in finding user
    res.status(400).send({ message: 'Enter your credentials!' });
    return;
  }

  try {
    // check whether user is registered or not
    const check = await usercollection.findOne({ name: req.body.name });
    if (!check) {
      res
        .status(403)
        .send({ message: `You haven't registered. Register first` });
      return; // Add this return statement
    }

    // compare the hashed password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.redirect('/home');
    } else {
      res.status(401).send({ message: `Incorrect Password` });
    }
  } catch {
    res.status(500).send({ message: `Enter valid credentials` });
  }
};

const drivers = [
  {
    name: 'Rajesh',
    gender: 'Male',
    vehicleNumber: 'MH01BB66',
    driverNumber: '+1234567890',
    start: 'Malad',
    end: 'Goregaon',
  },
  {
    name: 'Gita',
    gender: 'Female',
    vehicleNumber: 'MH02AB66',
    driverNumber: '+1987654321',
    start: 'Jogeshwari',
    end: 'Dadar',
  },
  {
    name: 'Sunil',
    gender: 'Male',
    vehicleNumber: 'MH06BA63',
    driverNumber: '+1122334455',
    start: 'Malad',
    end: 'Goregaon',
  },
  {
    name: 'Anita',
    gender: 'Female',
    vehicleNumber: 'MH01CC48',
    driverNumber: '+9988776655',
    start: 'Jogeshwari',
    end: 'Dadar',
  },
  {
    name: 'Sanjay',
    gender: 'Male',
    vehicleNumber: 'MH06DD64',
    driverNumber: '+5544332211',
    start: 'Thane',
    end: 'Kalyan',
  },
  {
    name: 'Sri',
    gender: 'Female',
    vehicleNumber: 'MH01DC45',
    driverNumber: '+6677889900',
    start: 'Bhandup',
    end: 'Vidya Vihar',
  },
  {
    name: 'Santosh',
    gender: 'Male',
    vehicleNumber: 'MH02EH48',
    driverNumber: '+1234567890',
    start: 'Thane',
    end: 'Kalyan',
  },
  {
    name: 'Sunita',
    gender: 'Female',
    vehicleNumber: 'MH10FF97',
    driverNumber: '+987654321',
    start: 'Kharghar',
    end: 'Vashi',
  },
  {
    name: 'Ram',
    gender: 'Male',
    vehicleNumber: 'MH05CD42',
    driverNumber: '+6677889900',
    start: 'Kharghar',
    end: 'Vashi',
  },
];

exports.ridebooking = (req, res) => {
  // validate request
  if (!req.body) {
    // return an error message if the user sends empty content
    res.status(400).send({ message: 'Enter details of ride!' });
    return;
  }

  try {
    const start = req.body.pickupLocation;
    const end = req.body.dropoffLocation;
    const available_drivers = drivers.filter(function (driver) {
      return driver.start === start && driver.end === end;
    });
    if (available_drivers.length === 0) {
      res.status(404).send({ message: 'Drivers not available for this route' });
      return;
    } else {
      res.render('drivers', { drivers: available_drivers });
    }
  } catch {
    res.status(500).send({ message: 'Some error occurred from server' });
  }
};
