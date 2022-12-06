import GalleryView from "./components/galleryView";
import Navbar from "./components/navbarGallery";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScrollingMenu from "./components/ScrollingMenu";
import SelectAutoWidth from "./components/selectButton";

import "./components/galleryView.css";
function InvestorGallery(props) {
  const industryNames = [
    "none",
    "Healthcare",
    "Automotive",
    "Communication",
    "Entertainment",
    "Retail",
    "Food",
    "Energy",
    "Finance",
    "Construction",
    "Aerospace",
    "Software",
    "Chemical",
    "Other"
  ];
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
  const [curIndustry, setCurIndustry] = useState("none");
  console.log("indust", curIndustry);
  useEffect(() => {
    const filters = [
      "none",
      "Healthcare",
      "Automotive",
      "Communication",
      "Entertainment",
      "Retail",
      "Food",
      "Energy",
      "Finance",
      "Construction",
      "Aerospace",
      "Software",
      "Chemical",
      "Other",
    ];
    filters.map((filterName) => {
      const element = document.getElementById(filterName);
      if (element) {
        element.classList.remove("blue-text");
      }
      return null;
    });
    const element = document.getElementById(curIndustry);
    if (element) {
      element.classList.add("blue-text");
    }
  }, [curIndustry]);
  return (
    <ThemeProvider theme={theme}>
      <div className="container-wrap">
        <Navbar mode={"projectOwner"} username={props.username} />
        <h2 className="project-heading">Investors</h2>
        {windowSize.innerWidth > 768 ? (
          <ScrollingMenu
            setCurIndustry={setCurIndustry}
            industryNames={industryNames}
          />
        ) : (
          <div className="filter-container-small">
            <span className="sort-text-small">FILTER BY INDUSTRY:</span>
            <SelectAutoWidth
              industryNames={industryNames}
              setCurIndustry={setCurIndustry}
              curIndustry={curIndustry}
            />
          </div>
        )}

        <div className="grid-container">
          <GalleryView curIndustry={curIndustry} mode="investor" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default InvestorGallery;
