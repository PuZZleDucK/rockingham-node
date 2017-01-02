var sqlite3 = require("sqlite3");
var request = require('request')
var tools = require("./tools");

console.log("NodeJS scraper");
// Fields unavaliable: date_received, on_notice_from,
var db3 = new sqlite3.Database("data.sqlite");
db3.run("CREATE TABLE IF NOT EXISTS data (council_reference TEXT, address TEXT, description TEXT, info_url TEXT, comment_url TEXT, date_scraped DATE, on_notice_to DATE)");
opts = {
  method: "GET",
  url: "http://www.rockingham.wa.gov.au/Services/Town-planning-services/Town-planning-advertising#Submissions"
};
request(opts, function (error, response, body) {
  body.split('<h2>').forEach(function(segment) {
    var class_id = tools.find_between(segment.replace("\n"," "), '<a id="', '"')
    if(class_id.match(/ctl00_ctl00_sbSearchBox_btnImageButton|Submissions/)) {
      // console.log("   :: skipping filler: " + class_id)
    } else {
      var council_reference = "PD_" + tools.find_between(segment, 'PD_', '.pdf')
      console.log("Found council_reference: " + council_reference);
      var address1 = tools.find_between(segment, " - ", '</li>')
      address1 = tools.find_between(address1, ")", "</a>");
      var address2 = tools.find_between(segment, " - ", 'h2>')
      address2 = tools.find_between(address2, ")", "</");
      if(address1.length < address2.length) {
        address = address1 + ", WA";
      } else {
        address = address2 + ", WA";
      }
      description = tools.find_between(segment, 'The City has received an application seeking', 'Share your thoughts now');
      var description = description.replace(/<br \/>|<h4>|<\/p>|<p>|<\/li>|<li>|<\/ul>|<ul>|<\/strong>|<strong>|&nbsp;|\n/g," ").trim().replace(/&#39;/g, "'");
      var info_url = "http://www.rockingham.wa.gov.au/getmedia" + tools.find_between(segment, 'a href="/getmedia', 'pdf.aspx') + "pdf.aspx";
      comment_url1 = "mailto:customer" + tools.find_between(segment, 'mailto:customer', '">email</a></li>');
      comment_url2 = "mailto:customer" + tools.find_between(segment, 'mailto:customer', '">Email</a></li>');
      if(comment_url1.length < comment_url2.length) {
        comment_url = comment_url1;
      } else {
        comment_url = comment_url2;
      }
      date_scraped = Date.now();
      var on_notice_to = Date.parse(tools.find_between(segment, 'in writing to reach the Chief Executive Officer by no later than', '.').replace(/&nbsp;|<strong>|<\/strong>/g," ").trim());
      var qry = "SELECT * FROM data WHERE council_reference LIKE '" + council_reference + "'";
      db3.get(qry, function (err, rows) {
        if(rows){
          console.log("  Skipping dupe: " + council_reference);
        }else{
          console.log("  Storing: " + council_reference);
          tools.write_record_with_values([council_reference, address, description, info_url, comment_url, date_scraped, on_notice_to]);
        }
      });
    }
  });
});
