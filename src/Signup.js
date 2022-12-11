import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import SelectAutoWidth from "./components/selectButton";
import Axios from "axios";
import Avatar from "@mui/material/Avatar";
import BackendURL from "./BackendURL";

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
  const [tempPhoto, setTempPhoto] = useState("");
  // const [photoLink, setPhotoLink] = useState("");
  console.log(tempPhoto);
  const handleSubmit = (event) => {
    if (
      password === "" ||
      firstName === "" ||
      LastName === "" ||
      email === "" ||
      email === ""
    ) {
      alert(
        "FirstName, LastName, Username, email, and Password fields are required."
      );
      return;
    }
    let next = "/login";
    if (role === "Project Owner") {
      if (tempPhoto === "") {
        Axios.post(BackendURL + '/api/developer/', {
          name: firstName + " " + LastName,
          email: email,
          password: password,
          username: username,
          industry: industry,
          bio: bio,}
        )
          .then((res) => {
            console.log(res);
            navigate(-1);
          })
          .catch((err) => {
            console.log("Update went wrong", err);
          });
      } else {
      let formData = new FormData();
      formData.append("photo", tempPhoto);
      console.log("here is the temp", tempPhoto);
      Axios.post(BackendURL + '/upload/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("second post", res);
          // setPhotoLink(res.data.data);
          // console.log("image photo link", res.data);
          Axios.post(BackendURL + '/api/developer/', {
            name: firstName + " " + LastName,
            email: email,
            password: password,
            username: username,
            industry: industry,
            bio: bio,
            photoLink: res.data.data,
          }).catch((err) => {
            console.log("User creation went wrong.", err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(next);
    } }else if (role === "Investor") {
      if (tempPhoto === "") {
        Axios.post(BackendURL + '/api/investor/', {
            name: firstName + " " + LastName,
            email: email,
            password: password,
            username: username,
            industry: industry,
            bio: bio,
            oldStartups: [oldStartUp],
            amount: amount,}
        )
          .then((res) => {
            console.log(res);
            navigate(-1);
          })
          .catch((err) => {
            console.log("Update went wrong", err);
          });
      } else {
      let formData = new FormData();
      formData.append("photo", tempPhoto);
      console.log("here is the temp", tempPhoto);
      Axios.post(BackendURL + '/upload/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          Axios.post(BackendURL + '/api/investor/', {
            name: firstName + " " + LastName,
            email: email,
            password: password,
            username: username,
            industry: industry,
            bio: bio,
            photoLink: res.data.data,
            oldStartups: [oldStartUp],
            amount: amount,
          }).catch((err) => {
            console.log("User creation went wrong.", err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(next);
      }
    } else {
      alert("Please select your role before signing up.");
    }
  };

  return (
    <div className="sign-up-container">
      <img
        className="bmcflog-logo"
        src={require("./components/img/BuyMeCoffeeNew.png")}
        alt="BuyMeCoffeeLogo" onClick={()=>{navigate("/")}}
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
          <Avatar
            className="preview-pic-login"
            alt="Profile Picture"
            src={tempPhoto ? URL.createObjectURL(tempPhoto) : ""}
            sx={{ width: 150, height: 150 }}
          />
          <div
            className="sign-up-container"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
            className="choose-image-signup"
              type="file"
              id="file"
              onChange={(e) => setTempPhoto(e.target.files[0])}
            ></input>

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
            <textarea
              rows="8" cols="80" 
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
            <button
              className="submit-button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </>
      )}
      <h5 className="goto-signup">
        Already Signed Up? <Link to="/login" id="loginto-link">LogIn here</Link>
      </h5>
    </div>
  );
}

export default Signup;
