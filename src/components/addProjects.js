import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

function AddProjects(props) {
    return (
        <Grid item xs={12} sm={6} md={6} key={props.id}>
        <Link className="link user-link" to={`/submitProject`}>
          <Card 
            sx={{
              minWidth: props.projectList?.length === 0 ? 165.825 : "",
              width:"100%",
              maxWidth: 345,
              minHeight: 198,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ":hover": {
                boxShadow: 10,
              },
            }}
          >
            <AddIcon className="add-icon"/>
          </Card>
        </Link>
      </Grid>
    )
}
export default AddProjects;
