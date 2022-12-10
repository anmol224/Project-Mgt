import {useQuery,useMutation} from "@apollo/client" 

import {useState} from "react"
import { FaList } from "react-icons/fa"
import { GET_CLIENTS } from "../query/ClientQuery"
import { ADD_PROJECT } from "../Mutation/ProjectMutation"
import { GET_PROJECTS } from "../query/ProjectQuery"
export default function AddProject(){
  
    const [name,setName]=useState('')
    const [description,setDesc] =useState('')
    const [status,setStatus] =useState('new')
    const [ClientId,setClientId] = useState('') 
    const [addProject] =useMutation(ADD_PROJECT,{
      variables:{
        name,
        description,
        status,
        ClientId
      },
      refetchQueries:[{query:GET_PROJECTS}]
    })
    const submitProject=(e) =>{
        e.preventDefault();
        if(name ==='' || description ==='')
          return alert("Please add all fields")
      
      addProject(name,description,status,ClientId)
      setName('')
      setStatus('new')
      setDesc('')
      setClientId('')
    }
   
    const {loading,error,data} =useQuery(GET_CLIENTS)
    if(loading)
        return null;
    if(error)
        return 'Something went Wrong'
    if(!loading && !error)
    return (
        <>  
           
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ProjectModal">
  <div className="d-flex align-items-center">
    <FaList  className="icon" />
    <div>New Project</div>
  </div>
</button>


<div className="modal fade" id="ProjectModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <form onSubmit={submitProject}>
                <div className="form-group mb-3">
                     <label htmlFor="name" className="form-label">Name</label>   
                     <input type="text" className="form-control" value={name} id="name" onChange={(e) => setName(e.target.value)} /> 
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" value={description} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <div className=" mb-3">
                    <label  className="form-label">Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value='new'>
                            Not started
                        </option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>completed</option>
                    </select>
                </div>
                <div className=" mb-3">
                    <label className="form-label">Client</label>
                    <select className="form-select" value={ClientId} onChange={(e) => setClientId(e.target.value)}>
                      <option value="">Select Your Client</option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>

                </div>
                <button type="submit"  data-bs-dismiss="modal"  className="btn btn-primary mb-3">Submit</button>
            </form>
      </div>
     
    </div>
  </div>
</div>
        </>
    )
}