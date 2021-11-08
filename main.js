const { google } = require("googleapis");
const keys = require("./sheets-331510-ffca6659a2ae.json");
const axios = require("axios");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected");
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const opt = {
    spreadsheetId: "1-g0bD_lDX2bTzFg3zFsJTmMeUZa1Eqmn-5M4sE_LG7o",
    range: "Data!A2:A100",
  };

  let response = await gsapi.spreadsheets.values.get(opt);
  let dataArray = response.data.values;

  console.log(dataArray);

  const elosAndRanks = await getResponse(dataArray);

  console.log(elosAndRanks);

  const updateOptions = {
    spreadsheetId: "1-g0bD_lDX2bTzFg3zFsJTmMeUZa1Eqmn-5M4sE_LG7o",
    range: "Data!B2",
    valueInputOption: "USER_ENTERED",
    resource: { values: elosAndRanks },
  };

  let res = await gsapi.spreadsheets.values.update(updateOptions);
}

const getResponse = async (records) => {
  let elosAndRanks = [];
  try {
    for (record of records) {
      const response = await axios.get(
        `https://game-api.axie.technology/mmr/${record}`
      );
      let elo = response.data[0].items[1].elo;
      let rank = response.data[0].items[1].rank;
      elosAndRanks.push([elo, rank]);
    }
    return elosAndRanks;
  } catch (err) {
    console.log(err);
  }
};
