const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search_result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'e0eeb355';
const APP_kye = 'f78a90ceb5437da5d9cf83400d59e164';

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	console.log(searchQuery);
	fetchAPI();
});

async function fetchAPI() {
	const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_kye}`;
	const response = await fetch(baseURL);
	const data = await response.json();
	generateHtml(data.hits);
	console.log(data);
}

function generateHtml(results) {
	let generatedHtml = '';
	results.map((result) => {
		generatedHtml += `
		<div class="item">
			<img src="${result.recipe.image}" alt="" />
				<div class="flex_container">
					<h1 class="title">${result.recipe.label}</h1>
							<a class="view_button" href="${
								result.recipe.url
							}" target="_blank">View Recipe</a>
				</div>
				<p class="item_data">Calories: ${result.recipe.calories.toFixed(2)}</p>
				<p class="item_data">Diet Label: ${
					result.recipe.dietLabels.length > 0
						? result.recipe.dietLabels
						: 'No Data Found'
				}</p>

				</div>
		`;
	});
	searchResultDiv.innerHTML = generatedHtml;
}