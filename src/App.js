import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import ProjectGallery from './ProjectGallery';
import InvestorGallery from './InvestorGallery';
import UserProfile from './UserProfile';
import ProjectDetailView from "./projectDetailView";
import InvestorDetailView from "./InvestorDetailView";
import LogIn from "./logIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<ProjectGallery />} />
        <Route path="/project/:projectId" element={<ProjectDetailView />} />
        <Route path="/investors" element={<InvestorGallery/>} />
        <Route path="/investor/:investorId" element={<InvestorDetailView/>} />
        <Route path="/:username" element={<UserProfile/>} />
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
