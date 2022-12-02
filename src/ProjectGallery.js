import GalleryView from "./components/galleryView";
import Navbar from "./components/navbarGallery";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SelectAutoWidth from "./components/selectButton";

import "./components/galleryView.css";
function ProjectGallery(props) {
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#313335",
        grey: "#CACCCE",
        blue: "#0077B5",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: ["Roboto Mono", "monospace"].join(","),
    },
  });
  const [curIndustry, setCurIndustry] = useState("technology");
  console.log("indust", curIndustry);
  useEffect(() => {
    const filters = ["technology", "creative", "food"];
    filters.map((filterName) => {
      const element = document.getElementById(filterName);
      if(element) {
        element.classList.remove("blue-text");
      }
      return null;
    });
    const element = document.getElementById(curIndustry);
    if(element) {
    element.classList.add("blue-text");
    }
  }, [curIndustry]);
  return (
    <ThemeProvider theme={theme}>
      <div className="container-wrap">
        <Navbar />
        {windowSize.innerWidth > 600 ? (
          <div className="filter-container">
            <span className="sort-text">FILTER BY INDUSTRY:</span>
            <Button
              id="technology"
              className="button"
              onClick={() => {
                setCurIndustry("technology");
              }}
              variant="contained"
              sx={{
                ":hover": {
                  bgcolor: "primary.blue", // theme.palette.primary.main
                  color: "primary.grey",
                },
              }}
            >
              Technology
            </Button>
            <Button
              id="food"
              className="button"
              onClick={() => {
                setCurIndustry("food");
              }}
              variant="contained"
              sx={{
                ":hover": {
                  bgcolor: "primary.blue", // theme.palette.primary.main
                  color: "primary.grey",
                },
              }}
            >
              FOOD
            </Button>
            <Button
              id="creative"
              className="button"
              onClick={() => {
                setCurIndustry("creative");
              }}
              variant="contained"
              sx={{
                ":hover": {
                  bgcolor: "primary.blue", // theme.palette.primary.main
                  color: "primary.grey",
                },
              }}
            >
              CREATIVE
            </Button>
          </div>
        ) : ( 
          <div className="filter-container-small">
          <span className="sort-text-small">FILTER BY INDUSTRY:</span>
          <SelectAutoWidth
            setCurIndustry={setCurIndustry}
            curIndustry={curIndustry}
          />
          </div>
        )}

        <div className="grid-container">
          <GalleryView curIndustry={curIndustry} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProjectGallery;
