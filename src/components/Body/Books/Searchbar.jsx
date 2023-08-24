import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import'../../global.css'
import SearchIcon from "@mui/icons-material/Search";

function Searchbar() {

        // const handleChange = (event) => {

        // };
  return (
    <div id='searchbar'>
        <div>
      <TextField
        id="search"
        type="search"
        label="What You are looking for....."
        // onChange={handleChange}

        sx={{ width: 600 }}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
      />
      </div>
    </div>
  )
}

export default Searchbar
