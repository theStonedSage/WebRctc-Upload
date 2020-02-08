let express=require("express");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");
const ejs=require("ejs");
var num=0;
const Questions=require("./models/questions");
// const path = require('path');
// const util = require('util');
// const fs = require('fs-extra');
// const colors = require('colors/safe');
const formidable = require('formidable');

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

const targetDir = 'uploads';
    // fs.ensureDirSync(targetDir);

app.post("/upload",function(req,res){
    
    let form = new formidable.IncomingForm();
    form.uploadDir = targetDir;
    form.keepExtensions = true;

    console.log("here");

    console.log('saving uploaded file...');

    form.on('error', (err) => {
        console.log(colors.red('upload error:'));
        console.log(err);
    });

    form.on('fileBegin', (name, file) => {
        
        file.name="question_"+num;
        file.path = form.uploadDir + '/' + file.name;
        console.log('filename:', file.name);
    });

    form.on('end', () => {
        console.log('saved file.');
        console.log('');
    });

    form.parse(req, (err, fields, files) => {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
    });

    return;


});



app.listen(3000,function(){
    console.log("server is running at port 3000");
});
