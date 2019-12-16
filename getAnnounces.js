const axios = require("axios");
const cheerio = require("cheerio");
const extractData = require("./extractData");

const getAnnounces = symbol => {
  return axios
    .get(
      `https://www1.nseindia.com/marketinfo/companyTracker/corpAnnounce.jsp?symbol=${symbol}`
    )
    .then(({ data }) => {
      // console.log(data);
      if (data.includes("Nil")) return null;
      return cheerio.load(data);
    })
    .then($ => {
      if ($) {
        let info = extractData($)
          .filter(Boolean)
          .map(data =>
            data
              .trim()
              .substr(1)
              .trimStart()
          );
        return info;
      } else {
        return null;
      }
    });
};

module.exports = getAnnounces;
