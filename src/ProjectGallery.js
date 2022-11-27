import GalleryView from "./components/galleryView";
import Navbar from "./components/navbarGallery";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import "./components/galleryView.css";
function ProjectGallery(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#313335",
        grey: "#CACCCE"
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
  const [curIndustry, setCurIndustry] = useState("technology");
  console.log('indust',curIndustry)
  return (
    <ThemeProvider theme={theme}>

    <div className="container-wrap">
      <Navbar />
      <div className="filter-container">
        <span>SORT BY INDUSTRY:</span>
        <Button  
          onClick={() => {setCurIndustry("technology")}}
          variant="contained"
          sx={{
              ':hover': {
                bgcolor: 'primary.grey', // theme.palette.primary.main
                color: 'primary.main',
              },
            }}
        >
          Technology
        </Button>
        <Button  onClick={() => {setCurIndustry("food")} }     variant="contained"
          sx={{
              ':hover': {
                bgcolor: 'primary.grey', // theme.palette.primary.main
                color: 'primary.main',
              },
            }} >
          FOOD 
        </Button>
        <Button 
          onClick={() => {setCurIndustry("creative")}}
          variant="contained"
          sx={{
              ':hover': {
                bgcolor: 'primary.grey', // theme.palette.primary.main
                color: 'primary.main',
              },
            }}
        >
          CREATIVE
        </Button>
      </div>
      <div className="grid-container">
        <GalleryView curIndustry={curIndustry} />
      </div>
    </div>
    </ThemeProvider>

  );
}

export default ProjectGallery;
