const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 8080;

// console log requests
app.use(morgan('tiny'));

// mongo db connection
connectDB();

// parse request to body parser
// fetch the content from frontend
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');
// if we create all our ejs files in views folder then we do not require to give path to ejs files, however if we create a new folder and then create ejs files in that folder then we need to give the path of that folder
// app.set("views", path.resolve("views/ejs"))

// load assets using middleware
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
// to access css or img or js files use /css.filename.css

// load routers
app.use('/', require('./server/routes/router'));

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
