import { useQuery } from "@apollo/client"
import Spinner from "../Components/Spinner"
import { GET_PROJECT } from "../query/ProjectQuery"
import {useParams,Link} from "react-router-dom"
import ClientInfo from "../Components/ClientInfo";
import DeleteProject from "../Components/DeleteProject";
import EditProject from "../Components/EditProject";

export default function Project(){
    const {id}=useParams();
    const {loading,error,data} =useQuery(GET_PROJECT,{
        variables:{id}
    })
    if(loading)
        return <Spinner/>
    if(error)
        return <p>Something Went Wrong!!</p>
  if(!loading && !error )
    return(
       
        <div className=" mx-auto card w-75 p-5">
            <Link to="/" className="btn btn-light btn-sm w-15 d-inline ms-auto ">Back</Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <h5>Status</h5>
            <p className="lead">{data.project.status}</p>
            <ClientInfo client={data.project.client}/>
            <DeleteProject projectid={data.project.id}/>
            <EditProject projectid={data.project.id}/>
        </div>
        
    )
}