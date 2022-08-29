require('dotenv').config()
const path =require('path');
const Pers=require('./person');
const jwt = require("jsonwebtoken");

const loginPost = async (req, res)=>{
  const {username, password} = req.body;
  const user =await Pers.findOne({name: username}) ?? await Pers.findOne({email: username});
  if (user && user.password == password) {
    const token = jwt.sign(user._id.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    res.json({status : "loged in",token: token});
  } else {
    res.json("wrong nickname/email or password");
  }
};

const registerPost = async (req, res)=>{
  const {username, password, email} = req.body;
  const pers = new Pers({
    name: username,
    password: password,
    email: email,
  });
  const user = await Pers.findOne({email: email});
  if (!user && username && password && email) {
    await pers.save();
    const token = jwt.sign(pers._id.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    res.json({status : "loged in",token: token});
  } else {
    res.json('not all params given');
  }
};

const logedinGet = async (req, res)=>{
  const {name,email} = req.user;
  res.json({username:name, email:email});
};

const isAuth = function(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1]
  if (token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, user_id)=>{
      if(err) return res.sendStatus(403);
      req.user = await Pers.findById(user_id);
      console.log(req.user);
      next()
    })
  }
  else res.sendStatus(401);
};

module.exports = {
  loginPost,
  registerPost,
  logedinGet,
  isAuth
};
