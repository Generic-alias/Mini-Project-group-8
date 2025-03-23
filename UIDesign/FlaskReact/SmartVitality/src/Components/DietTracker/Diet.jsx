import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Diet(){
    return(
        <>
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
            <form className="container">
            <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Diet;