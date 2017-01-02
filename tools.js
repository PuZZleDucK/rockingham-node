var http = require('http');
var request = require('request')
var sqlite3 = require("sqlite3");
var util = require("util");

module.exports = {

  find_between: function(text, start_marker, end_marker) {
    var start = text.indexOf(start_marker) + start_marker.length;
    var end = text.indexOf(end_marker, start);
    var find = text.slice(start, end);
    return find;
  },

  get_text_from_path: function(host, path) {
    var ret;
    opts = {
      method: "GET",
      url: host + path
    };
    ret = request(opts, function (error, response, body) {
      ret = body;
      return body;
    });
    return ret.getHeader;
  },

  write_record_with_values: function(values){
    var db = new sqlite3.Database("data.sqlite");
    db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS data (council_reference TEXT, address TEXT, description TEXT, info_url TEXT, comment_url TEXT, date_scraped DATE, on_notice_to DATE)");
      var statement = db.prepare("INSERT INTO data(council_reference, address, description, info_url, comment_url, date_scraped, on_notice_to) VALUES (?, ?, ?, ?, ?, ?, ?)");
      statement.run(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
      statement.finalize();
    });
    console.log("  Write complete");
    return true;
  },

  delete_data_table: function(){
    console.log("   Delete table");
    var db = new sqlite3.Database("data.sqlite");
    db.run("DROP TABLE 'data'");
    db.close();
    return true;
  },

  delete_record_with_reference: function(reference){
    console.log("   Delete: " + reference);
    var db = new sqlite3.Database("data.sqlite");
    db.run("DELETE FROM data WHERE council_reference = '" + reference + "';");
    db.close();
    return true;
  }

};
