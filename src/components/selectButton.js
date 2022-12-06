import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// reference https://mui.com/material-ui/react-select/
export default function SelectAutoWidth(props) {
  const handleChange = (event) => {
    props.setCurIndustry(event.target.value);
  };

  const returnMenuItem = (name) => {
    let menuItem = (
      <MenuItem key={name} id={name} value={name}>
        {name === "none" ? "All" : name}
      </MenuItem>
    );
    return menuItem;
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.curIndustry}
          onChange={handleChange}
          autoWidth
          label={props.label}
        >
          {props.industryNames?.map((name) => returnMenuItem(name))}
        </Select>
      </FormControl>
    </div>
  );
}
