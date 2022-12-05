import "./login.css";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
function LogIn(props) {
   
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(role === "developer"){
            axios.post(`http://localhost:8080/api/auth_developer/`, {username: props.username, password:props.password}).then( res => {
            if(res.data.data === true){
                navigate("/investors");
            }
            else{
                alert('The name and password you entered was incorrect.Try Again!');
            }
            });
        }
        if (role === "investor"){
            axios.post(`http://localhost:8080/api/auth_investor/`, {username: props.username, password:props.password}).then( res => {
            if(res.data.data === true){
                navigate("/projects");
            }
            else{
                alert('The name and password you entered was incorrect.Try Again!');
            }
            });
        }
        //alert(`The name and password you entered was: ${props.username}, ${props.password}`);
    }

    const handleDevClick = (event) => {
        event.preventDefault();
        setRole("developer");
    }

    const handleInvClick = (event) => {
        event.preventDefault();
        setRole("investor");
    }

    // (".login-button").click(function(){
    //     (".login-button").removeClass("pressed");
    //     this.addClass("pressed");
    //  });
    
    // (".login-button").click(function() {
    //  this.toggleClass("active");
    // });
    // axios.post(`http://localhost:8080/api/auth_developer/`, {"username": "travis_howard", "password":"ilovellamas"}).then( res => {
    //         console.log(res.data);
    //         console.log(res);
    //         console.log(res.message)
    // });
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
                    <button className="login-button" type="button" onClick={handleDevClick}>Login as Developer</button>
                    <button className="login-button" type="button" onClick={handleInvClick}>Login as Investor</button>
                    </div>
                    <input className="login-input" type="text" placeholder="Enter Username" value={props.username} onChange={(e) => props.setName(e.target.value)}/>
                    <input className="login-input" type="text" placeholder="Enter password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}/>
                    <button className="submit-button" type="Submit">Login</button>
                </form>
                <h5 className="goto-signup">Not a User yet? <Link to="/signup" id="signup-link">SignUp here</Link></h5> 
            </div>
        </div>

    );
}

export default LogIn