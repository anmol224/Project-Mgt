import AddClientModal from "../Components/AddClient";
import AddProject from "../Components/AddProject";
import Client from "../Components/Client";
import Project from "../Components/Project";



export default function Home () {
    return(
        <>
        <div className="d-flex mb-3 justify-content-between ">
            <AddClientModal/>
            <AddProject/>
        </div>
      
        <Project/>
        <hr></hr>
        <Client/>
        </>

    )
}