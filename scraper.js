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
  body.split('<h2>').forEach(function(segment) {
    var class_id = tools.find_between(segment.replace("\n"," "), '<a id="', '"')
    if(class_id.match(/ctl00_ctl00_sbSearchBox_btnImageButton|Submissions/)) {
      // console.log("   :: skipping filler: " + class_id)
    } else {
      console.log(" :: recording: " + class_id);
      console.log("   seg: " + segment.slice(0,50) + "...");

    }
  });

});
