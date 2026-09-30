import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { LoaderIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {ArrowLeft,Trash} from 'lucide-react' 

const NoteDetailsPage = () => {
  
  const [note,setNote]=useState(null);
  const [loading,setLoading]=useState(true)
  const [saving,setSaving]=useState(false)
  
  const navigate=useNavigate()
  
  const {id}=useParams();
  
  //get the data from the back end
  useEffect(()=>{
    const fetchNote=async()=>{
       try{
          const res=await api.get(`/notes/${id}`);
          setNote(res.data)
       }catch(err){
          console.log("error in fetching note",err)
          toast.error("failed to fetch the note")
       }finally{
          setLoading(false)
       }
    }

    fetchNote();

  },[id])

  console.log({note})

  //delete function when click on delete
  const handleDelete=async()=>{
    if(!window.confirm("Are you sure you want to delete this note")) return;

    try{
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    }catch(error){
      toast.error("failed to delete the note")
      console.log("failed to delete note",err)
    }
  }

  const handleSave=async()=>{
    //check both feilds are there
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title or content");
      return
    }
    setSaving(true)
    try{
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully")
      navigate("/")
    }catch(err){
      toast.error("Failed to update Note")
      console.log("failed to update note",err)
    }finally{
      setSaving(false)
    }

  }

  if(loading){
    return(
      <div className='min-h-screen bg-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">

        <div className='max-w-2xl mx-auto'>
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost flex">
              <ArrowLeft className='h-5 w-5'/>
              Back to Note 
            </Link>
            <button onClick={handleDelete} className="btn  btn-error btn-outline">
              <Trash className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">

            {/* title input */}
              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <br/>
                  <input type="text" placeholder="Note title"
                  className="input input-bordered" value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})} />
              </div>

            {/* content input */}
              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <br/>
                  <textarea placeholder="Write your note here"
                  className="textarea textarea-bordered" value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})} />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving ..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>
        </div>
      
      </div>
    </div>

  )
}

export default NoteDetailsPage
