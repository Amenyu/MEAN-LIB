const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://amenyu:amenyu@cluster0.ekw0c.mongodb.net/Library";
const connectionParams ={
    useNewUrlParser :true,
    useUnifiedTopology:true
};

mongoose.connect(dbUrl,connectionParams)
.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.log("error");
})
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    fname:String,
    lname :String,
    username : String,
    password : String,
});

var Userdata = mongoose.model('Userdata', NewUserSchema);    

module.exports = Userdata;