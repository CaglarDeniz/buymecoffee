import { useParams } from "react-router";

function ProjectDetailView(props) {
    let params = useParams();
    console.log("params", params)
    return (
        <div className="container-wrap">
            <div className="userlogin-navbar"></div>
            <h1>hello  project detail view {params.projectId}</h1>
        </div>
    );
}

export default ProjectDetailView