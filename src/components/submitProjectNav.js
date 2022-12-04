
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import './submitProject.css';

function SubmitProjectHeader(props){
    const navigate = useNavigate();

    const goBack = ()=> {
      navigate("/projectOwner/profile/:username"); 
    }
    
    return (
        <div className="submit-headerblue">
            <ArrowBackIosNewIcon className="submitproj-backicon" onClick={goBack} />
            <h3 className="submitproj-header">SUBMIT MY PROJECT</h3>
        </div>

    );

}

export default SubmitProjectHeader;