import { useParams } from "react-router";
import DeveloperDetailViewHeader from './components/DeveloperDetailViewHeader.js';
import DeveloperDetailViewContent from "./components/DeveloperDetailViewContent.js";
import './components/DeveloperDetailView.css';

function DeveloperDetailView(props){
    let params = useParams();
    console.log("params", params);

    const tempDeveloper = {name: "Elon Musk", email: "elon@musk.com", industry: ["Technology"], bio: "Developer in field of Tech", projectId: [1234, 122, 2], photolink:"", cookieString: "", cookieExpDate: new Date()}

    return (
        <div className="container-wrap">
            <DeveloperDetailViewHeader name={tempDeveloper.name}/>
            <DeveloperDetailViewContent id={params.projectOwnerId} developer={tempDeveloper}/>
        </div>
    );

}

export default DeveloperDetailView;