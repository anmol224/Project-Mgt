import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../query/ProjectQuery";
import { DELETE_PROJECT } from "../Mutation/ProjectMutation";
import {useNavigate} from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
export default function DeleteProject({projectid}){
    const navigate=useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables:{id:projectid},
        onCompleted:() => navigate('/'),
        refetchQueries:[{query:GET_PROJECTS}]
    })
    return(
       <>
        <div className="d-flex  mt-3">
            <button type="button" onClick={deleteProject}  className="btn btn-danger ms-auto"><FaTrash className="icon"/> DeleteProject</button>
        </div>

       </>
    )
}