import mongoose, { trusted } from 'mongoose';

// 1. create schema
//2. model based off of that schema

//object called note schema
const noteSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
    },
    {timestamps:true} //created at ,updated at will be automatically added to the schema
);

const Note =mongoose.model("Note",noteSchema);

export default Note
