const express = require('express');
const cors = require('cors');
var con = require('./db.js');
var User = require('./models/userModel.js');
var userControl = require('./controllers/userController.js');
const bodyParser = require('body-parser');
var routes = require('./routes/user.js');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /users');
});

newUser = new User('');
// console.log('New User: ' + JSON.stringify(newUser));

newUser.getById(25, function (){
    newUser.data['user_name'] = 'Potato';
    // newUser.set('user_name', 'DIT WERK SO LEKKER');
    // newUser.set('last_name', 'BOEREWORS');
    newUser.update();
});

setTimeout(function(){
    console.log(newUser);
}
,3000);

app.use(routes);
// Strains

// app.get('/users/add', (req, res) => {
//     const { first_name, email, password } = req.query;
//     console.log(first_name, email);
//     const INSERT_USER_QUERY = `INSERT INTO users (first_name, email, password) VALUES('${first_name}', ${email}, ${password})`;
//     con.query(INSERT_USER_QUERY, (err, results) => {
//         if (err){
//             return res.send(err)
//         }
//         else
//             return res.send('Succesfully added product')
//     });
// });

// app.post('/users/add', (req, res) => {
//     const { first_name, last_name, email, password } = req.body;
//     // user = new User();
//     // console.log(first_name, last_name, email, password);
//     // user.data['first_name'] = first_name;
//     // user.data['last_name'] = last_name;
//     // user.data['email'] = email;
//     // user.data['password'] = password;
//     // console.log(user);
//     // if (user.save())
//     //     res.send('Succesfully added product')
//     const INSERT_USER_QUERY = `INSERT INTO users (first_name, last_name, email, password) VALUES('${first_name}', '${last_name}', '${email}', '${password}')`;
//     con.query(INSERT_USER_QUERY, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.send(err)
//         }
//         else {
//             console.log("not err");
//             return res.send('Succesfully added product')
//         }
//     });
// });

app.get('/users', (req, res) => {
    con.query(SELECT_ALL_USERS_QUERY, (err, results) => {
        if (err) {
            console.log('Database connection error...')
            return res.send(err)
        }
        else {
            console.log('You are now connected...')
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});


