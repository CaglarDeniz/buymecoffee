import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import './DeveloperDetailView.css';


function DeveloperDetailViewHeader(props){
    const navigate = useNavigate();

    const goBack = ()=> {
      navigate("/project/:projectId"); 
    }

    return (
        <div className="devheader-area">
            <ArrowBackIosNewIcon className="back2-icon" onClick={goBack} />
            <div className="flex-area">
            <Link to="/project/:projectId">
                <img
                className="bmcfdet-logo"
                src={require("./img/BuyMeCoffee.png")}
                alt="BuyMeCoffeeLogo"
                />
            </Link>
            <img
                className="developer-pic"
                src="https://i.pinimg.com/736x/af/66/74/af6674a0eff59ecde8edec24b6033b85.jpg"
                alt="DeveloperProfilePicture"
            />
            <h3 className="develepor-name">{props.name}</h3>
            </div>
        </div>
    );


}

export default DeveloperDetailViewHeader;