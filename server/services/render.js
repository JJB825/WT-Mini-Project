exports.loginRoute = (req, res) => {
  res.render('login');
};

exports.signUpRoute = (req, res) => {
  res.render('signup');
};

exports.homeRoute = (req, res) => {
  res.render('home');
};

exports.feedback = (req, res) => {
  const driverName = req.query.name;
  const rideCode = req.query.code;
  res.render('feedback', { driverName: driverName, rideCode: rideCode });
};
