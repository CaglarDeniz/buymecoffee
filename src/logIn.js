import "./login.css";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function LogIn(props) {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name and password you entered was: ${username}, ${password}`);
        navigate("/projects");
        // need to use the input and authenticate using the endpoint
        // then pass in as props to userProfile for verification and display
    }

    return (
        <div className="container-wrap">
            <div className="grey-area">
                <img className="bmcflog-logo"
                src={require("./components/img/BuyMeCoffeeBlue.png")}
                alt="BuyMeCoffeeLogo"/>
                {/* <AccountCircleIcon
                sx={{width: 300, 
                height: 400,
                top:100,
                left:300,
                color: "#0077B5",
                }}/> */}
                <h3 className="login-header">Login to BuyMeCoffee</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-buttons">
                    <button className="login-button" type="button">Login as Developer</button>
                    <button className="login-button" type="button">Login as Investor</button>
                    </div>
                    <input className="login-input" type="text" placeholder="Enter Username" value={username} onChange={(e) => setName(e.target.value)}/>
                    <input className="login-input" type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="submit-button" type="Submit">Login</button>
                </form>
                <h5 className="goto-signup">Not a User yet? SignUp here</h5> 
            </div>
        </div>

    );
}

export default LogIn