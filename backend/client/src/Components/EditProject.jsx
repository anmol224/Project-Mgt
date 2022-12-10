import { UPDATE_PROJECT } from "../Mutation/ProjectMutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_PROJECT } from "../query/ProjectQuery";
export default function EditProject({projectid}){
     const [name,setName] =useState('')
     const [description,setDesc]=useState('')
     const [status,setStatus]=useState('new')
     const [updateproject] =useMutation(UPDATE_PROJECT,{
        variables:{id:projectid , name,description,status},
        refetchQueries:[{query:GET_PROJECT,variables:{id:projectid}}]
     })
     const onSubmit=(e) =>{
            e.preventDefault();
      
            if(name ==="" || description === "")
                return alert("Please Enter All Fields")
               
            updateproject(name,description,status)
     }   
    return(
        <>
            <h4>Update Details of Project</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group m-2" >
                    <label className="form-label">Name:</label>
                    <input type="text"  value={name} onChange={(e) => setName(e.target.value) } className="form-control"  />

                </div>
                <div className="form-group m-2" >
                    <label className="form-label">Description</label>
                    <textarea value={description} onChange={(e) => setDesc(e.target.value)} type="text" className="form-control">
                        </textarea>
                </div>
                <div className="form-group m-2">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                       
                       <option value="new">Not Started</option>
                       <option value="progress">In Progress</option> 
                       <option value="completed">Completed</option>
                    </select>
                </div>    
                <button type="submit" className="btn btn-primary m-2">Submit</button>
            </form>
        </>
    )
}