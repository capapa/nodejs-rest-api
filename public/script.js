const btnSubmit = document.getElementById("btn-submit");
const listHuman = document.getElementById("list-human");
const lng = document.getElementById("lng");
const lat = document.getElementById("lat");
const form = document.getElementById("search");

btnSubmit.addEventListener("click", (e) => {
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    e.preventDefault();

    fetch(`/api/humans?lng=${lng.value}&lat=${lat.value}`)
      .then((data) => data.json())
      .then((humans) => {
        console.log(humans);
        if (!humans.length) {
          listHuman.innerHTML =
            '<li><span class=false></span><span class="name">not found humans within a radius of about 100 km</span></li>';
        } else {
          listHuman.innerHTML = "";

          humans.map((human, index) => {
            listHuman.innerHTML += `
                        <li key=${index}>
                            <span class=${human.available}></span>
                            <span class="name">${human.name}</span>
                            <span class="age">${human.age}</span>
                            <span class="dist">${Math.floor(
                              human.distance / 1000
                            )} km</span>
                        </li>`;
          });
        }
      });
  }
});
