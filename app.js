let express=require("express");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");
const ejs=require("ejs");
var num=0;
const Questions=require("./models/questions");

let app=express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/zielDB",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    console.log(num);
    num++;
    
        Questions.find({},function(err,ques){
            if(!ques[num]){
                res.render("thankyou");
            }
            res.render("main",{number:num,item:ques[num]});
        })
    
    
});


app.post("/upload",function(req,res){
   
    //upload the data from req.body
});



app.listen(3000,function(){
    console.log("server is running at port 3000");
});