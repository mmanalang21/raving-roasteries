// create variables to store form elements
var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var shopSearchTerm = document.querySelector("#shop-search-term");
var shopContainerE1 = document.querySelector("#shop-container");
var placeid_json = [];
var map;
//test test
// create formSubmitHandler 
var formSubmitHandler = function(event) {
    event.preventDefault();
    var zipcode = parseInt(zipcodeInputEl.value.trim());

    if (zipcode && !isNaN(zipcode)) {
      getShopLocations(zipcode);

      // clear old content
      shopContainerE1.textContent = "Searching";
      zipcodeInputEl.value = "";
    } else {
      alert("please enter a zipcode");
    }
};

// fetch yelp API for coffee roasterie locations 

var getShopLocations = function(zipcode) {
    var apiUrl = "https://lit-plateau-00456.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=" + zipcode;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer KBzmBxFAETA5qqqjwL_4480ueocomgy36PFkX4uNsjl88SiYTDn2C6DzrHg6g4lWvlaowPB2KPjxzWuKnEHDglEvq49vEEu5zgXJzSmPpxY8Vxvg1Bygj-G_UTJiYHYx'
      }
    })
    .then(function(response) {
       // request successful
       if (response.ok) {
          // console.log(response);
       response.json().then(function(data) {
            console.log(data);
        
            var shops = data.businesses;
            var addresses = [];

            shops.forEach(function (shop){
              var address = [];
              
              address.push(shop.name);
              address.push(shop.location.address1);
              address.push(shop.location.address2);
              address.push(shop.location.city);
              address.push(shop.location.state);
              address.push(shop.location.zip_code);

              addresses.push(address.join(" "));
            });

            // Render Names of Cafes to Page
            displayShops(shops, zipcode);

            addresses.forEach(function(address){
              googleMapsApi(address);
            });
        });
      } 
    });
};

var googleMapsApi = function(address) {
  var mapsApiUrl = 
  "https://lit-plateau-00456.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + address + "&inputtype=textquery" + "&key=AIzaSyDDSQ7-2E776J2wfUyGQ7gac5SKdzZvUtc"

  fetch(mapsApiUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    // request successful
    if (response.ok) {
       // console.log(response);
    response.json().then(function(data) {
      var placeId = data.candidates[0].place_id;
      getMaps(placeId);
     });
   } 
  });
}

let counter = 0

var getMaps = function(placeId) {
  var mapsApiUrl = 
  "https://lit-plateau-00456.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyDDSQ7-2E776J2wfUyGQ7gac5SKdzZvUtc"

  fetch(mapsApiUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    // request successful
    if (response.ok) {
       // console.log(response);
    response.json().then(function(data) {
      var mapsUrl = data.result.url;

      // Render Names of Cafes to Page
      displayMapsUrls(mapsUrl, counter);
      counter++;
     });
   } 
  });
}

// create function to display titles of roasteries within a zipcode area 
var displayShops = function(shops, searchTerm) {
    shopContainerE1.textContent = "";
    shopSearchTerm.textContent = searchTerm;
    
    // create for loop over arrays
     for(var i = 0; i < shops.length; i++) {
      // format shop name
      var shopName = shops[i].name + " ";

      var titleEl = document.createElement("p");
      titleEl.textContent = shopName;
      titleEl.setAttribute("class", "shopName");

      var shopContainer = document.getElementById("shop-container");

      shopContainer.appendChild(titleEl);
    }
};

var displayMapsUrls = function(mapsUrl, counter) {
  var clickMapUrl = document.createElement("a");
  clickMapUrl.href = mapsUrl;
  clickMapUrl.setAttribute("target", "_blank")
  
  clickMapUrl.textContent = "Click Here to View Google Maps";

  var titles = document.getElementsByClassName("shopName");
    
  titles[counter].appendChild(clickMapUrl);
}

// create addEventListenrer to form container 
userFormEl.addEventListener("submit", formSubmitHandler);

// fetch google places API for nearest coffee roasterie location 

// function initMap() {
//    map = new google.maps.Map(document.getElementById("map"), {
//      center: { lat: -34.397, lng: 150.644 },
//      zoom: 8,
//    });
//  }

//  initMap();

//var getShopRadius = function() {
//    var apiUrl = "httpsforcoffeeroasteries" + shops + "httpsforlocations";
//    fetch(apiUrl).then(function(response) {
//        response.json().then(function(data) {
//            console.log(data);
//        });
//    });
//};

    // create a span element to hold coffee shop name
    //var nameEl = document.createElement("span");
    //nameEl.textContent = shopName;
    
    //append to the container 
    //shopEl.appendChild(nameEl);
    
    //append container to the DOM

// display map with nearest coffee roasterie locations

// create addEventListenrer to form container 
// userFormEl.addEventListener("submit", formSubmitHandler);

// GOOGLE PLACES API

// var addPlaceId = function(data) {
//   // var placeid_json = [{
//   //   "placeid": 'ChIJu6HrLMVWIkcRWHTA90kiueI',
//   //   "content": "   1   "
//   // }, {
//   //   "placeid": 'ChIJnXBuJ34zGUcRvt9FTKrPeeM',
//   //   "content": "   2   "
//   // }, {
//   //   "placeid": 'ChIJiwUNhqX7PEcRdJjYqzrWYjs',
//   //   "content": "   3   "
//   // }];
//   // var placeid = {
//   //   "placeid": data.candidates[0].place_id
//   // }

//   return placeid
// }

// var openedInfoWindow = null;
// var bounds = new google.maps.LatLngBounds();
// var map;

// function initialize() {
//   var latitude = 21.1202644,
//     longitude = 79.0418986,
//     radius = 8000,

//     center = new google.maps.LatLng(latitude, longitude),
//     mapOptions = {
//       center: center,
//       zoom: 10,

//       scrollwheel: false
//     };

//   map = new google.maps.Map(document.getElementById("map"), mapOptions);
//   setMarkers(center, radius, map);
// }

// function setMarkers(center, radius, map) {
//   var json = placeid_json;  
//   for (var i = 0, length = json.length; i < length; i++) {
//     var data = json[i];
//     createMarker(data, map);
//   }
// }

// function createMarker(placeId) {
//   var service = new google.maps.places.PlacesService(map);
//   service.getDetails({
//     placeId: placeId
//   }, function(result, status) {
//     if (status != google.maps.places.PlacesServiceStatus.OK) {
//       alert(status);
//       return;
//     }
//     var marker = new google.maps.Marker({
//       map: map,
//       place: {
//         placeId: placeId,
//         location: result.geometry.location
//       }
//     });
//     // bounds.extend(result.geometry.location);
//     // map.fitBounds(bounds);
//     // infoBox(map, marker, data, result);
//   });
// }

// // function infoBox(map, marker, data, result) {
// //   var infoWindow = new google.maps.InfoWindow();

// //   google.maps.event.addListener(marker, "click", function(e) {

// //     infoWindow.setContent(data.content);
// //     infoWindow.open(map, marker);
// //   });

// //   (function(marker, data) {

// //     google.maps.event.addListener(marker, "click", function(e) {

// //       infoWindow.setContent(data.content + "<br>" + result.name);
// //       infoWindow.open(map, marker);
// //     });
// //   })(marker, data);
// // }

// function initMap() {
//   const myLatLng = { lat: -25.363, lng: 131.044 };
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: myLatLng,
//   });
// }

// // function createMarker(placeId) {
// //   var service = new google.maps.places.PlacesService(map);
// //   service.getDetails({
// //     placeId: placeId
// //   }, function (result, status) {
// //       var marker = new google.maps.Marker({
// //         map: map,
// //         place: {
// //           placeId: result.place_id,
// //           location: result.geometry.location
// //         }
// //       });
// //     }
// //   )

//   // service.getDetails({
//   //     placeId: placeId
//   // }, function (result, status) {
//   //     var marker = new google.maps.Marker({
//   //         map: map,
//   //         place: {
//   //             placeId: placeId,
//   //             location: result.geometry.location
//   //         }
//   //     });
//   // });
// // }

// google.maps.event.addDomListener(window, 'load', initMap);