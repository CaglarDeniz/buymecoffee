import './components/submitProject.css';
import EditProjectHeader from './components/EditProjectHeader';
import EditProjectContent from './components/EditProjectContent';
import { useParams } from 'react-router';
import axios from 'axios';
import {useState} from 'react';

function EditProject(props) {
    let params = useParams();
    const [project, setProject] = useState({})

    axios.get("http://localhost:8080/api/project/"+params.projectId).then( (res) => {
      //console.log(res.data.data[0]);
      setProject(res.data.data[0]);
    });
 
    return (
        <div className="project-wrap">
          <EditProjectHeader username={props.username}/>
          <EditProjectContent project={project} username={props.username} />
        </div>
    );
      
}

export default EditProject