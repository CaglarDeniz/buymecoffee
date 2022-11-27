import "./userProfile.css";
import {Link} from 'react-router-dom'
function UserProfileBlueArea(props) {
  return (
    <div className="blue-area">
        <Link to="/projects">
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
  );
}

export default UserProfileBlueArea;
