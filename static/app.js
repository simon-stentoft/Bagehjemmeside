//Getting random recipe from https://www.themealdb.com/api/json/v1/1/random.php

async function getRandomRecipe() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const recipes = data.meals;
    console.log(recipes);

    let html = "";
    recipes.forEach((recipe) => {
      console.log(recipe);
      html += `
      <div id="${recipe.idMeal}" class=meal">
        <div>${recipe.strMeal}</div>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">  
      </div>
      `;
    });
    document.querySelector("#randomMealContainer").innerHTML = html;
  } catch (error) {
    console.error("Error:", error);
  }
}

getRandomRecipe();
