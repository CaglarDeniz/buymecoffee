import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import './InvestorDetailView.css'

function InvestorDetailHeader(props){

    const navigate = useNavigate();

    const goBack = ()=> {
      navigate("/investors"); 
    }

    return (
        <div className="white-area">
            <ArrowBackIosNewIcon className="back2-icon" onClick={goBack} />
            <div className="flex-area">
            <Link to="/investors">
                <img
                className="bmcfblue-logo"
                src={require("./img/BuyMeCoffeeBlue.png")}
                alt="BuyMeCoffeeLogo"
                />
            </Link>
            <img
                className="investor-pic"
                src= {props.photolink}
                alt="InvestorProfilePicture"
            />
            <h3 className="investor-name">{props.name}</h3>
            </div>
        </div>
    );

}

export default InvestorDetailHeader;