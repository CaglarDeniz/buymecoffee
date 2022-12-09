import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import { useEffect,useState } from "react";
import './projectDetailView.css';

function ProjectDetailHeader(props) {
    const navigate = useNavigate();
    const [back_url, setbackurl] = useState("");
    const goBack = ()=> {
        if(props.role === "investor"){
            navigate("/projects");
        }
        if(props.role === "developer"){
            console.log(props.username);
            navigate("/projectOwner/profile/"+props.username);
        }
         //TODO: change this to the correct param
    }

    useEffect( () => {
        if(props.role === "developer"){
            setbackurl("/investors");
        }
        if(props.role === "investor"){
            setbackurl("/projects");
        }
    }, [props.role]);

    return (
        <div className="white-area">
            <ArrowBackIosNewIcon className="back1-icon" onClick={goBack} />
            <div className="flex-area">
            <Link to={back_url}>
                <img
                className="bmcfblue-logo"
                src={require("./img/BuyMeCoffeeBlue.png")}
                alt="BuyMeCoffeeLogo"
                />
            </Link>
            <img   // add project picture here
                className="project-pic"
                src = {props.photo}
                alt="UserProfilePicture"
            />
            <h3>{props.name}</h3>
            </div>
        </div>
    );
}

export default ProjectDetailHeader;