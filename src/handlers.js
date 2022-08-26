const path =require('path')
const Pers=require('./person')


const loginget = (req,res)=>{
    if(req.session.err){
      let err = req.session.err 
      delete req.session.err
      res.send(`<h1>${err}</h1>
      <a href="/">login_again</a>`);
    }
    res.sendFile(path.resolve(path.resolve(),'static','index.html'))}

const registerget = (req,res)=>{
    if(req.session.err){
      let err = req.session.err 
      delete req.session.err
      if(err){
        res.send(`<h1>${err}</h1>
        <a href="/register">register_again</a>`);
      }
    }
    res.sendFile(path.resolve(path.resolve(),'static','register.html'))
  }

const loginpost = async (req,res)=>{
    const {username , password} = req.body;
    const user =await Pers.findOne({name:username}) ?? await Pers.findOne({email:username})
    if(user && user.password == password) {
      req.session.isAuth = true;
      req.session.ind = user._id;
      req.session.cookie.expires = new Date(Date.now() + (30*1000))
      res.redirect('/loged_in');
    }
    else {
      req.session.err = "wrong nickname/email or password"
      res.redirect("/");
    
    }
  }
const registerpost = async (req,res)=>{

    const {username , password, email} = req.body;
    const pers = new Pers({
      name:username,
      password:password,
      email:email,
    })
    const user =await Pers.findOne({email:email})
    if(!user&&username&&password&&email){
      req.session.isAuth = true;
      await pers.save()
      const user2 =await Pers.findOne({email:email})
      req.session.ind = user2._id;
      req.session.cookie.expires = new Date(Date.now() + (30*1000))
      res.redirect('/')
    }
    else {
      req.session.err = "not all params given"
      res.redirect('/register')
    }
  
  }

const logedinget = async (req,res)=>{
    const user = await Pers.findById(req.session.ind)
    res.send(user??"l")
  }

module.exports = {
    loginpost,
    loginget,
    registerpost,
    registerget,
    logedinget
}