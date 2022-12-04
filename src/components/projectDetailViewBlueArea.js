import './projectDetailView.css';
import {Link} from 'react-router-dom'

function ProjectDetailViewBlueArea(props) {
    return (
        <div className="blue-area">
            <h5 className="box_d-text">Project Name</h5>
            <h5 className='proj-details'>{props.project.name}</h5>
            <h5 className="box_d-text">Project Description</h5>
            <h5 className='proj-details'>{props.project.description}</h5>
            <h5 className="box_d-text">Industry</h5>
            <h5 className='proj-details'>{props.project.industry}</h5>
            <h5 className="box_d-text">Project Developer</h5>
            <Link id="developer-proj" to="/projectOwner/:projectOwnerId"><h5 className='devproj-details'>{props.developer}</h5></Link>
            <h5 className="box_d-text">Investment Required</h5>
            <h5 className='proj-details'>{props.project.amount}</h5>
            <button className="buy-coffee" onClick={() => window.location = 'mailto:np.js409@gmail.com'}>Buy Me Coffee</button>
        </div>

    );
    
}

export default ProjectDetailViewBlueArea;
