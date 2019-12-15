const axios = require("axios");
const cheerio = require("cheerio");
const extractData = require("./extractData");
const cleanStr = require("./cleanData");

const getActions = symbol => {
  return axios
    .get(
      `https://www1.nseindia.com/marketinfo/companyTracker/corpAction.jsp?symbol=${symbol}`
    )
    .then(({ data }) => {
      // console.log(data);
      if (data.includes("Nil")) return null;
      return cheerio.load(data);
    })
    .then($ => {
      if ($) {
        let info = extractData($, (ind, ele) => {
          if (ind === 0) return null;
          let cells = $(ele)
            .text()
            .split(":");
          if (cells.length >= 2) {
            let iOb = {};
            iOb[cleanStr(cells[0])] = cleanStr(cells.slice(1).join(":"));
            return iOb;
          } else {
            return null;
          }
        }).filter(Boolean);
        return info;
      } else {
        return "No data found!";
      }
    });
};

module.exports = getActions;
