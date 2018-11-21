const express = require('express');
const cors = require('cors');
var con = require('./db.js');
var User = require('./models/userModel.js');
const bodyParser = require('body-parser');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded)


app.get('/', (req, res) => {
    res.send('go to /users');
});


// var assignUser = function(data) {
newUser = new User('');
newUser.search(7, 'id');
//     console.log('got data: ' + JSON.stringify(data));
//     console.log('New User: ' + JSON.stringify(user));
// };

// newUser.data = { id: 7,
//   first_name: 'Harry',
//   last_name: 'Patterson',
//   user_name: 'TALPAT',
//   email: 'tp@gmale.com',
//   password: 'bruddah'
// }
// console.log(newUser.data['first_name']);

// newUser.save();

setTimeout(function(){
    console.log(newUser);
}, 3000);

// console.log('Print again: ' + JSON.stringify(user));




// next.catch((err) => console.error(err)).then((newUser)=> console.log("NEXT:", newUser));
// console.log("after");
// // (async () => {
// console.log("TEst: ", con.get())

// })()


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

app.post('/users/add', (req, res) => {
    // const { name, price } = req.query;
    // console.log(req.body);
    const { first_name, last_name, email, password } = req.body;
    // console.log(name, price);
    const INSERT_USER_QUERY = `INSERT INTO users (first_name, last_name, email, password) VALUES('${first_name}', '${last_name}', '${email}', '${password}')`;
    con.query(INSERT_USER_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err)
        }
        else {
            console.log("not err");
            return res.send('Succesfully added product')
        }
    });
});

app.get('/users', (req, res) => {
    // console.log('Got it')
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


