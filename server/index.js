require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const controller = require('./controllers/authController')

const app = express();

app.use(express.json());

const {CONNECTION_STRING, SESSION_SECRET} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
)

app.route('/auth/register').post(controller.register)

const PORT = 4000;

app.listen(PORT, () => console.log(`Working on ${PORT}`))