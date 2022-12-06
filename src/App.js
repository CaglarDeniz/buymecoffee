import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {
  const [username, setName] = useState(localStorage.getItem("username") || undefined);
  const [password, setPassword] = useState("");
  console.log(username)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="buymecoffee/projects" element={<ProjectGallery username={username}/>} />
        <Route path="buymecoffee/project/:projectId" element={<ProjectDetailView />} />
        <Route path="buymecoffee/project/:projectId/edit" element={<EditProject />} />
        <Route path="buymecoffee/investors" element={<InvestorGallery username={username}/>} />
        <Route path="buymecoffee/investor/:investorId" element={<InvestorDetailView />} />
        <Route path="buymecoffee/projectOwner/:projectOwnerId" element={<DeveloperDetailView/>} />
        <Route path="buymecoffee/investor/profile/:username" element={<InvestorProfile />} />
        <Route path="buymecoffee/projectOwner/profile/:username" element={<UserProfile />} />
        <Route path="buymecoffee/investor/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="buymecoffee/projectOwner/profile/:username/edit" element={<EditUserProfile />} />
        <Route path="buymecoffee/login" element={<LogIn password={password} username={username} setPassword={setPassword} setName={setName}/>} />
        <Route path="buymecoffee/signup" element={<Signup />}/>
        <Route path="buymecoffee/submitProject" element={<SubmitProject />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
