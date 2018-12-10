const express = require('express');
const cors = require('cors');
var con = require('./db.js');
var User = require('./models/userModel.js');
var userControl = require('./controllers/userController.js');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoutes = require('./routes/userRoutes.js');
var session = require('express-session')


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({   secret: 'matcha',
                    saveUninitialized: true,
                    resave: true}))
app.use(cors());

var sess;
app.get('/', (req, res) => {
    sess = req.session;
    sess.id;
    sess.email = 'xeno@zarobi.co.za';
    sess.user_name = 'hi';
    res.send('go to /users' + JSON.stringify(sess));
});

app.use(userRoutes);

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});