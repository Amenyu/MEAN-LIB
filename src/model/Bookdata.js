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

var NewBookSchema = new Schema({
    bookId : Number,
    bookName : String,
    bookCode : String,
    authName : String,
    description : String,
    imageUrl : String
});

var Bookdata = mongoose.model('Bookdata', NewBookSchema);                        

module.exports = Bookdata;