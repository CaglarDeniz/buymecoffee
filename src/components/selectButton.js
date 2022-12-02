import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// reference https://mui.com/material-ui/react-select/
export default function SelectAutoWidth(props) {

  const handleChange = (event) => {
    props.setCurIndustry(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Industry</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.curIndustry}
          onChange={handleChange}
          autoWidth
          label="Industry"
        >
          <MenuItem value="">
            <p>None</p>
          </MenuItem>
          <MenuItem id='technology' value={'technology'}>Technology</MenuItem>
          <MenuItem id='food' value={'food'}>Food</MenuItem>
          <MenuItem id='creative' value={'creative'}>Creative</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}