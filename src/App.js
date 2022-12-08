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

import { useCookies } from "react-cookie";
import {redirectInvestor,redirectDeveloper, redirectNotLoggedIn} from "./Redirect"


function App() {
  const [username, setName] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || undefined);
	const [cookies,setCookie,removeCookie] = useCookies(["papaya"]);
	
  // console.log(username)
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/projects" element={redirectDeveloper(<ProjectGallery username={username} removeCookie={removeCookie}/>,cookies)} />
        <Route path="/project/:projectId" element={redirectNotLoggedIn(<ProjectDetailView role={role} username={username} />,cookies)} />
        <Route path="/project/:projectId/edit" element={redirectInvestor(<EditProject username={username}/>,cookies)} />
        <Route path="/investors" element={redirectInvestor(<InvestorGallery username={username} removeCookie={removeCookie}/>,cookies)} />
        <Route path="/investor/:investorId" element={redirectInvestor(<InvestorDetailView />,cookies)} />
        <Route path="/projectOwner/:projectOwnerId" element={redirectNotLoggedIn(<DeveloperDetailView role={role}/>,cookies)} />
        <Route path="/investor/profile/:username" element={redirectDeveloper(<InvestorProfile />,cookies)} />
        <Route path="/projectOwner/profile/:username" element={redirectInvestor(<UserProfile />,cookies)} />
        <Route path="/investor/profile/:username/edit" element={redirectDeveloper(<EditUserProfile />,cookies)} />
        <Route path="/projectOwner/profile/:username/edit" element={redirectInvestor(<EditUserProfile />,cookies)} />
        <Route path="/login" element={<LogIn password={password} username={username} setPassword={setPassword} setName={setName} setCookie={setCookie} role={role} setRole={setRole}/>} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/submitProject" element={redirectInvestor(<SubmitProject username={username} />)} />
         {/* <Route path="/projects" element={<ProjectGallery username={username}/>} />
        <Route path="/project/:projectId" element={<ProjectDetailView />} />
        <Route path="/project/:projectId/edit" element={<EditProject />} />
        <Route path="/investors" element={<InvestorGallery username={username}/>} />
        <Route path="/investor/:investorId" element={<InvestorDetailView />} />
        <Route path="/projectOwner/:projectOwnerId" element={<DeveloperDetailView/>} />
        <Route path="/investor/profile/:username" element={<InvestorProfile />} />
        <Route path="/projectOwner/profile/:username" element={<UserProfile />} />
        <Route path="/investor/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="/projectOwner/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="/login" element={<LogIn password={password} username={username} setPassword={setPassword} setName={setName}/>} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/submitProject" element={<SubmitProject username={username} />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
