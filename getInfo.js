const axios = require("axios");
const cheerio = require("cheerio");
const extractData = require("./extractData");
const cleanStr = require("./cleanData");

const getInfo = symbol => {
  return axios
    .get(
      `https://www1.nseindia.com/marketinfo/companyTracker/compInfo.jsp?symbol=${symbol}&series=EQ`
    )
    .then(({ data }) => {
      // console.log("info--", data);
      if (data.includes("Nil")) return null;
      return cheerio.load(data);
    })
    .then($ => {
      if ($) {
        return extractData($, (i, el) => {
          if (i === 0) {
            return { attrib: "Name", value: cleanStr($(el).text()) };
          } else {
            let iob = {};
            let texts = $(el)
              .text()
              .split(":");
            if (texts.length >= 2) {
              iob["attrib"] = cleanStr(texts[0]);
              iob["value"] = cleanStr(texts.slice(1).join(":"));
            } else {
              iob = null;
            }
            return iob;
          }
        }).filter(Boolean);
      } else {
        return null;
      }
    });
};

module.exports = getInfo;
