import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../query/ProjectQuery";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
export default function Project(){
    const  {loading,error,data} =useQuery(GET_PROJECTS)
    if(loading)
        return <Spinner/>
    if(error)
        return <p>Something went Wrong</p>
    return (
        <>
        {data.projects.length > 0 ? (
            <div className="row mt-2">
               {data.projects.map(project => (
                <ProjectCard key={project.id} project={project}/>
               ))}
            </div>
         ):(
            <p>No Projects</p>
         ) }
        </>
    )
}