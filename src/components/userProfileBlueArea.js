import "./userProfile.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
function UserProfileBlueArea(props) {
  const navigate = useNavigate();
  console.log(props.photoLink);
  const goBack = () => {
    let goTo = props.mode === "investor" ? "/projects" : "/investors";
    navigate(goTo); //TODO: change this to the correct param
  };
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

        <Avatar
          className="preview-pic"
          alt="Profile Picture"
          src={props.photoLink ? props.photoLink : ""}
          sx={{ width: 150, height: 150 }}
        />

        <h3>{props.name}</h3>
      </div>
    </div>
  );
}

export default UserProfileBlueArea;
