import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import './submitProject.css';

function EditProjectHeader(props){
    const navigate = useNavigate();

    const goBack = ()=> {
      navigate("/:username"); 
    }
    
    return (
        <div className="submit-headerblue">
            <ArrowBackIosNewIcon className="submitproj-backicon" onClick={goBack} />
            <h3 className="submitproj-header">EDIT MY PROJECT</h3>
        </div>

    );

}

export default EditProjectHeader;