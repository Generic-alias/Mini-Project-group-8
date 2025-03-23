import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './Home.css';
=======
import './Home.css'
>>>>>>> d62e97b6fb397d91c0e10446c21137f22e6fbaa2
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

          <Link to = "/">
          <p>Diet Tracking</p>
         
          </Link>
        </>
=======
        <Link to = "/DietTrack">
        Diet Tracking
        </Link>
        </div>
        <h1>Welcome To Smart Vitality Tracker with AI</h1>
        </ div>
>>>>>>> d62e97b6fb397d91c0e10446c21137f22e6fbaa2
    );
}

export default Home;