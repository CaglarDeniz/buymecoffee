import Button from "@mui/material/Button";
import "./userProfile.css";
import MyProjectsEdit from "./myProjectEdit";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Message } from "@mui/icons-material";
function UserProfileWhiteAreaEdit(props) {
  //TODO: Change this to Axios call
  const navigate = useNavigate();
  const [username, setUsername] = useState(props.person.username);
  const [email, setEmail] = useState(props.person.email);
  const [password, setPassword] = useState(props.person.password);
  const [industry, setIndustry] = useState(props.person.industry);
  const [bio, setBio] = useState(props.person.bio);
  const [changeMade, setChangeMade] = useState(false);
  const updateDB = () => {
    //TODO: call AXIOS
    navigate("/:username"); //TODO: change this to the correct param value
  };

  useEffect(()=>{
    window.onbeforeunload = changeMade && (()=> Message)
  })
  const theme = createTheme({
    palette: {
      primary: {
        main: "#313335",
        grey: "#CACCCE",
        blue: "#0077B5",
      },
    },
    typography: {
      fontFamily: ["Roboto Mono", "monospace"].join(","),
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
              color: "primary.grey",
            },
            position: "absolute",
            right: "5%",
          }}
        >
          DONE
        </Button>
      </ThemeProvider>
      <h5 className="box-text">USERNAME</h5>
      <input
        type="text"
        placeholder="Enter New Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setChangeMade(true);
        }}
      />
      <h5 className="box-text">EMAIL</h5>
      <input
        type="text"
        placeholder="Enter New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h5 className="box-text">PASSWORD</h5>
      <input
        type="text"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h5 className="box-text">INDUSTRY</h5>
      <input
        type="text"
        placeholder="Enter New Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <h5 className="box-text">BIO</h5>
      <input
        type="text"
        placeholder="Enter New Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <h4 className="box-text">MY PROJECTS</h4>
      <MyProjectsEdit />
    </div>
  );
}

export default UserProfileWhiteAreaEdit;
