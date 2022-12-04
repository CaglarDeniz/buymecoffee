import { useParams } from "react-router";
import UserProfileBlueArea from "./components/userProfileBlueArea";
import UserProfileWhiteArea from "./components/userProfileWhiteArea";

function InvestorProfile(props) {
  let params = useParams();
  //TODO: Change this to axios call
  const tempUserArray = {
    name: "Investor Bear",
    email: "payYourMeal@dd.com",
    username: "theofficialdd",
    password: "hello",
    industry: "technology",
    bio: "Hi! Nice to meet you",
    oldStartups:["chocolate","sad", "happu", "really"],
    projectId: [1234, 122, 2],
    photoLink: "",
    cookieString: "",
    cookieExpDate: new Date(),
  };
  return (
    <div className="container-wrap">
      <UserProfileBlueArea name={tempUserArray.name} mode={"investor"}/>
      <UserProfileWhiteArea username={params.username} person={tempUserArray} mode={"investor"}/>
    </div>
  );
}

export default InvestorProfile;
