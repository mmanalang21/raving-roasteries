// create variables to store form elements
var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");

// create formSubmitHandler 
var formSubmitHandler = function() {

}

// fetch yelp API for coffee roasterie locations 

var getShopLocations = function(zipcode) {
    var apiUrl = "https://api.yelp.com/v3/businesses/search?term=coffee&location=91105" + zi;
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

// fetch google places API for nearest coffee roasterie location 

//function initMap() {
//    map = new google.maps.Map(document.getElementById("map"), {
//      center: { lat: -34.397, lng: 150.644 },
//      zoom: 8,
//    });
//  }

//var getShopRadius = function() {
//    var apiUrl = "httpsforcoffeeroasteries" + shops + "httpsforlocations";
//    fetch(apiUrl).then(function(response) {
//        response.json().then(function(data) {
//            console.log(data);
//        });
//    });
//};

// create function to display top 5 coffee roasteries 

// create for loop over arrays
    // for(var i = 0; i < shop.length; i++) {

    //}

    // create a span element to hold coffee shop name
    var nameEl = document.createElement("span");
    nameEl.textContent = shopName;
    
    //append to the container 
    shopEl.appendChild(nameEl);
    
    //append container to the DOM

// display map with nearest coffee roasterie locations

// create addEventListenrer to form container 
userFormEl.addEventListener("submit", formSubmitHandler);