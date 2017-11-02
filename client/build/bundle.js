/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var MapView = __webpack_require__(1);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(2);

var MapView = function(locations){
  this.initialize(locations);
}

MapView.prototype = {
  initialize: function(locations){
    var center = { lat: 54, lng: 2.5 };
    var zoom = 6;
    var mapDiv = document.querySelector("#main-map");
    var map = new MapWrapper(mapDiv, center, zoom);
    var infowindow = new google.maps.InfoWindow();


    locations.forEach(function(location){
      map.addMarker(location, infowindow);
    })

  }

}

module.exports = MapView;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype = {

  allDayAccess: function(event){
    if(event.ChargeDevice.Accessible24Hours === "false"){
      return "open 24 hours"
    }
    else{
      return "Not open 24 hours"
    }
  },

  addMarker: function(place, infowindow){
    var icon = {
          url: "https://cdn.pixabay.com/photo/2017/02/16/08/38/icon-2070748_960_720.png",
          scaledSize: new google.maps.Size(50, 50)
      };
      var marker = new google.maps.Marker({
        position: (place.ChargeDevice.ChargeDeviceLocation.Latitude,place.ChargeDevice.ChargeDeviceLocation.Longitude),
        map: this.googleMap,
        icon: icon
      })
      marker.addListener('click', function(event) {
        infowindow.close();
        infowindow.setContent("Name: " + event.ChargeDevice.ChargeDeviceName() + ", " + "Address: " + event.ChargeDevice.ChargeDeviceLocation.Address.Street() + " " + event.ChargeDevice.ChargeDeviceLocation.Address.PostCode() + ", " + MapWrapper.allDayAccess(event));
        infowindow.open(this.googleMap, marker);
      })
      this.markers.push(marker);
    }    
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map