import React, { useState } from "react";
import MealList from "./MealList";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  const API_KEY = process.env.REACT_APP_API_KEY;

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;