import { useParams } from "react-router";
import UserProfileBlueArea from "./components/userProfileBlueArea";
import UserProfileWhiteArea from "./components/userProfileWhiteArea";
import Axios from "axios";
import React from "react";
function UserProfile() {
  let params = useParams();
  const [user, setUser] = React.useState("");
  React.useEffect(()=>{
    Axios.get(`http://localhost:8080/api/developer/${params.username}`).then((res)=>{
      console.log(res.data.data)
      setUser(res.data.data)
    })
  },[params.username])

  return (
    <div className="container-wrap">
      <UserProfileBlueArea name={user.name} photoLink={user.photoLink} mode={"projectOwner"} />
      <UserProfileWhiteArea username={params.username} person={user} mode={"projectOwner"}/>
    </div>
  );
}

export default UserProfile;
