import MyProjects from "./myProjects";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import "./userProfile.css";
import { useLocation } from "react-router-dom";

function UserProfileWhiteArea(props) {
  const location = useLocation();
  return (
    <>
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
        <h5 className="box-text">Username</h5>
        <h5 className="user-text">{props.person.username}</h5>
        <h5 className="box-text">Email</h5>
        <h5 className="user-text">{props.person.email}</h5>
        <h5 className="box-text">Password</h5>
        <h5 className="user-text">************</h5>
        {location.pathname.includes("/investor/profile") && (
          <h5 className="box-text">Industry</h5>
        )}
        {location.pathname.includes("/investor/profile") &&
          props.person.industry?.map((indus) => {
            return <h5 key={indus}>{indus}</h5>;
          })}
        <h5 className="box-text">Bio</h5>
        <h5 className="user-text">{props.person.bio}</h5>
        {props.mode === "investor" && (
          <>
            <h5 className="box-text">Old StartUps</h5>
            <div className="oldStartUp-container last-item-mobile">
              {props.person.oldStartups?.map((startUp) => (
                <h5 key={startUp} className="startup-name">
                  {startUp}
                </h5>
              ))}
            </div>
          </>
        )}
      </div>
      {props.mode !== "investor" && (
        <>
          <h5 className="box-text">My Projects</h5>
          <MyProjects projectList={props.person.projectId} />
        </>
      )}
    </>
  );
}

export default UserProfileWhiteArea;
