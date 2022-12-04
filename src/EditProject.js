import './components/submitProject.css';
import EditProjectHeader from './components/EditProjectHeader';
import EditProjectContent from './components/EditProjectContent';

function EditProject(props) {

    const tempProject = {name:'Facebook x Tesla', description: "FACEBOOK X TESLA is a Project that combines tesla/’s advances in techware with facebook/'s current strategies to be able to enable more technology accessibility to those around.", industry:'Automotive', amount: 1000000, photoLink:"", ownerId: 123}
    return (
        <div className="project-wrap">
          <EditProjectHeader/>
          <EditProjectContent project={tempProject} />
        </div>
    );
      
}

export default EditProject