import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
function NavBar(){
    return(
        <div className="NavBar">
        <Link to = "/" className="NavBar NavBar_a">
          Home Page 
          </Link>
        <Link to="/SleepTrack" className="NavBar NavBar_b">
             Sleep Tracking
          </Link>
        <Link to = "/DietTrack" className="NavBar NavBar_c">
        Diet Tracking
        </Link>
        </div>
    )
}

export default NavBar;