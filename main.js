const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose');
const {loginpost, registerpost, logedinget, isAuth} = require('./src/handlers.js');
const app = express();
const port = 3000;
const uri ='mongodb+srv://teagad:zx98754Y@cluster0.qvzlvdb.mongodb.net/?retryWrites=true&w=majority';

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

app.post('/', loginpost);

app.post('/register', registerpost);

app.get('/loged_in', isAuth, logedinget);
