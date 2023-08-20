import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div id='home-container'>

      <div id='home-top'>
        <div id='home-left'>
          <h1>BOOKIFY....</h1>
        </div>

        <div id='home-right'>
          <h3>
            Welcome to our online literary haven,
          </h3>
          <h3>
            where the magic of words comes alive! Explore a curated collection of captivating books that span genres and eras, inviting you on journeys beyond imagination....
          </h3>
          <Button
            variant='contained'
            sx={{
              color: "Black",
              bgcolor: "white"
            }}
            onClick={() => navigate("/books")} > Here We Go... </Button>
        </div>
      </div>
      <div>

      </div>


    </div>
  )
}

export default HomePage