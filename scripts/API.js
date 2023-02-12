const PopulationAPI = "https://countriesnow.space/api/v0.1/countries/";
const continentPopulationAPI = "https://restcountries.com/v2/region/";
const CountryAPI = "https://restcountries.com/v2/region/";
const CitiesAPI = "https://countriesnow.space/api/v0.1/countries/state/cities";

async function getCounties(continent) {
  startLoading();
  getContinentPopulation(continent);
  const data = await fetch(CountryAPI + continent + "?fields=name").then((e) =>
    e.json()
  );
  countriesList.innerHTML = data
    .map((e) => {
      return `<div onclick='getCountryPopulation("${e.name}")' class='continent'>${e.name}</div>`;
    })
    .join("");
  endLoading();
}

// async function getCities(country) {
//   startLoading();
//   console.log(country);
//   const data = await fetch(CitiesAPI, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: {
//       country: "Nigeria",
//       state: "Lagos",
//     },
//   }).then((e) => e.json());
//   console.log(data);
//   countriesList.innerHTML = data.data
//     .map((e) => {
//       console.log(e);
//       return `<div onclick='getCountryPopulation("${e.name.official}")' class='continent'>${e.name.official}</div>`;
//     })
//     .join("");
//   endLoading();
// }
async function getContinentPopulation(continent) {
  const localData = localStorage.getItem(continent);
  let data;
  if (localData) {
    data = JSON.parse(localData);
  } else {
    data = await fetch(continentPopulationAPI + continent).then((e) =>
      e.json()
    );
    localStorage.setItem(continent, JSON.stringify(data));
  }

  new Statistics({
    labels: data.map((e) => e.name),
    datasets: [
      {
        label: "Population",
        data: data.map((e) => e.population | 0),
      },
      {
        label: "Number of Neighbors",
        data: data.map(() => 0),
      },
    ],
  });
}
let lastData;
async function getCountryPopulation(country) {
  startLoading();
  const localData = localStorage.getItem(country);
  let data;
  if (localData) {
    data = JSON.parse(localData);
  } else {
    data = await fetch(PopulationAPI + "/population", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country.toLowerCase(),
      }),
    })
      .then(async (e) => {
        if (!lastData) lastData = (await e.json()).data.populationCounts;
        return (await e.json()).data.populationCounts;
      })
      .catch(async () => {
        if (!lastData)
          return await fetch(PopulationAPI + "/population", {
            method: "POST",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "india",
            }),
          }).then(async (e) => (await e.json()).data.populationCounts);
        return lastData;
      });
    localStorage.setItem(country, JSON.stringify(data));
  }
  new Statistics({
    labels: data.map((e) => e.year),
    datasets: data.map((e) => ({
      label: e.year,
      data: data.map((e) => e.value),
    })),
  });
  endLoading();
}
