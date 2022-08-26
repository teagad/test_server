const express=require('express')
const session =require('express-session')
const mongoose=require('mongoose')

const bodyParser = require('body-parser')
const MongoDBSession = require('connect-mongodb-session')(session);
const {loginpost,loginget,registerpost,registerget,logedinget} = require('./src/handlers.js')
const app = express();
const port = 3000;
const uri ='mongodb+srv://teagad:zx98754Y@cluster0.qvzlvdb.mongodb.net/?retryWrites=true&w=majority'
//connect MongoDb and starting server
async function start(){
  try{
    await mongoose.connect(uri,{
      useNewUrlParser: true,
    }).then(console.log("connected"))
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch(e){
    console.log(e)
  }
}
start()

const store = new MongoDBSession({
  uri:uri,
  collection:"session"
})

app.use(express.urlencoded({extended:false}));

app.use(
  session({
    secret:"lll",
    cookie: {},
    resave: false,
    saveUninitialized:false,
    store:store,
  })
);

const isAuth = function(req,res,next){
  if(req.session.isAuth) next();
  else res.send("is not auth");
}

app.get('/',loginget)

app.post('/',loginpost)

app.get('/register',registerget)

app.post('/register',registerpost)

app.get("/loged_in",isAuth,logedinget)
