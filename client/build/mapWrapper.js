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
