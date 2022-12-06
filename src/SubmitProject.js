import SubmitProjectContent from "./components/submitProjectContent";
import SubmitProjectHeader from "./components/submitProjectNav";
import './components/submitProject.css';
function SubmitProject(props) {
  return (
    <div className="project-wrap">
      <SubmitProjectHeader username={props.username}/>
      <SubmitProjectContent username={props.username}/>
    </div>
  )
  
  
}

export default SubmitProject;
