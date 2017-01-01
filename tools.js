var sqlite3 = require("sqlite3");

module.exports = {

  write_record_with_values: function(values){
    console.log("Write: " + values[0]);
    var db = new sqlite3.Database("data.sqlite");
    db.serialize(function() {
      // Create new table
      db.run("CREATE TABLE IF NOT EXISTS data (council_reference TEXT, address TEXT, description TEXT, info_url TEXT, comment_url TEXT, date_scraped DATE, date_received DATE, on_notice_from DATE, on_notice_to DATE)");
      // Insert a new record
      var statement = db.prepare("INSERT INTO data(council_reference, address, description, info_url, comment_url, date_scraped, date_received, on_notice_from, on_notice_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      statement.run("council_reference", "address", "description", "info_url", "comment_url", "11-10-1979", "11-10-1979", "11-10-1979", "11-10-1979");
      statement.finalize();
    });
    console.log("Write complete");
    return true;
  }


};
