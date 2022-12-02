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

import LogIn from "./logIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<ProjectGallery />} />
        <Route path="/project/:projectId" element={<ProjectDetailView />} />
        <Route path="/project/:projectId/edit" element={<EditProject />} />
        <Route path="/investors" element={<InvestorGallery />} />
        <Route path="/investor/:investorId" element={<InvestorDetailView />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/:username/edit" element={<EditUserProfile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/submitProject" element={<SubmitProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
