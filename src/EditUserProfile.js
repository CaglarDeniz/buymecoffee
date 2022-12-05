import { useParams } from "react-router";
import UserProfileBlueAreaEdit from "./components/userProfileBlueAreaEdit";
import UserProfileWhiteAreaEdit from "./components/userProfileWhiteAreaEdit";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import React from "react";

function EditUserProfile(props) {
  let params = useParams();
  const [investor, setInvestor] = React.useState("");
  const [mode, setMode]=React.useState("")
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname.includes("/investor/profile")) {
      setMode("investor")
      Axios.get(
        `http://localhost:8080/api/investor/single_investor/${params.username}`
      ).then((res) => {
        console.log(res.data.data[0]);
        setInvestor(res.data.data[0]);
      });
    } else {
      setMode("projectOwner")
      Axios.get(`http://localhost:8080/api/developer/${params.username}`).then(
        (res) => {
          console.log(res.data.data);
          setInvestor(res.data.data);
        }
      );
    }
  }, [params.username, location.pathname]);

  return (
    <div className="container-wrap">
      <UserProfileBlueAreaEdit name={investor.name} mode={mode} />
      <UserProfileWhiteAreaEdit
        username={params.username}
        person={investor}
        mode={mode}
      />
    </div>
  );
}

export default EditUserProfile;
