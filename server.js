const express = require("express");
const getInfo = require("./getInfo");
const getActions = require("./getActions");
const getAnnounces = require("./getAnnounces");
const app = express();

app.get("/api/search", async function(request, response) {
  try {
    let { symbol } = request.query;
    if (!symbol) throw new Error("No symbol found!");
    let info = await getInfo(symbol);
    let actions = await getActions(symbol);
    let announcements = await getAnnounces(symbol);
    return response.json({
      success: true,
      data: { info, actions, announcements }
    });
  } catch (err) {
    return response.json({ message: err.message, success: false });
  }
});

app.get("/", (_, res) => res.json({ online: true }));

const listener = app.listen(process.env.PORT || 5000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
