import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./galleryView.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import BackendURL from "../BackendURL";

function GalleryView(props) {
  const [projectList, setProjectList] = React.useState([]);
  React.useEffect(()=>{
    let industry = props.curIndustry === 'none' ? {}:{industry:props.curIndustry}
    if(props.mode !== 'investor') {
    let url = BackendURL + `/api/project?where=${JSON.stringify(industry)}`
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    }).catch((err)=>{console.log(err)})}
    else {
      let url =  BackendURL + '/api/investor?where=${JSON.stringify(industry)}'
      Axios.get(url).then((res)=>{
        // console.log(res.data.data)
        setProjectList(res.data.data)
      }).catch((err)=>{console.log(err)})
    }
  }, [props.curIndustry, props.mode])

  React.useEffect(()=>{
    if(props.mode !== 'investor') {
    let url = BackendURL + '/api/project'
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    }).catch((err)=>{console.log(err)})
  } else {
    let url = BackendURL + '/api/investor'
    Axios.get(url).then((res)=>{
      // console.log(res.data.data)
      setProjectList(res.data.data)
    }).catch((err)=>{console.log(err)})
  }
  },[props.mode])
  const returnCard = (projectName, projectId, projectPhotoLink) => {
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
              image={projectPhotoLink}
              alt="cover photo"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize={14}
              >
                {projectName}
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
        return returnCard(project.name, project._id, project.photoLink);
      })}
    </Grid>
  );
}

export default GalleryView;
