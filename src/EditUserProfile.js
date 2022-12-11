import { useParams } from "react-router";
import UserProfileBlueAreaEdit from "./components/userProfileBlueAreaEdit";
import UserProfileWhiteAreaEdit from "./components/userProfileWhiteAreaEdit";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import React from "react";
import { useState } from "react";
import "./components/userProfile.css";
import BackendURL from "./BackendURL";

function EditUserProfile(props) {
  let params = useParams();
  const [investor, setInvestor] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [tempPhoto, setTempPhoto] = useState("");
  const [name, setName] = useState(props.name);
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname.includes("/investor/profile")) {
      setMode("investor");
      Axios.get(
        BackendURL + '/api/investor/single_investor/${params.username}'
      )
        .then((res) => {
          console.log(res.data.data[0]);
          setInvestor(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMode("projectOwner");
      Axios.get( BackendURL + '/api/developer/${params.username}')
        .then((res) => {
          console.log(res.data.data);
          setInvestor(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.username, location.pathname]);
  console.log("name", investor.name);
  return (
    <div className="container-wrap">
      <UserProfileBlueAreaEdit
        name={investor.name}
        photoLink={investor.photoLink}
        mode={mode}
        setName={setName}
        tempPhoto={tempPhoto}
        setTempPhoto={setTempPhoto}
      />
      <UserProfileWhiteAreaEdit
        tempPhoto={tempPhoto}
        name={name}
        username={params.username}
        person={investor}
        mode={mode}
      />
    </div>
  );
}

export default EditUserProfile;
