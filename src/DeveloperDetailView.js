import { useParams } from "react-router";
import DeveloperDetailViewHeader from './components/DeveloperDetailViewHeader.js';
import DeveloperDetailViewContent from "./components/DeveloperDetailViewContent.js";
import './components/DeveloperDetailView.css';
import axios from 'axios';
import BackendURL from './BackendURL';
import {useState, useEffect} from 'react';

function DeveloperDetailView(props){
    let params = useParams();
    const [curr_Developer, setDeveloper] = useState([]);
    
    let DeveloperEndpoint = BackendURL + '/api/developer/single_developer/';
    //const tempDeveloper = {name: "Elon Musk", email: "elon@musk.com", industry: ["Technology"], bio: "Developer in field of Tech", projectId: [1234, 122, 2], photolink:"", cookieString: "", cookieExpDate: new Date()}
    useEffect ( () => {
        axios.get(DeveloperEndpoint+params.projectOwnerId).then( (res) => {
            //console.log((res.data.data));
            setDeveloper(res.data.data);
        }).catch( function(rejected) {
            console.log(rejected);
            alert('Developer not found for this ID');
        });
    
    }, [setDeveloper, DeveloperEndpoint, params.projectOwnerId])
  
    return (
        <div className="container-wrap">
            <DeveloperDetailViewHeader name={curr_Developer.name} role={props.role} photolink={curr_Developer.photoLink}/>
            <DeveloperDetailViewContent id={curr_Developer._id} developer={curr_Developer}/>
        </div>
    );
}

export default DeveloperDetailView;
