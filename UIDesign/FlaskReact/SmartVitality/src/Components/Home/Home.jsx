import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return(

        <div className="contain">
        <div className="NavBar">
        <Link to = "/">
          Home Page 
          </Link>
        <Link to="/SleepTrack">
             Sleep Tracking
          </Link>

        <Link to = "/DietTrack">
        Diet Tracking
        </Link>
        </div>

        <h1>Welcome To Smart Vitality Tracker with AI</h1>
        </ div>

    );
}

export default Home;