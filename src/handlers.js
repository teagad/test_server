require('dotenv').config()
const path =require('path');
const Pers=require('./person');
const jwt = require("jsonwebtoken");

const loginpost = async (req, res)=>{
  const {username, password} = req.body;
  const user =await Pers.findOne({name: username}) ?? await Pers.findOne({email: username});
  if (user && user.password == password) {
    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    res.json({status : "loged in",token: token});
  } else {
    res.json("wrong nickname/email or password");
  }
};

const registerpost = async (req, res)=>{
  const {username, password, email} = req.body;
  const pers = new Pers({
    name: username,
    password: password,
    email: email,
  });
  const user = await Pers.findOne({email: email});
  if (!user && username && password && email) {
    const token = jwt.sign(pers.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    await pers.save();
    res.json({status : "loged in",token: token});
  } else {
    res.json('not all params given');
  }
};

const logedinget = async (req, res)=>{
  res.json(req.user);
};

const isAuth = function(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1]
  if (token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
      if(err) return res.sendStatus(403);
      req.user = user;
      next()
    })
  }
  else res.sendStatus(401);
};

module.exports = {
  loginpost,
  registerpost,
  logedinget,
  isAuth
};
