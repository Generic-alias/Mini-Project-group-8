import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
function Home(){
    return(
        <>
        <h1>Welcome To Smart Vitality Tracker with AI</h1>
        <h3>Select what you would prefer to do:</h3>
        <Link to = "/">
          <p>Home Page</p>
         
          </Link>
        <Link to="/SleepTrack">
            <p> Sleep Tracking</p>
          </Link>

          <Link to = "/">
          <p>Diet Tracking</p>
         
          </Link>
        </>
    );
}

export default Home;