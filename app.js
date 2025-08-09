const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection.js');
const config = require('config');
require('dotenv').config();


const flash = require("connect-flash");
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'process.env.EXPRESS_SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));
app.use(flash());

const userRouter = require('./routes/UserRouter.js')

// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'round2', 'frontend','pages'));

// Serve CSS, JS, and linked HTML files
// app.use(express.static(path.join(__dirname,'round2')));
app.use(express.static(path.join(__dirname, 'round2', 'frontend')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.get('/', function(req,res){
    res.render('index');
})

app.get('/budget', (req, res) => res.render('budget'));
app.get('/savings', (req, res) => res.render('savings'));
app.get('/quiz', (req, res) => res.render('quiz'));
app.get('/investments', (req, res) => res.render('investments'));
app.get('/welcome', (req, res) => res.render('welcome'));


app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
