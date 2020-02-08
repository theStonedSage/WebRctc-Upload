const mongoose =require("mongoose");

var questionschema=mongoose.Schema({
    question:String
})

const Question =mongoose.model("question",questionschema);

module.exports = Question;