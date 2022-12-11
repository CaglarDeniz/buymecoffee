import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddProjects from "./addProjects";
import BackendURL from "../BackendURL";
import Axios from "axios";

function MyProjectsEdit(props) {
  const emptyProject = [1, 2, 3, 4];

  const [projectInfo, setProjectInfo] = React.useState([]);
  React.useEffect(() => {
    if (props.projectList?.length > 0) {
      const arrayOfPromises = props.projectList?.map((projectId) => {
        return Axios.get(BackendURL + '/api/project/${projectId}');
      });
      let obj = Promise.all(arrayOfPromises);
      obj.then((res) => {
        let tempArr = res?.map((item) => {
          return item.data.data[0];
        });
        setProjectInfo(tempArr);
      });
    } else {
      setProjectInfo([]);
    }
  }, [props.projectList]);
  const returnCard = (projectName, projectId, photoLink) => {
    let card = (
      <Grid  className="my-project-small-grid" item xs={12} sm={6} md={3} key={projectId}>
        <div className=" user-link">
          <Card
            sx={{
              width: "100%",
              maxWidth: 345,
              height: "100%",
              ":hover": {
                boxShadow: 10,
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={photoLink}
              alt="project cover photo"
            />

            <Link className="link" to={`/project/${projectId}/edit`}>
              <EditIcon className="edit-project" />
            </Link>
            <CardContent
              sx={{
                height: 15,
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={12}
              >
                {projectName.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    );
    return card;
  };

  const AddProject = (id) => {
    let card = <AddProjects id={id} projectList={props.projectList} key={id} />;
    return card;
  };

  return (
    <div className="my-project-wrap">
      <Grid
        container
        alignItems="stretch"
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 4, md: 4 }}
      >
        {projectInfo?.map((proj) => {
          return returnCard(proj.name, proj._id, proj.photoLink);
        })}

        {projectInfo?.length < 4
          ? emptyProject
              .slice(0, 4 - projectInfo?.length)
              .map((id) => AddProject(id))
          : ""}
      </Grid>
    </div>
  );
}

export default MyProjectsEdit;
