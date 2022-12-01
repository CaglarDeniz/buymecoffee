import { useParams } from "react-router";
import UserProfileBlueAreaEdit from "./components/userProfileBlueAreaEdit";
import UserProfileWhiteAreaEdit from "./components/userProfileWhiteAreaEdit";

function EditUserProfile(props) {
    let params = useParams();
    //TODO: Change this to axios call
    const tempUserArray = {name:'Care Bear', email:'payYourMeal@dd.com', username:'theofficialdd', password:'summertime', industry:'technology', bio:'Hi! Nice to meet you', projectId:[1234,122,2], photoLink:"", cookieString:'', cookieExpDate: new Date() }
    return (
        <div className="container-wrap">
            <UserProfileBlueAreaEdit name={tempUserArray.name}/>
            <UserProfileWhiteAreaEdit username = {params.username} person={tempUserArray}/>
        </div>
    );
}

export default EditUserProfile