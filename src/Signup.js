import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import SelectAutoWidth from "./components/selectButton";
import Axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const industryNames = [
    "Healthcare",
    "Automotive",
    "Communication",
    "Entertainment",
    "Retail",
    "Food",
    "Energy",
    "Finance",
    "Construction",
    "Aerospace",
    "Software",
    "Chemical",
    "Other",
  ];
  const roleOptions = ["Project Owner", "Investor"];
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [bio, setBio] = useState("");
  const [oldStartUp, setOldStartUp] = useState("");
  const [amount, setAmount] = useState(0);
  // const [tempPhoto, setTempPhoto] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  console.log(setPhotoLink) //TODO: comment this out
  const handleSubmit = (event) => {
    if(password === ""|| firstName==="" || LastName==="" || email===""  || email===""){
      alert("FirstName, LastName, Username, email, and Password field are required.")
      return
    }
    let next = "/login";
    if (role === "Project Owner") {
      Axios.post(`http://localhost:8080/api/developer/`, {
        name: firstName + " " + LastName,
        email: email,
        password: password,
        username: username,
        industry: industry,
        bio: bio,
        photoLink: photoLink,
      })
        .then((res) => {
          console.log(res);
          navigate(next)
        })
        .catch((err) => {
          console.log(err);
        });
    } else if((role === "Investor")) {
      Axios.post(`http://localhost:8080/api/investor/`, {
        name: firstName + " " + LastName,
        email: email,
        password: password,
        username: username,
        industry: industry,
        bio: bio,
        oldStartups: [oldStartUp],
        amount: amount,
        photoLink: photoLink,
      })
        .then((res) => {
          console.log(res);
          navigate(next)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select your role first.")
    }
  };
  // const imageReader = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState == 2) {
  //       setTempPhoto(reader.result);
  //     }
  //   };
  //   setPhotoLink(reader.readAsDataURL(e.target.files[0]));
  // };
  return (
    <div className="sign-up-container">
      <img
        className="bmcflog-logo"
        src={require("./components/img/BuyMeCoffeeBlue.png")}
        alt="BuyMeCoffeeLogo"
      />

      <h3 className="login-header">Sign up</h3>
      <div className="drop-down-container">
        {role !== "" ? "" : <h4>Select Your Role</h4>}
        <SelectAutoWidth
          label={"Role"}
          industryNames={roleOptions}
          setCurIndustry={setRole}
          curIndustry={role}
        />

        {role === "Investor" && (
          <SelectAutoWidth
            label={"Industry"}
            industryNames={industryNames}
            setCurIndustry={setIndustry}
            curIndustry={industry}
          />
        )}
      </div>
      {role === "" ? (
        ""
      ) : (
        <>
            <div className="sign-up-container">
            <input
              className="login-input"
              type="text"
              placeholder="First Name*"
              value={firstName || undefined}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="login-input"
              type="text"
              placeholder="Last Name *"
              value={LastName || undefined}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="login-input"
              type="text"
              placeholder="Username *"
              value={username || undefined}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="login-input"
              type="text"
              placeholder="Email *"
              value={email || undefined}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="text"
              placeholder="Password *"
              value={password || undefined}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="login-input"
              type="text"
              placeholder="Bio"
              value={bio || undefined}
              onChange={(e) => setBio(e.target.value)}
            />
            {role === "Investor" && (
              <input
                className="login-input"
                type="text"
                placeholder="OldStartUp1, OldStartUp2, ... "
                value={oldStartUp || undefined}
                onChange={(e) => setOldStartUp(e.target.value)}
              />
            )}
                        {role === "Investor" && (
              <input
                className="login-input"
                type="text"
                placeholder="Money Budget"
                value={amount || undefined}
                onChange={(e) => setAmount(e.target.value)}
              />
            )}
            <button className="submit-button" onClick={handleSubmit}>
              Sign Up
            </button>
            </div>

        </>
      )}
      <h5 className="goto-signup">
        Already Signed Up? <Link to="/login">LogIn here</Link>
      </h5>
    </div>
  );
}

export default Signup;
