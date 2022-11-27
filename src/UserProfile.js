import { useParams } from "react-router";
import UserProfileBlueArea from './components/userProfileBlueArea'
import UserProfileWhiteArea from './components/userProfileWhiteArea'

function UserProfile(props) {
    let params = useParams();
    const tempUserArray = {name:'Care Bear', email:'payYourMeal@dd.com', username:'theofficialdd', industry:'technology', bio:'Hi! Nice to meet you', projectId:[1234,122,2], photoLink:"", cookieString:'', cookieExpDate: new Date() }
    return (
        <div className="container-wrap">
            <UserProfileBlueArea name={tempUserArray.name}/>
            <UserProfileWhiteArea person={tempUserArray}/>
        </div>
    );
}

export default UserProfile