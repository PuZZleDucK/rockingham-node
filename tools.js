var sqlite3 = require("sqlite3");

module.exports = {

  write_record_with_values: function(values){
    console.log("   Write: " + values[0]);
    var db = new sqlite3.Database("data.sqlite");
    db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS data (council_reference TEXT, address TEXT, description TEXT, info_url TEXT, comment_url TEXT, date_scraped DATE, date_received DATE, on_notice_from DATE, on_notice_to DATE)");
      var statement = db.prepare("INSERT INTO data(council_reference, address, description, info_url, comment_url, date_scraped, date_received, on_notice_from, on_notice_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      statement.run(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8]);
      statement.finalize();
    });
    console.log("   Write complete");
    return true;
  },

  delete_data_table: function(){
    console.log("   Delete table");
    var db = new sqlite3.Database("data.sqlite");
    db.run("DROP TABLE 'data'");
    db.close();
    console.log("   Delete complete");
    return true;
  },

  delete_record_with_reference: function(reference){
    console.log("   Delete: " + reference);
    var db = new sqlite3.Database("data.sqlite");
    db.run("DELETE FROM data WHERE council_reference = '" + reference + "';");
    db.close();
    console.log("   Delete complete");
    return true;
  }

};
