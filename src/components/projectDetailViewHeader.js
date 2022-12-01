import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import './projectDetailView.css';

function ProjectDetailHeader(props) {
    const navigate = useNavigate();

    const goBack = ()=> {
      navigate("/projects"); //TODO: change this to the correct param
    }

    return (
        <div className="white-area">
            <ArrowBackIosNewIcon className="back-icon" onClick={goBack} />
            <div className="flex-area">
            <Link to="/projects">
                <img
                className="bmcf-logo"
                src={require("./img/BuyMeCoffee.png")}
                alt="BuyMeCoffeeLogo"
                />
            </Link>
            <img
                className="project-pic"
                src="https://i.pinimg.com/736x/af/66/74/af6674a0eff59ecde8edec24b6033b85.jpg"
                alt="UserProfilePicture"
            />
            <h3>{props.name}</h3>
            </div>
        </div>
    );
}

export default ProjectDetailHeader;