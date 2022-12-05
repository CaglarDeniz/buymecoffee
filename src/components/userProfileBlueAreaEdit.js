import "./userProfile.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';

function UserProfileBlueAreaEdit(props) {
  const navigate = useNavigate();

  const goBack = ()=> {
    // TODO: alert(`You will lose all the unsave changes`);
    let backTo = 
      props.mode === "investor"
        ? `/investor/profile/${props.username}/edit`
        : `/projectOwner/profile/${props.username}/edit`
    
    navigate(backTo); 
  }
  return (
    <div className="blue-area">
      <ArrowBackIosNewIcon className="back-icon" onClick={goBack} />
      <div className="flex-area">
      <Link to={props.mode === "investor"
        ? `/projects`
        : `investors`}>
        <img
          className="bmcf-logo"
          src={require("./img/BuyMeCoffee.png")}
          alt="BuyMeCoffeeLogo"
        />
      </Link>
      <img
        className="profile-pic"
        src="https://i.pinimg.com/736x/af/66/74/af6674a0eff59ecde8edec24b6033b85.jpg"
        alt="UserProfilePicture"
      />
      <h3>{props.name}</h3>
      </div>
    </div>
  );
}

export default UserProfileBlueAreaEdit;
