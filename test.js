var tools = require("./tools.js");
var util = require("util");
var async = require('async');

console.log("NodeJS tests");

console.log("Test DB write");
tools.write_record_with_values(["council_reference", "address", "description", "info_url", "comment_url", "11-10-1979", "11-10-1979", "11-10-1979", "11-10-1979"]);
tools.write_record_with_values(["council_reference2", "address2", "description2", "info_url2", "comment_url2", , "11-10-1979", "11-10-1979", "11-10-1979", "11-10-1979"]);
console.log('  test record written');

setTimeout(function() {
    console.log('...wait');

    console.log("Test ROW delete");
    tools.delete_record_with_reference("council_reference2");
    console.log('  test record Deleted');

    setTimeout(function() {
      console.log('...wait2');
      console.log("Test DB delete");
      tools.delete_data_table();
      console.log('  test db Deleted');
  }, 6000);

}, 3000);

// text = tools.get_text_from_path("http://www.puzzleduck.org", "/");
// check text contains "Welcome to PuZZleDucK.org"
// console.log("Path to text: " + util.inspect(text, {showHidden: false, depth: null}) + "...");

console.log("NodeJS tests complete");
