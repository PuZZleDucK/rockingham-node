var request = require('request')
var tools = require("./tools");

console.log("NodeJS scraper");

// Url: http://www.rockingham.wa.gov.au/Services/Town-planning-services/Town-planning-advertising#Submissions

// Fields: council_reference, address, description, info_url, comment_url, date_scraped
// Bonus: date_received, on_notice_from, on_notice_to


opts = {
  method: "GET",
  url: "http://www.rockingham.wa.gov.au/Services/Town-planning-services/Town-planning-advertising#Submissions"
};
ret = request(opts, function (error, response, body) {
  console.log(":: request got: " + body)
  // search for '<h2><a id="'
  //   and filter out id == 'Submissions'
});
