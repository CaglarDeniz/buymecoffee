import { useParams } from "react-router";
import ProjectDetailHeader from "./components/projectDetailViewHeader";
import ProjectDetailViewBlueArea from "./components/projectDetailViewBlueArea";
import './components/projectDetailView.css';
import axios from  'axios';
import {useState, useEffect} from 'react';
import BackendURL from './BackendURL';

function ProjectDetailView(props) {
    let params = useParams();
    //console.log("params", params);
    const [curr_Project,setProject] = useState({});

    //const tempProject = {name:'Facebook x Tesla', description:'FACEBOOK X TESLA is a Project that combines tesla\'s advances in techware with facebook\'s current strategies to be able to enable more technology accessibility to those around.', ownerId:12, photoLink:"", amount:500000 , industry: "Technology", cookieString:'', cookieExpDate: new Date() }
    let projectEndpoint = BackendURL + '/api/project/';
    useEffect ( () => {
        axios.get(projectEndpoint+params.projectId).then( (res) =>{
            //console.log(res);
            setProject(res.data.data[0]);
        }).catch( function(rejected){
            console.log(rejected);
            alert('Project not found for this ID');
        });
    }, [projectEndpoint, params.projectId])
   

    return (
        <div className="projdet-wrap">
            <ProjectDetailHeader name={curr_Project.name} role={props.role} username={props.username} photo={curr_Project.photoLink}/>
            <ProjectDetailViewBlueArea id = {curr_Project._id} project={curr_Project} role={props.role}/>
        </div>
    );
}

export default ProjectDetailView;
