import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import ProjectGallery from "./ProjectGallery";
import InvestorGallery from "./InvestorGallery";
import UserProfile from "./UserProfile";
import ProjectDetailView from "./projectDetailView";
import InvestorDetailView from "./InvestorDetailView";
import EditProject from "./EditProject";
import EditUserProfile from "./EditUserProfile";
import SubmitProject from "./SubmitProject";
import DeveloperDetailView from "./DeveloperDetailView";
import LogIn from "./logIn";
import Signup from "./Signup";
import InvestorProfile from "./InvestorProfile";
import {useState} from "react";

//import {redirectInvestor,redirectDeveloper, redirectNotLoggedIn} from "./Redirect"


function App() {
  const [username, setName] = useState(localStorage.getItem("username") || undefined);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || undefined);
	// const [cookies,setCookie,removeCookie] = useCookies(["papaya"]);
	
  // console.log(username)
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/projects" element={<ProjectGallery username={username}/>} />
        <Route path="/project/:projectId" element={<ProjectDetailView role={role} username={username}/>} />
        <Route path="/project/:projectId/edit" element={<EditProject username={username}/>} />
        <Route path="/investors" element={<InvestorGallery username={username}/>} />
        <Route path="/investor/:investorId" element={<InvestorDetailView />} />
        <Route path="/projectOwner/:projectOwnerId" element={<DeveloperDetailView/>} />
        <Route path="/investor/profile/:username" element={<InvestorProfile />} />
        <Route path="/projectOwner/profile/:username" element={<UserProfile />} />
        <Route path="/investor/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="/projectOwner/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="/login" element={<LogIn password={password} username={username} setPassword={setPassword} setName={setName} role={role} setRole={setRole}/>} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/submitProject" element={<SubmitProject username={username} />} />

        {/* <Route path="/projects" element={redirectDeveloper(<ProjectGallery username={username}/>,document.cookie)} />
        <Route path="/project/:projectId" element={redirectNotLoggedIn(<ProjectDetailView />,document.cookie)} />
        <Route path="/project/:projectId/edit" element={redirectInvestor(<EditProject username={username}/>,document.cookie)} />
        <Route path="/investors" element={redirectInvestor(<InvestorGallery username={username}/>,document.cookie)} />
        <Route path="/investor/:investorId" element={redirectNotLoggedIn(<InvestorDetailView />,document.cookie)} />
        <Route path="/projectOwner/:projectOwnerId" element={redirectNotLoggedIn(<DeveloperDetailView/>,document.cookie)} />
        <Route path="/investor/profile/:username" element={redirectNotLoggedIn(<InvestorProfile />,document.cookie)} />
        <Route path="/projectOwner/profile/:username" element={redirectNotLoggedIn(<UserProfile />,document.cookie)} />
        <Route path="/investor/profile/:username/edit" element={redirectDeveloper(<EditUserProfile />,document.cookie)} />
        <Route path="/projectOwner/profile/:username/edit" element={redirectInvestor(<EditUserProfile />,document.cookie)} />
        <Route path="/login" element={<LogIn password={password} username={username} setPassword={setPassword} setName={setName}/>} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/submitProject" element={redirectInvestor(<SubmitProject username={username} />)} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
