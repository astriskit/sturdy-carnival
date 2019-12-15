const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const getInfo = require("./getInfo");
const getActions = require("./getActions");
const app = express();

app.get("/api/search", async function(request, response) {
  try {
    let { symbol } = request.query;
    if (!symbol) throw new Error("No symbol found!");
    let data = {};
    let info = await getInfo(symbol);
    // let actions = await getActions(symbol);
    return response.json({ success: true, data: { info, actions:[] } });
  } catch (err) {
    console.log(err)
    return response.json({ message: err.message, success: false });
  }
});

app.get("/", (_, res) => res.json({ online: true }));

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
