import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer'
// import 'dotenv/config'
// import pg from 'pg'


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index.ejs')
})

app.get('/register', function (req, res) {
  res.render('register.ejs')
})

app.get('/login', function (req, res) {
  res.render('login.ejs')
})


app.listen(3000, function (req, res) {
  console.log("server started")
})