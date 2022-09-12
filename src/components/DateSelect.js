import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { months } from '../months';

export default function DateSelect({monthFilter}) {
  const [month, setMonth] = React.useState('');

  const handleChange = (e) => {
    const newMonth = e.target.value;
    console.log(newMonth);
    setMonth(newMonth);
    monthFilter(newMonth);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Months</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={month}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>No Filter</em>
          </MenuItem>
          {months.slice(1).map((month, index)=>{
            return <MenuItem key={index} value={month}>{month}</MenuItem>; 
          })}
        </Select>
      </FormControl>
    </div>
  );
}
