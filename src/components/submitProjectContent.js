import { useState } from 'react';
import { useNavigate } from 'react-router';
import './submitProject.css';

function SubmitProjectContent(props){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [industry, setIndustry] = useState("");
    const [amount, setAmount] = useState("");
    const [photolink, setPhotoLink] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleonSubmit = (event) => {
        event.preventDefault();
        navigate("/projectOwner/profile/:username");
    }

    return (
        <div className='proj-greyarea'>
            <form className="project-submitform" onSubmit={handleonSubmit}>
                <label className='submit-label'>Project Name</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Project Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                <label className='submit-label'>Project Description</label>
                <textarea className="submit-field_d" 
                        rows="4" cols="50" 
                        placeholder="Project Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>
                <label className='submit-label'>Industry</label>
                <select className="submit-field_s"                         
                        value={industry} 
                        onChange={(e) => setIndustry(e.target.value)}>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Communication">Communication</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Retail">Retail</option>
                        <option value="Food">Food</option>
                        <option value="Energy">Energy</option>
                        <option value="Finance">Finance</option>
                        <option value="Construction">Construction</option>
                        <option value="Aerospace">Aerospace</option>
                        <option value="Software">Software</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Other">Other</option>
                </select>
                <label className='submit-label'>Photo</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Project Photo" 
                        value={photolink} 
                        onChange={(e) => setPhotoLink(e.target.value)}/>
                <label className='submit-label'>Investment Amount</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Investment Amount Required" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}/>
                <label className='submit-label'>Contact Information</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Your Email Information" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                <button className="submit-projbutton" type="Submit">Submit Project</button>
            </form>
        </div>

    );
}

export default SubmitProjectContent;