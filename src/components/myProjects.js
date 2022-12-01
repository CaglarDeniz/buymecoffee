import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import AddProjects from "./addProjects";

function MyProjects(props) {
  //TODO:  change projectList to state && use the curIndustry to perform Axios
  const emptyProject = [11, 12, 13, 14];
  const projectList = [
    { name: "Facebook x Tesla", industry: "tech", _id: 1 },
    { name: "Interactive Code", industry: "tech", _id: 2 },
    { name: "The new github", industry: "tech", _id: 3 },
  ];
  const returnCard = (projectName, projectId) => {
    let card = (
      <Grid item xs={6} sm={6} md={3
      } key={projectId}>
        <Link className="link" to={`/project/${projectId}`}>
          <Card
            sx={{
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
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="project cover photo"
            />

            {/* <Link className="link" to={`/project/${projectId}/edit`}>
            <EditIcon className="edit-project"/>
            </Link> */}
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
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
    return card;
  };

  const AddProject = (id) => {
    let card = (
    <AddProjects id={id} projectList={projectList} key={id}/>
    );
    return card;
  };
  return (
    <div className="my-projects-grid-container">
      <Grid
        container
        alignItems="stretch"
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 4, md: 4 }}
      >
        {projectList.map((project) => {
          return returnCard(project.name, project._id);
        })}

        {projectList.length < 4
          ? emptyProject
              .slice(0, 4 - projectList.length)
              .map((id) => AddProject(id))
          : ""}
      </Grid>
    </div>
  );
}

export default MyProjects;
