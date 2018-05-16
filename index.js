const API_KEY = "AIzaSyBX67Dvyft_rpGa3HoXeeGfGnZL4ATNrEA";
const NHOOD_NAMES = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
var map;
var ny_coodinates = { lat: 40.730610, lng: -73.935242};
var ny_marker;
var bro_coodinates = {lat: 40.650002, lng: -73.949997};
var bro_marker;
var directionsService;
var directionsRenderer;
var triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 40.774, lng: -87.190},
          {lat: 25.774, lng: -80.190}
        ];
var bermuda;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: ny_coodinates
    });
    
        ny_marker = new google.maps.Marker({
        position: ny_coodinates,
        map: map
    });
    
        bro_marker = new google.maps.Marker({
        position: bro_coodinates,
        map: map
    });
    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    markerEvents(bro_marker);
    
}

function markerEvents(marker){
    
    if(marker != "undefined"){
        
        marker.addListener("click", function(){
        getRoute();
            
        });
        
    }
    
}

function getRoute(){
    
    var request = {
        
        origin: ny_marker.position,
        destination: bro_marker.position,
        travelMode: 'DRIVING'
        
    }

    directionsRenderer.setMap(map);
    directionsService.route(request, function(result, status){
        
        if(status == "OK"){
            
            directionsRenderer.setDirections(result);
            
        }
        
    });
    
}

$(document).ready(function(){
    
    var data = $.get(NHOOD_NAMES, function(){})
    .done(function(){
        
        console.log(data);
        
    })
    
})