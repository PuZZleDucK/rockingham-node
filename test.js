var tools = require("./tools.js");

console.log("NodeJS tools: " + tools);
console.log("NodeJS tests");



console.log("Test DB write");
tools.write_record_with_values(["council_reference", "address", "description", "info_url", "comment_url", "date_scraped", "date_received", "on_notice_from", "on_notice_to"]);






console.log('test record written');
