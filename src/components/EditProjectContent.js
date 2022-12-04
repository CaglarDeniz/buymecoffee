import './submitProject.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function EditProjectContent(props){
    const [name, setName] = useState(props.project.name);
    const [description, setDescription] = useState(props.project.description);
    const [industry, setIndustry] = useState(props.project.industry);
    const [amount, setAmount] = useState(props.project.amount);
    const [photolink, setPhotoLink] = useState(props.project.photolink);
    const [email, setEmail] = useState("np.js409@gmail.com"); // get the email using the ownerId to access email

    const navigate = useNavigate();
    const handleonSubmit = (event) => {
        event.preventDefault();
        navigate("/:username");
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
                <input className="submit-field" 
                        type="text" 
                        placeholder="Industry" 
                        value={industry} 
                        onChange={(e) => setIndustry(e.target.value)}/>
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
                <button className="submit-projbutton" type="Submit">Save and Submit</button>
            </form>
        </div>

    );
}

export default EditProjectContent;