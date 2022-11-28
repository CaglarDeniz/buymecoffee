import "./login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import {Link} from 'react-router-dom';

function LogIn(props) {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${username}`);
        
    }

    return (
        <div className="container-wrap">
            <div className="logIn-navbar">
            <Link to="/projects">
                <img className="bmcf-logo"
                src={require("./components/img/BuyMeCoffee.png")}
                alt="BuyMeCoffeeLogo"/>
            </Link>
            </div>
            <div className="grey-area">
            
                <AccountCircleIcon
                sx={{width: 300, 
                height: 400,
                top:100,
                left:300,
                color: "#0077B5",
                bgcolor: "#ffffff"}}/>
                <form onSubmit={handleSubmit}>
                    <label>Username:
                        <input type="text" value={username} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>Password
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button type="Submit">Login as User</button>
                </form>
            </div>
        </div>

    );
}

export default LogIn