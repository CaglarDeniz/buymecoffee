import { useParams } from "react-router";
import UserProfileBlueArea from "./components/userProfileBlueArea";
import UserProfileWhiteArea from "./components/userProfileWhiteArea";
import Axios from "axios";
import React from "react";

function InvestorProfile() {
  let params = useParams();
  const [investor, setInvestor] = React.useState("");
  React.useEffect(()=>{
    Axios.get(`http://localhost:8080/api/investor/single_investor/${params.username}`).then((res)=>{
      console.log(res.data.data[0])
      setInvestor(res.data.data[0])
    }).catch((err)=>{console.log(err)})
  },[params.username])

  return (
    <div className="container-wrap">
      <UserProfileBlueArea name={investor.name} photoLink={investor.photoLink} mode={"investor"}/>
      <UserProfileWhiteArea username={params.username} person={investor} mode={"investor"}/>
    </div>
  );
}

export default InvestorProfile;
