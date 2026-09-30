import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    
    try{
        const notes=await Note.find().sort({createdAt:-1}); //newset first and 1 for default 
        res.status(200).json(notes);
    }catch(error){
        console.error("Error in getAllNotes notes:", error);
        res.status(500).json({message:"Internal server error"});
    }
    
}

export async function getNoteById(req,res){

    try{
        const note=await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.json(note);
    }catch(error){
        console.error("Error in getNoteById:", error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function createNote(req,res){

    try{
        const {title,content}=req.body;
        const newNote=new Note({title,content});

        await newNote.save();
        res.status(201).json({message:"Note created successfully"});
        
    }catch(error){
        console.error("Error in createNote:", error);
        res.status(500).json({message:"Internal server error"});
    }
    
}

export async function updateNote(req,res){
 
    try{
        const {title,content}=req.body;
        const updatedNote= await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new:true}
        );  
        
        //if the note with the given id is not found, return 404 error
        if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note updated successfully"},updatedNote);
    }catch(error){
        console.error("Error in updateNote:", error);
        res.status(500).json({message:"Internal server error"});
    }
 
}

export const deleteNote= async (req,res)=>{
    try{
        const deletedNote =await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message:"Note not found"});
    
        res.status(200).json({message:"Note deleted successfully"})
    }catch(error){
        console.error("Error in deleteNote:", error);
        res.status(500).json({message:"Internal server error"});
    }
}
