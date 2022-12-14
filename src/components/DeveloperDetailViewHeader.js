import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './DeveloperDetailView.css';


function DeveloperDetailViewHeader(props){
    const navigate = useNavigate();
    const [backurl, setbackurl] = useState("");

    const goBack = ()=> {
      navigate(-1); 
    }

    useEffect( () =>{
        if(props.role === "developer"){
            setbackurl("/investors");
        }
        if(props.role === "investor"){
            setbackurl("/projects");
        }
    }, [props.role]);

    return (
        <div className="devheader-area">
            <ArrowBackIosNewIcon className="backdev-icon" onClick={goBack} />
            <div className="flex-area">
            <Link to={backurl}>
                <img
                className="bmcfdet-logo"
                src={require("./img/BuyMeCoffee.png")}
                alt="BuyMeCoffeeLogo"
                />
            </Link>
            <img
                className="developer-pic"
                src= {props.photolink}
                alt="DeveloperProfilePicture"
            />
            <h3 className="developer-name">{props.name}</h3>
            </div>
        </div>
    );


}

export default DeveloperDetailViewHeader;