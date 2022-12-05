import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import Axios from "axios";

function GalleryView(props) {
  //TODO:  change projectList to state && use the curIndustry to perform Axios
  const [projectList, setProjectList] = React.useState([]);
  console.log(projectList)
  React.useEffect(()=>{
    let industry = props.curIndustry === 'none' ? {}:{industry:props.curIndustry}
    if(props.mode !== 'investor') {
    let url = `http://localhost:8080/api/project?where=${JSON.stringify(industry)}`
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    })}
    else {
      let url = `http://localhost:8080/api/investor?where=${JSON.stringify(industry)}`
      Axios.get(url).then((res)=>{
        // console.log(res.data.data)
        setProjectList(res.data.data)
      })
    }
  }, [props.curIndustry, props.mode])

  React.useEffect(()=>{
    if(props.mode !== 'investor') {
    let url = `http://localhost:8080/api/project`
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    })
  } else {
    let url = `http://localhost:8080/api/investor`
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    })
  }
  },[props.mode])
  const returnCard = (projectName, projectId) => {
    let card = (
      <Grid item xs={6} sm={4} md={3} key={projectId}>
        <Link className="link" to={props.mode === 'investor' ? `/investor/${projectId}`:`/project/${projectId}`}>
          <Card
            sx={{
              maxWidth: 345,
              ":hover": {
                boxShadow: 10,
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={projectList.photoLink}
              alt="project cover photo"
            />
            <CardContent>
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

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 4 }}>
      {projectList.map((project) => {
        return returnCard(project.name, project._id);
      })}
    </Grid>
  );
}

export default GalleryView;
