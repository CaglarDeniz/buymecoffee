import "./userProfile.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';

function UserProfileBlueArea(props) {
  const navigate = useNavigate();

  const goBack = ()=> {
    let goTo = props.mode === "investor" ? '/projects' : '/investors'
    navigate(goTo); //TODO: change this to the correct param
  }
  return (
    <div className="blue-area">
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
        className="profile-pic"
        src={props.photoLink}
        alt="UserProfilePicture"
      />
      <h3>{props.name}</h3>
      </div>
    </div>
  );
}

export default UserProfileBlueArea;
