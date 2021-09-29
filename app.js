const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json());
const port=4000;
//connection to db
const dburl='mongodb+srv://akshay:akshay100@cluster0.uapji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>{app.listen(port)
            console.log(`succesful connection to db and listening at port ${port}`)
    })
    .catch((err)=>console.log(err))
const userdetailSchema = new mongoose.Schema({
  name : String,
  email : String,
  password: String
});


const Userdetail = new mongoose.model("Userdetail", userdetailSchema);



var Schema = mongoose.Schema;
const detailsSchema =new Schema({
  name : String,
  usn : String,
  subject : String,
  marks : Number
});

const Details = mongoose.model("Details", detailsSchema);



app.get("/" , function(req,res){
  res.render('index');
});

app.get("/sign", function(req,res){
  res.render('sign');
});


app.post("/sign", function(req,res){
  
const newUserdetail = new Userdetail({
  name: req.body.name,
  password:md5(req.body.password),
  email: req.body.email
});
newUserdetail.save(function(err){
  if(err){
    console.log(err);
  }else{
   res.send({redirect:"/sign"})
  }
});
});


app.post("/inputpage", function(req,res){
  const newDetails = new Details({
  name : req.body.name,
  usn : req.body.usn,
  subject: req.body.subject,
  marks : req.body.marks
});
newDetails.save(function(err){
  if(err){
    console.log("err");
  }else{
    res.redirect("/display");
  }
});
});

app.get("/inputpage",function(req,res){
  res.render("inputpage");
});

app.post("/login", function(req,res){
  console.log(req.body);
  const email= req.body.email;
  const password = md5(req.body.password);
  Userdetail.findOne({email:req.body.email},function(err , userFound){
    if(err){
      console.log("enter valid credentials");
    }else{
      if(userFound){
        if (userFound.password === password){
          res.send({redirect:"/inputpage"})
        }
      }
    }
  });
});

app.get("/display",(req,res)=>{
  Details.find()
  .then(data=>{
    res.render('display',{data:data})
  })
  .catch(err=>console.log(err))
})

