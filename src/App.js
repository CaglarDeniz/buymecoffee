import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import ProjectGallery from './ProjectGallery';
import InvestorGallery from './InvestorGallery';
import UserProfile from './UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectGallery />} />
        <Route path="/investors" element={<InvestorGallery/>} />
        <Route path="/:username" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
