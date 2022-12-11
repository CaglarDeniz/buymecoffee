import "./aboutPageBluebg.css";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SchoolIcon from "@mui/icons-material/School";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ExtensionIcon from "@mui/icons-material/Extension";
import ForumIcon from "@mui/icons-material/Forum";
function AboutPageBlueBg() {
  return (
    <div
      className="blue-container"
      style={{ backgroundImage: `url(${require("./img/aboutPageEnd.png")})` }}
    >
<div className="container-wrap-blue">
        <div className="row-1">
          Update Investors about New Innovative Projects <br></br><br></br>
          <CircleNotificationsIcon className='icon' />
        </div>
        <div className="row-1">
          Match Ideas to Investors' Expertise<br></br><br></br>
          <SchoolIcon className='icon'/>
        </div>
        <div className="row-1">
          Business with Innovators, Made Easy<br></br><br></br>
          <ShowChartIcon className='icon'/>
        </div>
      </div>

      <div className="container-wrap-blue">
        <div className="row-1">
          Discover Experienced Investors to Connect with<br></br><br></br>
          <HandshakeIcon className='icon'/>
        </div>
        <div className="row-1">
          Explore Investors that are the Right Fit<br></br><br></br>
          <ExtensionIcon className='icon'/>
        </div>
        <div className="row-1">
          Pitch Your Idea Directly to Investors<br></br><br></br>
          <ForumIcon className='icon'/>
        </div>
      </div>
    </div>
  );
}

export default AboutPageBlueBg;
