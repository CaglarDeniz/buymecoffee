import { useParams } from "react-router";
import UserProfileBlueAreaEdit from "./components/userProfileBlueAreaEdit";
import UserProfileWhiteAreaEdit from "./components/userProfileWhiteAreaEdit";

function EditUserProfile(props) {
  let params = useParams();
  //TODO: Change this to axios call depending on the mode
  const tempUserArray = {
    name: "Care Bear",
    email: "payYourMeal@dd.com",
    username: "theofficialdd",
    password: "summertime",
    industry: "technology",
    bio: "Hi! Nice to meet you",
    oldStartups: ["hello", "lol", "hehe"],
    projectId: [1234, 122, 2],
    photoLink: "",
    cookieString: "",
    cookieExpDate: new Date(),
  };
  return (
    <div className="container-wrap">
      <UserProfileBlueAreaEdit name={tempUserArray.name} mode={"investor"} />
      <UserProfileWhiteAreaEdit
        username={params.username}
        person={tempUserArray}
        mode={"investor"}
      />
    </div>
  );
}

export default EditUserProfile;
