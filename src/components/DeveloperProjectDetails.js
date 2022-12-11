import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import axios from "axios";
import BackendURL from "../BackendURL";

function DeveloperProjectDetails(props) {
  //TODO:  change projectList to state && use the curIndustry to perform Axios
  //const emptyProject = [11, 12, 13, 14];
  // const projectList = [
  //   { name: "Facebook x Tesla", industry: "tech", _id: 1 },
  //   { name: "Interactive Code", industry: "tech", _id: 2 },
  //   { name: "The new github", industry: "tech", _id: 3 },
  // ];
  const gridWidthMedium = [12,6,4,3]
  const gridWidthSmall = [12,6,4,6]
  const [projectInfo, setProjectInfo] = React.useState([]);
  React.useEffect(() => {
    if(props.projectList?.length > 0){
      const promisesArray = props.projectList?.map
      ( (projectId) => {
        return axios.get(BackendURL + '/api/project/${projectId}');
      });
      let obj = Promise.all(promisesArray);
      obj.then((res) => {
        let tempArr = res?.map((item) => {
          return item.data.data[0];
        });
        setProjectInfo(tempArr);
      }).catch((err)=>{console.log(err)});
    } else {
      setProjectInfo([]);
    }
  }, [props.projectList]);

  const returnCard = (projectName, projectId) => {
    let card = (
      <Grid item xs={12} sm={props.projectList? '':gridWidthSmall[props.projectList.length]} md={props.projectList? '':gridWidthMedium[props.projectList.length]}
       key={projectId}>
        <Link className="link" to={`/project/${projectId}`}>
          <Card
            sx={{
              minWidth: props.projectList?.length === 0 ? 165.825 : "",
              maxWidth: 345,
              minHeight: 198,
              height: "100%",
              display: "flex",
              flexDirection: "column",
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
                sx={{
                display: "flex",
                flexDirection: "column"
              }}
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
  return (
    <div className="my-projects-grid-container">
      <Grid
        container
        alignItems="stretch"
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 4, md: 4 }}
      >
        {projectInfo.map((project) => {
          return returnCard(project.name, project._id);
        })}
{/* 
        {projectList.length < 4
          ? emptyProject
              .slice(0, 4 - projectList.length)
              .map((id) => AddProject(id))
          : ""} */}
      </Grid>
    </div>
  );
}

export default DeveloperProjectDetails;
