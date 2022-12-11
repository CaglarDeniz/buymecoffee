import './components/submitProject.css';
import EditProjectHeader from './components/EditProjectHeader';
import EditProjectContent from './components/EditProjectContent';
import { useParams } from 'react-router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import BackendURL from './BackendURL';

function EditProject(props) {
    let params = useParams();
    const [project, setProject] = useState({})

    useEffect( () => {
      axios.get(BackendURL + "/api/project/"+params.projectId).then( (res) => {
      //console.log(res.data.data[0]);
      setProject(res.data.data[0]);
      }).catch( (err) => {
        console.log(err);
      });
    }, [setProject, params.projectId])
    
 
    return (
        <div className="project-wrap">
          <EditProjectHeader username={props.username}/>
          <EditProjectContent project={project} username={props.username} />
        </div>
    );
      
}

export default EditProject
