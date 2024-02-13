function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(`error:${response.status}`);
        return;
      }

      response.json().then(function (data) {
        displayRandomCocktail(data);

        const btnItaliano = document.querySelector(".btnItaliano");
        btnItaliano.addEventListener("click", function () {
          let col = document.querySelector(".testo");
          col.innerHTML = data.drinks[0].strInstructionsIT;
        });

        const btnTedesco = document.querySelector(".btnTedesco");
        btnTedesco.addEventListener("click", function () {
          let col = document.querySelector(".testo");
          col.innerHTML = data.drinks[0].strInstructionsDE;
        });
      });
    })
    .catch(function (err) {
      console.log(`fetch error${err}`);
    });
}

function displayRandomCocktail(cocktail) {
  let cocktailRandom = cocktail.drinks[0].strDrink;
  console.log(cocktail.drinks[0]);

  let drinkSection = document.querySelector("#drinkSection");
  let drinkName = document.createElement("h3");
  drinkSection.innerHTML = "";
  drinkName.innerHTML = cocktailRandom;
  drinkSection.appendChild(drinkName);

  let img = document.createElement("img");
  img.className = "img-fluid";
  img.src = cocktail.drinks[0].strDrinkThumb;
  drinkSection.appendChild(img);

  for (let i = 1; i < 16; i++) {
    console.log(cocktail.drinks[0]["strIngredient" + i]);

    if (cocktail.drinks[0]["strIngredient" + i] == null) {
      break;
    }

    if (cocktail.drinks[0]["strMeasure" + i] == null) {
      break;
    }

    let ul = document.createElement("ul");
    ul.className = "list-group";
    let li = document.createElement("li");
    li.className = "list-group.item";
    li.innerHTML =
      cocktail.drinks[0]["strMeasure" + i] +
      `: ` +
      cocktail.drinks[0]["strIngredient" + i];
    ul.appendChild(li);
    drinkSection.appendChild(ul);

    let col = document.querySelector(".testo");
    col.innerHTML = cocktail.drinks[0].strInstructions;
  }
}

const btnRandom = document.querySelector(".btnRandom");
btnRandom.addEventListener("click", function () {
  getRandomCocktail();
});
