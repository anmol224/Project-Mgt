import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../Mutation/ClientMutation";
import {useState} from "react"
import {FaUser} from "react-icons/fa"
import { GET_CLIENTS } from "../query/ClientQuery";

export default function AddClientModal(){
 
    const [name,setName] =useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')

    const [addClient] =useMutation(ADD_CLIENT,{
      variables:{
        name,email,phone
      },
      refetchQueries:[{query:GET_CLIENTS}]
    })
    const onSubmit=(e) =>{
      e.preventDefault();
    if(name ==="" || email ==="" || phone==="")
      return alert('Please fill all the fields')
   addClient(name,email,phone)
   setName('')
   setPhone('')
   setEmail('')
  }
    return(
        <>
         <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="d-flex align-items-center">
                <FaUser className="icon"/>
                <div>Add Client</div>
            </div>
        </button>


<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={onSubmit} >
  <div className="form-group mb-3">
    <label htmlFor="name" className="form-label">Name:</label>
    <input type="text" className="form-control"  value={name} onChange={(e) => setName(e.target.value)} id="name"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="email"  className="form-label">Email:</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="phone"  className="form-label">Phone:</label>
    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="phone"/>
  </div>
  <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">Submit </button>
</form>
      </div>
      
    </div>
  </div>
</div>

        </>

    )
}