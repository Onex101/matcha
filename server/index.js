const express = require('express');
const cors = require('cors');
var con = require('./db.js');
var User = require('./models/userModel.js');
var userControl = require('./controllers/userController.js');
const bodyParser = require('body-parser');
var userRoutes = require('./routes/user.js');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /users');
});

app.use(userRoutes);

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});