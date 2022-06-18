import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import './PopOver.css'
export default function BasicPopover({handleGifClick}) {
    const [data, setData] = useState([])
    const [query,setQuery]=useState("")
    useEffect(() => {
        const key="DV76GNER5pkFWuIezwInqUrmR1Al1Obz"
         axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`).then((res) => {
            console.log("res",res.data.data)
            setData(res.data.data)
})
    },[])
   
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   
  const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const handleSearch = () => {
        const key = "DV76GNER5pkFWuIezwInqUrmR1Al1Obz"
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}`).then((res) => {
            console.log(query);
            console.log('searched', res)
            setData(res.data.data)
        })
        
    }

    
    
    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
    }
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
       Insert Gif
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
          >
             
              <Typography sx={{}}>
                  <div className='search__gif'>
                    <TextField 
                      id="outlined-basic"
                      label="Search Gif here.."
                      variant="outlined"
                      onChange={handleChange}
                      />  
                      <Button onClick={handleSearch}  variant="contained">Search</Button>
                  </div>
                  
                 
                  <div className="gif__container">
                  {data.map((gif) => {
                      return (
                          <div key={gif.id}>
                              <img onClick={() => {
                                handleClose()
                                  handleGifClick(gif.images.downsized.url)
                              }} src={gif.images.downsized.url} width="100px" height="100px" />    
                        </div>  
                     )
                 })} 
                  </div>
                 
                  </Typography>
      </Popover>
    </div>
  );
}
