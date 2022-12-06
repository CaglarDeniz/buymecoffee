import './projectDetailView.css';
import {Link} from 'react-router-dom';
// import axios from 'axios';
// import {useState} from 'react';

function ProjectDetailViewBlueArea(props) {
    let projectOwner_id = props.project.ownerId;
    let routed_url ="/projectOwner/"+projectOwner_id;
   // const [developerName, setDeveloper] = useState("");

    // axios.get("http://localhost:8080/api/developer/single_developer/"+projectOwner_id).then( (res) => {
    //     setDeveloper(res.data.data[0].name);
    // });
    return (
        <div className="blue-area">
            <h5 className="box_d-text">Project Name</h5>
            <h5 className='proj-details'>{props.project.name}</h5>
            <h5 className="box_d-text">Project Description</h5>
            <h5 className='proj-details'>{props.project.description}</h5>
            <h5 className="box_d-text">Industry</h5>
            <h5 className='proj-details'>{props.project.industry}</h5>
            <h5 className="box_d-text">Project Developer</h5>
            <Link id="developer-proj" to={routed_url}><h5 className='devproj-details'>{projectOwner_id}</h5></Link>
            <h5 className="box_d-text">Investment Required</h5>
            <h5 className='proj-details'>{props.project.amount}</h5>
            <button className="buy-coffee" onClick={() => window.location = 'mailto:np.js409@gmail.com'}>Buy Me Coffee</button>
        </div>

    );
    
}

export default ProjectDetailViewBlueArea;
