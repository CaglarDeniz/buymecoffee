import "./userProfile.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function UserProfileBlueAreaEdit(props) {
  const navigate = useNavigate();
  const goBack = () => {
    // TODO: alert(`You will lose all the unsave changes`);
    navigate(-1);
  };
  return (
    <div className="blue-area-edit">
      <ArrowBackIosNewIcon className="back-icon-edit" onClick={goBack} />
      <div className="flex-area">
        <Link to={props.mode === "investor" ? `/projects` : `investors`}>
          <img
            className="bmcf-logo"
            src={require("./img/BuyMeCoffee.png")}
            alt="BuyMeCoffeeLogo"
          />
        </Link>
        <Avatar
          alt="Profile Picture"
          src={
            props.tempPhoto === ""
              ? props.photoLink
              : URL.createObjectURL(props.tempPhoto)
          }
          sx={{ width: 150, height: 150, margin: "2% auto" }}
        />
        <div className="choose-image-container">
        <input
          type="file"
          className="choose-image"
          onChange={(e) => props.setTempPhoto(e.target.files[0])}
        ></input>
        </div>
        <h5 className="box-text">Name</h5>
        <input
          className="edit-input edit-name"
          type="text"
          placeholder="FirstName LastName"
          value={props.name || ""}
          onChange={(e) => props.setName(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default UserProfileBlueAreaEdit;
