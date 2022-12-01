import { useParams } from "react-router";
import ProjectDetailHeader from "./components/projectDetailViewHeader";
import ProjectDetailViewBlueArea from "./components/projectDetailViewBlueArea";
import './components/projectDetailView.css';

function ProjectDetailView(props) {
    let params = useParams();
    console.log("params", params)
    const tempProject = {name:'Facebook x Tesla', description:'FACEBOOK X TESLA is a Project that combines tesla\'s advances in techware with facebook\'s current strategies to be able to enable more technology accessibility to those around.', ownerId:12, photoLink:"", amount:500000 , cookieString:'', cookieExpDate: new Date() }

    return (
        <div className="projdet-wrap">
            <ProjectDetailHeader name={tempProject.name}/>
            <ProjectDetailViewBlueArea id = {params.projectId} project={tempProject}/>
        </div>
    );
}

export default ProjectDetailView;