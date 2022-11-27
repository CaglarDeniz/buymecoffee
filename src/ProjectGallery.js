import GalleryView from './components/galleryView';
import Navbar from './components/navbarGallery';
import './components/galleryView.css'
function ProjectGallery(props) {

    return (
        <div className="container-wrap">
            <Navbar/>
            <div className='grid-container'>

            <GalleryView/>
            </div>

        </div>
    );
}

export default ProjectGallery