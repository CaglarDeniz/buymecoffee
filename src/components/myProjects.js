import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import AddProjects from "./addProjects";
import Axios from "axios";

function MyProjects(props) {
  //TODO:  change projectList to state && use the curIndustry to perform Axios
  const emptyProject = [11, 12, 13, 14];
  const [projectInfo, setProjectInfo] = React.useState([]);
  console.log("projectInfo", projectInfo);
  React.useEffect(() => {
    if (props.projectList?.length > 0) {
      const arrayOfPromises = props.projectList?.map((projectId) => {
        return Axios.get(`http://localhost:8080/api/project/${projectId}`);
      });
      let obj = Promise.all(arrayOfPromises);
      obj
        .then((res) => {
          let tempArr = res?.map((item) => {
            return item.data.data[0];
          });
          setProjectInfo(tempArr);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProjectInfo([]);
    }
  }, [props.projectList]);
  const returnCard = (projectName, projectId) => {
    let card = (
      <Grid item xs={12} sm={6} md={6} key={projectId} className="project-add-margin">
        <Link className="link user-link" to={`/project/${projectId}`}>
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
              image={projectInfo.photoLink}
              alt="project cover photo"
            />

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
        </Link>
      </Grid>
    );
    return card;
  };

  const AddProject = (id) => {
    let card = <AddProjects id={id} projectList={props.projectList} key={id} />;
    return card;
  };
  return (
    <div className="my-projects-grid-container">
      <Grid
        container
        alignItems="stretch"
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 4, md: 5 }}
      >
        {projectInfo?.map((proj) => {
          return returnCard(proj.name, proj._id);
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

export default MyProjects;
