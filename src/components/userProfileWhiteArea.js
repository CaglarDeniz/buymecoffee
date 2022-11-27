import "./userProfile.css";
function UserProfileWhiteArea(props) {
  return (
    <div className="white-area">
      <h5 className="box-text">USERNAME</h5>
      <h5>{props.person.username}</h5>
      <h5 className="box-text">EMAIL</h5>
      <h5>{props.person.email}</h5>
      <h5 className="box-text">PASSWORD</h5>
      <h5>{props.person.password}</h5>
      <h5 className="box-text">INDUSTRY</h5>
      <h5>{props.person.industry}</h5>
      <h5 className="box-text">BIO</h5>
      <h5>{props.person.bio}</h5>
      <h4 className="box-text">MY PROJECTS</h4>
    </div>
  );
}

export default UserProfileWhiteArea;