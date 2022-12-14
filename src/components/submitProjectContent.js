import { useState } from 'react';
import { useNavigate } from 'react-router';
import './submitProject.css';
import axios from 'axios';
import Avatar from "@mui/material/Avatar";
import BackendURL from '../BackendURL';

function SubmitProjectContent(props){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [industry, setIndustry] = useState("Other");
    const [amount, setAmount] = useState(0);
    //const [photolink, setPhotoLink] = useState("");
    const [tempPhoto, setTempPhoto] = useState("");

    //const [projectowner_id, setOwnerId] = useState("");
    const navigate = useNavigate();
    //console.log(tempPhoto);
    const handleonSubmit = (event) => {
        event.preventDefault();
        if( name === "" || industry === ""){
                alert("Name and Industry of the Project needs to be mentioned");
                return;
        }
        if(tempPhoto === ""){
                axios.get(BackendURL + "/api/developer/"+props.username).then( (res) =>{
                        //console.log(res.data.data._id);
                        //setOwnerId(res.data.data._id);
                        axios.post(BackendURL + "/api/project", {
                                "name": name, 
                                "industry": industry,
                                "description": description,
                                "amount": amount,
                                "ownerId": res.data.data._id
                        }).then ( (res) =>{
                                //console.log(res.data);
                                alert('Project has been successfully created! ');
                                 //make post request for project with this
                                navigate("/projectOwner/profile/"+props.username);
                        }).catch( () => {
                                console.log("post request no work for project")
                        });
                }).catch( () =>{
                                console.log("getting owner id no work")
                });
        }else{
                let formData = new FormData()
                formData.append("photo", tempPhoto);
                console.log("temporary project photo", tempPhoto);
                axios.post(BackendURL + '/upload/', formData, {
                        headers:{
                                "Content-Type": "multipart/form-data",
                        },
                }).then( (res) => {
                        console.log("try to check post", res);
                        axios.get(BackendURL + "/api/developer/"+props.username).then( (response) =>{
                                //console.log(res.data.data._id);
                                //setOwnerId(res.data.data._id);
                                axios.post(BackendURL + "/api/project", {
                                      "name": name, 
                                      "industry": industry,
                                      "description": description,
                                      "amount": amount,
                                      "ownerId": response.data.data._id,
                                      "photoLink": res.data.data
                                }).then ( (res) =>{
                                        //console.log(res.data);
                                        alert('Project has been successfully created! ');
                                         //make post request for project with this
                                        navigate("/projectOwner/profile/"+props.username);
                                }).catch( () => {
                                        console.log("post request no work for project")
                                });
                        }).catch( () =>{
                                console.log("getting owner id no work")
                        });
                }).catch( (err) => {
                        console.log(err);
                });
        }
    }

    return (
        <div className='proj-greyarea'>
            <form className="project-submitform" onSubmit={handleonSubmit}>
                <Avatar className="preview-pic-project" alt="Project Picture"
                src={tempPhoto ? URL.createObjectURL(tempPhoto) : ""}
                sx={{ width: 150, height: 150 }}
                />

                <input className="choose-image-project" type="file" id="file"
                onChange={(e) => setTempPhoto(e.target.files[0])}
                ></input>
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
                        <option value="Other">Other</option>
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
                </select>
               
                <label className='submit-label'>Investment Amount Required</label>
                <input className="submit-field" 
                        type="text" 
                        placeholder="Investment Amount Required" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}/>
                <button className="submit-projbutton" type="Submit">Submit Project</button>
            </form>
        </div>

    );
}

export default SubmitProjectContent;
