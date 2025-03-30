import React, { useState } from "react";
import axios from "axios";
import "./Diet.css";
import NavBar from '../NavBar/NavBar'

function Diet() {
  const [dropdown, setDropdown] = useState([]);
  const [data, setData] = useState({ food: "", serving: "" });
  const [food, setFood] = useState("");
  const [out, setOut] = useState({}); // Changed to an object

  const fetchOutput = async () => {
    try {
      const response = await axios.post("http://localhost:5000/diet/output", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Server response:", response.data);

      // Ensure response is an object
      if (typeof response.data === "object" && response.data !== null) {
        setOut(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setOut({}); // Reset if invalid response
      }
    } catch (error) {
      console.error("Error fetching output:", error);
    }
  };

  const fetchFoodSuggestions = async (query) => {
    if (!query) {
      setDropdown([]);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/diet", { food: query }, {
        headers: { "Content-Type": "application/json" },
      });
      setDropdown(response.data.results);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "food") {
      setFood(value);
      fetchFoodSuggestions(value);
    }
  };

  const handleFoodSelection = (selectedFood) => {
    setFood(selectedFood);
    setData({ ...data, food: selectedFood });
    setDropdown([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", data);
  };

  return (
    <>
      <NavBar/>

      <form className="dietContainer" onSubmit={handleSubmit}>
        <p>Enter what you ate:</p>
        <input 
          type="text" 
          name="food" 
          value={food} 
          onChange={handleInputChange} 
        />
<div className="dropper">
{dropdown.length > 0 ? (
          <ul className="dropdown">
            {dropdown.map((value, index) => (
              <li 
                key={index}  className="listItem"
                onClick={() => handleFoodSelection(value)}
                style={{ cursor: "pointer", borderRadius: "10px", marginBottom: "10px" }}
              >
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <div className="listing"><p>Search Results will appear here</p></div>
        )}
<br /><br />
</div>

        <p>Enter your servings (in g)</p>
        <input 
          type="number" 
          name="serving" 
          value={data.serving} 
          onChange={handleInputChange} 
        />

        <button type="submit" onClick={fetchOutput}>Submit</button>
              {/* Render output only if `out` is not empty */}
      {Object.keys(out).length > 0 && (
        <div>
          <p>Output</p>
          <ul>
            {Object.entries(out).map(([key, value], idx) => (
              <li key={idx}>
                <strong>{key}:</strong> {JSON.stringify(value)}
              </li>
            ))}
          </ul>
        </div>

      )}
      </form>


    </>
  );
}

export default Diet;
