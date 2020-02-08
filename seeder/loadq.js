const mongoose=require("mongoose");
const Question=require("../models/questions");

mongoose.connect("mongodb://localhost:27017/zielDB",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});

const products=[
    new Question({
        question:"what is your name"
    }),
    new Question({
        question:"what are your hobbies"
    }),
    new Question({
        question:"why do you want the job"
    }),
    new Question({
        question:"Describe yourself"
    })
];

for(var i=0;i<products.length;i++){
    products[i].save();
}