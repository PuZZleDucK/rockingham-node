var request = require('request')
var tools = require("./tools");

console.log("NodeJS scraper");
// Fields unavaliable: date_received, on_notice_from,

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
      var council_reference = "PD_" + tools.find_between(segment, 'PD_', '.pdf')
      console.log("   council_reference: " + council_reference);
      var address1 = tools.find_between(segment, " - ", '</li>')
      address1 = tools.find_between(address1, ")", "</a>");
      var address2 = tools.find_between(segment, " - ", 'h2>')
      address2 = tools.find_between(address2, ")", "</");
      if(address1.length < address2.length) {
        address = address1 + ", WA";
      } else {
        address = address2 + ", WA";
      }
      console.log("   address: " + address);
      description = tools.find_between(segment, 'The City has received an application seeking', 'Share your thoughts now');
      var description = description.replace(/<br \/>|<h4>|<\/p>|<p>|<\/li>|<li>|<\/ul>|<ul>|<\/strong>|<strong>|&nbsp;|\n/g," ").trim().replace(/&#39;/g, "'");
      console.log(" description: '" + description + "'");
      var info_url = "http://www.rockingham.wa.gov.au/getmedia" + tools.find_between(segment, 'a href="/getmedia', 'pdf.aspx') + "pdf.aspx";
      console.log("   info_url: " + info_url);
      comment_url1 = "mailto:customer" + tools.find_between(segment, 'mailto:customer', '">email</a></li>');
      comment_url2 = "mailto:customer" + tools.find_between(segment, 'mailto:customer', '">Email</a></li>');
      if(comment_url1.length < comment_url2.length) {
        comment_url = comment_url1;
      } else {
        comment_url = comment_url2;
      }
      console.log("   comment_url: " + comment_url);
      date_scraped = Date.now();
      console.log("   date_scraped: " + date_scraped);
      var on_notice_to = Date.parse(tools.find_between(segment, 'in writing to reach the Chief Executive Officer by no later than', '.').replace(/&nbsp;|<strong>|<\/strong>/g," ").trim());
      console.log("   on_notice_to: " + on_notice_to);
      tools.write_record_with_values([council_reference, address, description, info_url, comment_url, date_scraped, on_notice_to]);

    }
  });

});
