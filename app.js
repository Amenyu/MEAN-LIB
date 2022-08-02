const express = require('express');
const BookData = require('./src/model/Bookdata');
const UserData = require('./src/model/Userdata');

const path = require('path');
app.use(express.static('./dist/frontend'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
   });
   

const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyparser.json());


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/api/insert',verifyToken,function(req,res){
   
    var bookdata = {       
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        authName : req.body.book.authName,
        description : req.body.book.description,
        imageUrl : req.body.book.imageUrl,
   }       
   var book = new BookData(bookdata);
   book.save();
});
app.get('/api/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/:id',  (req, res) => {
  
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})



app.post('/api/login', (req, res) => {
    let userData = req.body
    var flag=false;
    
        UserData.find()     
        .then(function (user) {
            for(let i=0;i<user.length;i++){        
                if(userData.username==user[i].username && userData.password==user[i].password){
                    flag=true;
                    break;
                }
                else{
                    flag=false;
                }
            }
            if(flag==true){
              let payload = {subject: userData.username+userData.password}
              let token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token});
            }
            else{
              res.status(401).send('Invalid UserName or Password');
            }
        });  
    })

    app.put('/api/update',(req,res)=>{
  
      id=req.body._id,
      bookId= req.body.bookId,
      bookName = req.body.bookName,
      productCode = req.body.bookCode,
      authName = req.body.authName,
      description = req.body.description,
      imageUrl = req.body.imageUrl
     BookData.findByIdAndUpdate({"_id":id},
                                  {$set:{"bookId":bookId,
                                  "bookName":bookName,
                                  "productCode":productCode,
                                  "authName":authName,
                                  "description":description,
                                  "imageUrl":imageUrl}})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/api/remove/:id',(req,res)=>{
   
     id = req.params.id;
     BookData.findByIdAndDelete({"_id":id})
     .then(()=>{
         res.send();
     })
   })

   app.post('/api/signup',function(req,res){
   
    var userdata = {       
        fname : req.body.fname,
        lname : req.body.lname,
        username : req.body.username,
        password : req.body.password   
   }       
   UserData.find()     
        .then(function (user) {
            for(let i=0;i<user.length;i++){        
                if(userdata.username==user[i].username){
                    flag=true;
                    break;
                }
                else{
                    flag=false;
                }
            }
            if(flag){
                res.status(401).send({status:'Username already exist!'});
            }
            else{
                var user = new UserData(userdata);
                user.save();
                res.status(200).send({status:'Registration completed successfully'});
            }
        });  
});
     

   const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Ready on ${PORT}`);   
});


