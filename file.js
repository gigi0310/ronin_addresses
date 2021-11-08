// const fs = require("fs");
const fs = require("fs/promises");
const parse = require("csv-parse/lib/sync");
const axios = require("axios");
const { createObjectCsvWriter } = require("csv-writer");

const csvWriter = createObjectCsvWriter({
  path: "output.csv",
  header: [
    { id: "RONIN_ADDRESS", title: "RONIN_ADDRESS" },
    { id: "Elo", title: "Elo" },
    { id: "Rank", title: "Rank" },
  ],
});

fs.readFile("input.csv").then(async (data) => {
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  let ps = [];

  for (record of records) {
    const promise = Promise.resolve(record).then(function (row) {
      let param = row["RONIN_ADDRESS"];
      let customerId = param.split(":")[1];
      const p = axios
        .get(`https://game-api.axie.technology/mmr/${param}`)
        .then(function (response) {
          items = response.data[0].items.filter(
            (item) => item.client_id === `0x${customerId}`
          );
          row.Elo = items[0].elo;
          row.Rank = items[0].rank;
          return row;
        });
      return p;
    });
    ps.push(promise);
  }
  return Promise.all(ps)
    .then((csvData) => {
      csvWriter.writeRecords(csvData);
    })
    .catch((error) => console.log(error));
});
