import Button from "@mui/material/Button";
import "./userProfile.css";
import MyProjectsEdit from "./myProjectEdit";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Message } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Axios from "axios";

function UserProfileWhiteAreaEdit(props) {
  const location = useLocation();
  console.log(props.person.password)
  const navigate = useNavigate();
  const [username, setUsername] = useState(props.person.username);
  const [email, setEmail] = useState(props.person.email);
  const [password, setPassword] = useState(props.person.password);
  const [industry, setIndustry] = useState(props.person.industry);
  const [bio, setBio] = useState(props.person.bio);
  const [changeMade, setChangeMade] = useState(false);
  const [oldStartUp, setOldStartUp] = useState(props.person.oldStartups);
  const updateDB = () => {
    if (location.pathname.includes("/projectOwner/profile")) {
      if (props.tempPhoto === "") {
        Axios.put(
          `http://localhost:8080/api/developer/${props.person.username}`,
          {
            name: props.name,
            email: email,
            password: password,
            username: username,
            industry: industry,
            bio: bio,
            projectId: props.person.projectId,
            photoLink: props.person.photoLink,
            cookieString: props.person.cookieString,
            cookieExpDate: props.person.cookieExpDate,
          }
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
        formData.append("photo", props.tempPhoto);
        console.log("here is the temp", props.tempPhoto);
        Axios.post(`http://localhost:8080/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log("obtained photo", res.data.data);
            Axios.put(
              `http://localhost:8080/api/developer/${props.person.username}`,
              {
                name: props.name,
                email: email,
                password: password,
                username: username,
                industry: industry,
                bio: bio,
                projectId: props.person.projectId,
                photoLink: res.data.data,
                cookieString: props.person.cookieString,
                cookieExpDate: props.person.cookieExpDate,
              }
            )
              .then((res) => {
                console.log(res);
                navigate(-1);
              })
              .catch((err) => {
                console.log("Update went wrong", err);
              });
          })
          .catch((err) => {
            console.log("photo upload went wrong.", err);
          });
      }
    } else {
      if (props.tempPhoto === "") {
        Axios.put(`http://localhost:8080/api/investor/${props.person._id}`, {
          name: props.name,
          email: email,
          password: password,
          username: username,
          industry: industry,
          bio: bio,
          oldStartups: props.person.oldStartups,
          amount: props.person.amount,
          photoLink: props.person.photoLink,
          cookieString: props.person.cookieString,
          cookieExpDate: props.person.cookieExpDate,
        })
          .then((res) => {
            console.log(res);
            navigate(-1);
          })
          .catch((err) => {
            console.log("Update went wrong", err);
          });
      } else {
        let formData = new FormData();
        formData.append("photo", props.tempPhoto);
        console.log("here is the temp", props.tempPhoto);
        Axios.post(`http://localhost:8080/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log("obtained photo", res.data.data);
            Axios.put(
              `http://localhost:8080/api/investor/${props.person._id}`,
              {
                name: props.name,
                email: email,
                password: password,
                username: username,
                industry: industry,
                bio: bio,
                oldStartups: props.person.oldStartups,
                amount: props.person.amount,
                photoLink: res.data.data,
                cookieString: props.person.cookieString,
                cookieExpDate: props.person.cookieExpDate,
              }
            )
              .then((res) => {
                console.log(res);
                navigate(-1);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("photo upload went wrong.", err);
          });
      }
    } //TODO: change this to the correct param value
  };
  useEffect(() => {
    setUsername(props.person.username);
    setEmail(props.person.email);
    setPassword(props.person.password);
    setIndustry(props.person.industry);
    setBio(props.person.bio);
    setChangeMade(false);
    setOldStartUp(props.person.oldStartups);
  }, [props.person]);
  useEffect(() => {
    window.onbeforeunload = changeMade && (() => Message);
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#313335",
        grey: "#CACCCE",
        blue: "#1976d2",
        white: "#ffffff",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });
  return (
    <div className="white-area">
      <ThemeProvider theme={theme}>
        <Button
          onClick={updateDB}
          id="food"
          className="button"
          variant="contained"
          sx={{
            ":hover": {
              bgcolor: "primary.blue", // theme.palette.primary.main
              color: "primary.white",
            },
            position: "absolute",
            right: "5%",
          }}
        >
          Submit
        </Button>
      </ThemeProvider>
      <h5 className="box-text">Username</h5>
      <input
        className="edit-input"
        type="text"
        placeholder={"Enter New Username"}
        value={username || ""}
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
          setChangeMade(true);
        }}
      />
      <h5 className="box-text">Email</h5>
      <input
        className="edit-input"
        type="text"
        placeholder="Enter New Email"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h5 className="box-text">Password</h5>
      <input
        className="edit-input"
        type="text"
        placeholder="Enter New Password"
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h5 className="box-text">Industry</h5>
      <input
        className="edit-input"
        type="text"
        placeholder="Enter New Industry"
        value={industry || ""}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <h5 className="box-text">Bio</h5>
      <textarea
        rows="8" cols="80" 
        className="edit-input bio-input profile-bio"
        type="text"
        placeholder="Enter New Bio"
        value={bio || ""}
        onChange={(e) => setBio(e.target.value)}
      />
      {location.pathname.includes("/investor/profile") && (
        <>
          <h5 className="box-text">Old StartUps</h5>

          <input
            className="edit-input"
            type="text"
            placeholder="StartUp1, StartUp2, ..."
            value={oldStartUp || ""}
            onChange={(e) => setOldStartUp([e.target.value])}
          />
        </>
      )}
      {location.pathname.includes("/projectOwner/profile") && (
        <>
          <h5 className="box-text my-project-small">My Projects</h5>
          <MyProjectsEdit className="my-project-small-grid" projectList={props.person.projectId} />
        </>
      )}
    </div>
  );
}

export default UserProfileWhiteAreaEdit;
