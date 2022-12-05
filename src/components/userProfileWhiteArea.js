import MyProjects from "./myProjects";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import "./userProfile.css";
function UserProfileWhiteArea(props) {
  return (
    <div className="white-area">
      <Link
        className="link"
        to={
          props.mode === "investor"
            ? `/investor/profile/${props.username}/edit`
            : `/projectOwner/profile/${props.username}/edit`
        }
      >
        <EditIcon className="edit-user" />
      </Link>
      <h5 className="box-text">USERNAME</h5>
      <h5>{props.person.username}</h5>
      <h5 className="box-text">EMAIL</h5>
      <h5>{props.person.email}</h5>
      <h5 className="box-text">PASSWORD</h5>
      <h5>{props.person.password}</h5>
      <h5 className="box-text">INDUSTRY</h5>
      {props.person.industry?.map((indus) => {
        return <h5 key={indus}>{indus}</h5>;
      })}
      <h5 className="box-text">BIO</h5>
      <h5>{props.person.bio}</h5>
      {props.mode === "investor" ? (
        <>
          <h5 className="box-text">OLD STARTUPS</h5>
          <div className="oldStartUp-container">
            {props.person.oldStartups?.map((startUp) => (
              <h5 key={startUp} className="startup-name">
                {startUp}
              </h5>
            ))}
          </div>
        </>
      ) : (
        <>
          <h4 className="box-text">MY PROJECTS</h4>
          <MyProjects projectList={props.person.projectId} />
        </>
      )}
    </div>
  );
}

export default UserProfileWhiteArea;
