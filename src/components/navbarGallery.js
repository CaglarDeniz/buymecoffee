import { Link } from 'react-router-dom'
import UserProfileCircle from './userProfileCircle';
import './navbar.css';

function navbarGallery(props) {

    return (
        <div className="navbar-container">
          <Link className="nav-link" to="/">PROJECTS</Link>
          <Link className="nav-link" to="/investors">INVESTORS</Link>
          <Link className="nav-link" to="/:username"><UserProfileCircle/></Link>

        </div>
    );
}

export default navbarGallery