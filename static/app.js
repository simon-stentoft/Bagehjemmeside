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

      let ingredients = "";
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (
          ingredient &&
          ingredient.trim() !== "" &&
          measure &&
          measure.trim() !== ""
        ) {
          ingredients += `<p>${ingredient}: ${measure}</p>`;
        }
      }

      html += `
      <div id="${recipe.idMeal}" class="recipe">
        <h1>${recipe.strMeal}</h1>
        <img src="${recipe.strMealThumb}" id="imgRandomRecipe" alt="${recipe.strMeal}">
        <p>${recipe.strArea} dish</p>
        <h2>Instructions</h2>
        <p>${recipe.strInstructions}</p>
        <h3>Ingredients</h3>
        ${ingredients}
      </div>
      `;
    });
    document.querySelector("#randomMealContainer").innerHTML = html;
  } catch (error) {
    console.error("Error:", error);
  }
}
getRandomRecipe();

async function getPosts() {
  try {
    const response = await fetch("/api/v1/posts");
    const data = await response.json();
    const posts = data.posts;

    let html = "";
    posts.forEach((post) => {
      console.log(post);
      html += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.note}</p>
        <p>Skrevet af ${post.user_name}</p>
      </div>
      `;
    });
    document.querySelector("#commentContainer").innerHTML = html;
  } catch (error) {
    console.error("Error:", error);
  }
}
getPosts();
