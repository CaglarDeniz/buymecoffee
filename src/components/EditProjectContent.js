import './submitProject.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function EditProjectContent(props){
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [industry, setIndustry] = useState(" ");
    const [amount, setAmount] = useState(0);
    const [photolink, setPhotoLink] = useState(" ");
    const [ownerId, setOwnerId] = useState(" ");
    useEffect(() => {
        setName(props.project.name);
        setDescription(props.project.description);
        setIndustry(props.project.industry);
        setAmount(props.project.amount);
        setOwnerId(props.project.ownerId);
        // set a photo temp variable with previous props.photo and use it in avatar
    }, [props.project.description, props.project.name, props.project.amount, props.project.industry, props.project.ownerId])

    //make post request to upload to get new photo and put put inside it
    const navigate = useNavigate();
    const handleonSubmit = (event) => {
        event.preventDefault();
        axios.put("http://localhost:8080/api/project/"+props.project._id, {
                "name":name,
                "description":description,
                "amount": amount, 
                "industry": industry, 
                "ownerId": ownerId
                // add photo link here after put completed and use the variable set in post/whatev
        }).then( (res) =>{
                console.log(res);
                navigate("/projectOwner/profile/"+props.username);
        }); 
    }

    return (
        <div className='proj-greyarea'>
            <form className="project-submitform" onSubmit={handleonSubmit}>
                {/* Make a avatar for photo preview and then a input file for photo prefilled with what photo is already there */}
                <label className='submit-label'>Project Name</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Project Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                <label className='submit-label'>Project Description</label>
                <textarea className="submit-field_d" 
                        rows="6" cols="50" 
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

                <button className="submit-projbutton" type="Submit">Save and Submit</button>
            </form>
        </div>

    );
}

export default EditProjectContent;