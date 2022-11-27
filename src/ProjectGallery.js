import GalleryView from "./components/galleryView";
import Navbar from "./components/navbarGallery";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import "./components/galleryView.css";
function ProjectGallery(props) {
    const filters = ['technology','creative','food']
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
  useEffect(()=> {
    filters.map((filterName)=> {
        const element = document.getElementById(filterName)
    element.classList.remove('blue-text')
    })
    const element = document.getElementById(curIndustry)
    element.classList.add('blue-text')
  }, [curIndustry])
  return (
    <ThemeProvider theme={theme}>

    <div className="container-wrap">
      <Navbar />
      <div className="filter-container">
        <span className="sort-text">SORT BY INDUSTRY:</span>
        <Button id='technology' className='button'
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
        <Button id='food' className='button' onClick={() => {setCurIndustry("food")} }     variant="contained"
          sx={{
              ':hover': {
                bgcolor: 'primary.grey', // theme.palette.primary.main
                color: 'primary.main',
              },
            }} >
          FOOD 
        </Button>
        <Button id='creative' className='button'
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
