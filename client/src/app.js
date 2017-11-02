var MapView = require("./views/mapView");

var app = function() {
  var mapUrl = "http://localhost:3000/api/map";
  makeRequest(mapUrl, mapRequestComplete);
};

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var mapRequestComplete = function() {
  if(this.status !== 200) return;
    var jsonString = this.responseText;
    var mapList = JSON.parse(jsonString);
    var ui = new MapView(mapList);
};

window.addEventListener("load", app);