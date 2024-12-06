

    // script.js
document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    getRecipes(ingredients);
});

async function getRecipes(ingredients) {
    const appId = 'e5b9f238';
    const appKey = 'ed6eb2c0e86998c7da37688c359530c2';
    
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImg = document.createElement('img');
        recipeImg.src = recipe.image;
        recipeCard.appendChild(recipeImg);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.label;
        recipeCard.appendChild(recipeTitle);

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.url;
        recipeLink.textContent = 'View Recipe';
        recipeLink.target = '_blank';
        recipeCard.appendChild(recipeLink);

        recipesDiv.appendChild(recipeCard);
    });
}
