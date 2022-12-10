import React from "react";
import Button from "@mui/material/Button";
import "./galleryView.css";

export function Card(props) {
  return (
    <Button
      id={props.industryName}
      className="button-filter"
      onClick={() => {
        props.setCurIndustry(props.industryName);
      }}
      variant="contained"
      sx={{
        ":hover": {
          bgcolor: "primary.blue", // theme.palette.primary.main
          color: "secondary.main",
        },
      }}
    >
      {props.industryName === 'none' ? "all": props.industryName}
    </Button>
  );
}
