import Statistics from "./Statistics";
const continentsList = document.getElementById("continentsList");

continentsList.innerHTML = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  .map((e) => {
    return `<div onclick='getCounties("${e}")' class='continent'>${e}</div>`;
  })
  .join("");
Statistics();
