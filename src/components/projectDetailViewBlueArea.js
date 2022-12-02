import './projectDetailView.css';

function ProjectDetailViewBlueArea(props) {
    return (
        <div className="blue-area">
            <h5 className="box-text">Project Name</h5>
            <h5>{props.project.name}</h5>
            <h5 className="box-text">Details</h5>
            <h5>{props.project.description}</h5>
            <h5 className="box-text">Money</h5>
            <h5>{props.project.amount}</h5>
        </div>

    );
    
}

export default ProjectDetailViewBlueArea;