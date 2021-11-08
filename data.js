// axios
//   .get("https://game-api.axie.technology/mmr/", {
//     params: {
//       client_id: d95d8873017563fdf9635bc26c908d4ce4f052b4,
//     },
//   })
//   .then(function (response) {
//     console.log(response);
//   });

// let cars = [
//     {
//       "color": "purple",
//       "type": "minivan",
//       "registration": new Date('2017-01-03'),
//       "capacity": 7
//     },
//     {
//       "color": "red",
//       "type": "station wagon",
//       "registration": new Date('2018-03-03'),
//       "capacity": 5
//     },
//     {
//       ...
//     },
//     ...
//   ]

const axios = require("axios");

async function getData() {
  try {
    const res = await axios.get(
      "https://game-api.axie.technology/mmr/0a9cd64afdd4757d39f10ef389466d447dbe083c"
    );
    let dataItems = res.data[0].items;
    // console.log(dataItems);

    let id = dataItems.filter(
      (item) => item.client_id === "0a9cd64afdd4757d39f10ef389466d447dbe083c"
    );
    // console.log(id);
    let Elo = id[0].elo;
    console.log(Elo);
  } catch (error) {
    console.error(error);
  }
}

getData();
