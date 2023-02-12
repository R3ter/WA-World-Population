const continentsList = document.getElementById("continentsList");

continentsList.innerHTML = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  .map((e) => {
    return `<div onclick='getCounties("${e}")' class='continent'>${e}</div>`;
  })
  .join("");

const loading = document.getElementById("loading");
const startLoading = () => {
  loading.style.display = "flex";
};
const endLoading = () => {
  loading.style.display = "none";
};
endLoading();
const changeTheme = (event) => {
  localStorage.setItem("whiteMode", event.target.checked);
  setTheme(event.target.checked);
};
const setTheme = (bool) => {
  if (bool) {
    document.documentElement.style.setProperty(
      "--background",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background-white"
      )
    );
    document.documentElement.style.setProperty(
      "--fontColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--fontColor-white"
      )
    );
    document.documentElement.style.setProperty(
      "--primeColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primeColor-white"
      )
    );
  } else {
    document.documentElement.style.setProperty(
      "--background",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background-black"
      )
    );
    document.documentElement.style.setProperty(
      "--fontColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--fontColor-black"
      )
    );
    document.documentElement.style.setProperty(
      "--primeColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primeColor-black"
      )
    );
  }
};
setTheme(localStorage.getItem("whiteMode") === "true");
if (localStorage.getItem("whiteMode") === "true") {
  const toggleMode = document.getElementById("toggleMode");
  toggleMode.checked = true;
}
