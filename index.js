let page = 1;
const starwars = (p = 0) => {
    document.getElementById("load-names").style.display = "block";
    setTimeout(1000);
    page += p;
    document.getElementById("names-back").style.display = page <= 1 ? "none" : "block";
    document.getElementById("names-forward").style.display = page >= 9 ? "none" : "block";
    document.getElementById("names-buttons").innerHTML = "";
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((fetch_to_json) => fetch_to_json.json())
      .then((json_to_data) =>
        json_to_data.results.forEach((self) => {
          const character = create("button");
          character.innerText = self.name;
          character.classList.add("character");
          document.getElementById("names-buttons").appendChild(character);

          character.addEventListener("click", () => {
            const info = document.getElementById("info");
            info.innerHTML = `<h2>${self.name}</h2>
                <li>Height: ${self.height}cm</li>
                <li>Mass: ${self.mass}kg</li>
                <li>Hair color: ${self.hair_color}</li>
                <li>Skin color: ${self.skin_color}</li>
                <li>Eye color: ${self.eye_color}</li>
                <li>Birth year: ${self.birth_year}</li>
                <li>Gender: ${self.gender}</li>`;

            fetch(self.homeworld)
              .then((fetch_to_json) => fetch_to_json.json())
              .then(
                (self) =>
                  (info.innerHTML += `<h2>Born on planet ${self.name}</h2>
                <li>Rotation period: ${self.rotation_period}cm</li>
                <li>Orbital period: ${self.orbital_period}kg</li>
                <li>Planet diameter: ${self.diameter}</li>
                <li>Climate: ${self.climate}</li>
                <li>Gravity: ${self.gravity}</li>
                <li>Terrain: ${self.terrain}</li>
                <li>Population: ${self.population}</li>`)
              )
              .catch((error) => console.error(error));
          });
        })
      )
      .then(() => (document.getElementById("load-names").style.display = "none"))
      .catch((error) => console.error(error));
  },
  create = (type_of_element) => document.createElement(type_of_element);

starwars();

document.getElementById("names-forward").addEventListener("click", () => starwars(1));
document.getElementById("names-back").addEventListener("click", () => starwars(-1));
