import { useParams } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function ProjectDetailView(props) {
    let params = useParams();
    console.log("params", params)
    const theme = createTheme({
        palette: {
          primary: {
            main: "#313335",
            grey: "#CACCCE",
            blue: "#0077B5"
          },
          secondary: {
            main: "#FFFFFF",
          },
        },
        typography: {
            fontFamily: [
              'Roboto Mono',
              'monospace',
            ].join(','),
          }
    });

    return (
        <div className="container-wrap">
            <div className="userlogin-navbar"></div>
            <h1>hello  project detail view {params._id}</h1>
        </div>
    );
}

export default ProjectDetailView