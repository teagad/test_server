require('dotenv').config()
const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose');
const {loginPost, registerPost, logedinGet, isAuth} = require('./src/handlers.js');
const app = express();
const port = 3000;
const uri =process.env.URI;

// connect MongoDb and starting server
async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    }).then(console.log('connected'));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();

app.use(express.json());

app.post('/', loginPost);

app.post('/register', registerPost);

app.get('/loged_in', isAuth, logedinGet);
