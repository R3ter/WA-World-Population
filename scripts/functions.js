const countriesList = document.getElementById("countriesList");
async function getCounties(continent) {
  startLoading();
  const data = await fetch(
    "https://restcountries.com/v3.1/region/" + continent + "?fields=name"
  ).then((e) => e.json());
  countriesList.innerHTML = data
    .map((e) => {
      return `<div class='continent'>${e.name.official}</div>`;
    })
    .join("");
  endLoading();
}
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
