import "./login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            <div className="logIn-navbar">
            
                <img className="bmcf-logo"
                src={require("./components/img/BuyMeCoffee.png")}
                alt="BuyMeCoffeeLogo"/>
           
            </div>
            <div className="grey-area">
            
                <AccountCircleIcon
                sx={{width: 300, 
                height: 400,
                top:100,
                left:300,
                color: "#0077B5",
                }}/>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="login-input" type="text" placeholder="Enter Username" value={username} onChange={(e) => setName(e.target.value)}/>
                    <input className="login-input" type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="login-buttons">
                    <button className="login-button" type="Submit">Login as User</button>
                    <button className="login-button" type="Submit">Login as Investor</button>
                    </div>
                    
                </form>
            </div>
        </div>

    );
}

export default LogIn