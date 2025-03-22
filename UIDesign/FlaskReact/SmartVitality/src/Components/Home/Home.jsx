import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './Home.css'
=======
import './Home.css';
>>>>>>> f5c5b3530557eaf11675af8964dc820a76cdaf23
function Home(){
    return(
        <div>
        <div className="NavBar">
        <Link to = "/">
          Home Page 
          </Link>
        <Link to="/SleepTrack">
             Sleep Tracking
          </Link>
<<<<<<< HEAD
        <Link to = "/DietTrack">
        Diet Tracking
        </Link>
        </div>
        <h1>Welcome To Smart Vitality Tracker with AI</h1>
        </ div>
=======

          <Link to = "/">
          <p>Diet Tracking</p>
         
          </Link>
        </>
>>>>>>> f5c5b3530557eaf11675af8964dc820a76cdaf23
    );
}

export default Home;