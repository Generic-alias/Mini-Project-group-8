import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
function Home(){
    return(
      <div>
      <Link to="/SleepTrack" className="NavBar NavBar_b">
                   Sleep Tracking
                </Link>
              <Link to = "/DietTrack" className="NavBar NavBar_c">
              Diet Tracking
      </Link>

        <h1>Welcome To Smart Vitality Tracker with AI</h1>
        </ div>

    );
}

export default Home;