import React from 'react'

import {Link} from 'react-router-dom'
import {SquarePen} from "lucide-react"
import {Trash} from "lucide-react"
import {formatDate} from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { useState } from 'react'

const NoteCard = ({note,setNotes}) => {

    //delete function
    const handleDelete=async(e,id)=>{
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this note")) return;

        try{
            await api.delete(`/notes/${id}`)
            setNotes((prev)=>prev.filter((note)=>note._id !==id))   //get rid of deleted ones
            toast.success("Note deleted successfully");
        }catch(err){
            toast.error("failed to delete the note")
            console.log("failed to delete note",err)
        }

    }

    return (
        <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg rounded-lg transition-shadow duration-200 border-t-4 
        border-[#00FF9D]">
        
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <SquarePen className="size-4"/>
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e)=>handleDelete(e,note._id)}>
                            <Trash className="size-4"/>
                        </button>

                    </div>

                </div>
            </div>

        </Link>
    )
}

export default NoteCard
