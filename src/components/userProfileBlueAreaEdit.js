import "./userProfile.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

function UserProfileBlueAreaEdit(props) {
  const navigate = useNavigate();
  const [tempPhoto, setTempPhoto] = useState("");
  console.log(tempPhoto)
  const goBack = () => {
    // TODO: alert(`You will lose all the unsave changes`);
    let backTo =
      props.mode === "investor"
        ? `/investor/profile/${props.username}/edit`
        : `/projectOwner/profile/${props.username}/edit`;

    navigate(backTo);
  };
  return (
    <div className="blue-area">
      <ArrowBackIosNewIcon className="back-icon" onClick={goBack} />
      <div className="flex-area">
        <Link to={props.mode === "investor" ? `/projects` : `investors`}>
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
                  <input
              type="file"
              id="file"
              onChange={(e) => setTempPhoto(e.target.files[0])}
            ></input>
        <h3>{props.name}</h3>
      </div>
    </div>
  );
}

export default UserProfileBlueAreaEdit;
