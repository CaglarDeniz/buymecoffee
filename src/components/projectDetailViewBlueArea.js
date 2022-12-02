import './projectDetailView.css';

function ProjectDetailViewBlueArea(props) {
    return (
        <div className="blue-area">
            <h5 className="box_d-text">Project Name</h5>
            <h5 className='proj-details'>{props.project.name}</h5>
            <h5 className="box_d-text">Details</h5>
            <h5 className='proj-details'>{props.project.description}</h5>
            <h5 className="box_d-text">Money</h5>
            <h5 className='proj-details'>{props.project.amount}</h5>
            <button className="buy-coffee" onClick={() => window.location = 'mailto:np.js409@gmail.com'}>Buy Me Coffee</button>
        </div>

    );
    
}

export default ProjectDetailViewBlueArea;
