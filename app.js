const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const passport = require('passport');
const path = require('path');

//* import routes here
const tasks = require('./routes/api/task');
const dates = require('./routes/api/date');

//* connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect to MongoDB successfully!"))
  .catch(err => console.log(err))

//* setup poassport
// app.use(passport.initialize());
// require("./config/passport")(passport);
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server is running on port ${port}`))

//* setup api routes
app.use('/api/tasks', tasks);
app.use('/api/dates', dates)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
