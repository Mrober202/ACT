var seeds = require("../../seeds.js");

var MapQuery = function() {
};

MapQuery.prototype = {
  allData: function(callback) {
    // var collection = new XMLHttpRequest();
    // collection.overrideMimeType("application/json");
    // collection.open("GET", Seeds, true);
    // collection.onreadystatechange = function() {
    //   if(collection.status == "200") {
    //     callback(collection.responseText);
    //   }
    // };
    // collection.send(null);

    return seeds;
  }
}

module.exports = MapQuery;