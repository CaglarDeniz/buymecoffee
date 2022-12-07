import "./login.css";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
function LogIn(props) {
   
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("username", props.username);
        if(role === "developer"){
            axios.post(`http://localhost:8080/api/auth_developer/`, {username: props.username, password:props.password},{withCredentials:true}).then( res => {
								console.log(res);
                console.log(res.data.data);
                if(res.data.data === true){
                    navigate("/investors");
                }
            }).catch(function(rejected){
                alert(`Username and password is incorrect. Try again!`)
                console.log(rejected);
            });
        }
        if (role === "investor"){
            axios.post(`http://localhost:8080/api/auth_investor/`, {username: props.username, password:props.password},{withCredentials:true}).then( res => {
                console.log(res.data.data);
                if(res.data.data === true){
                    navigate("/projects");
                }
            }).catch( function(rejected){
                alert(`Username and password is incorrect. Try again!`)
                console.log(rejected);
            });
        }
    }

    const handleDevClick = (event) => {
        event.preventDefault();
        setRole("developer");
    }

    const handleInvClick = (event) => {
        event.preventDefault();
        setRole("investor");
    }

    useEffect( () => {
        const roles = [
            "developer",
            "investor"
        ];
        roles.map( (each_role) => {
            const element = document.getElementById(each_role);
            if(element){
                element.classList.remove("toggle_case");
            }
            return null;
        });
        const element = document.getElementById(role);
        if(element){
            element.classList.add("toggle_case");
        }
    }, [role]);

    return (
        <div className="container-wrap">
            <div className="grey-area">
                <img className="bmcflog-logo"
                src={require("./components/img/BuyMeCoffeeBlue.png")}
                alt="BuyMeCoffeeLogo"/>
             
                <h3 className="login-header">Login to BuyMeCoffee</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-buttons">
                    <button id="developer" className="login-button" type="button" onClick={handleDevClick}>Login as Developer</button>
                    <button id="investor" className="login-button" type="button" onClick={handleInvClick}>Login as Investor</button>
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
