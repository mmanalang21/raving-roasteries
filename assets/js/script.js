// create variables to store form elements
var userFormEl = document.querySelector("#user-form");
var zipcodeInputEl = document.querySelector("#zipcode");
var shopSearchTerm = document.querySelector("#shop-search-term");
var shopContainerE1 = document.querySelector("#shop-container");

// create formSubmitHandler 
var formSubmitHandler = function(event) {
    event.preventDefault();
    var zipcode = parseInt(zipcodeInputEl.value.trim());

    if (zipcode && !isNaN(zipcode)) {
      getShopLocations(zipcode);

      // clear old content
      shopContainerE1.textContent = "";
      zipcodeInputEl.value = "";
    } else {
      alert("please enter a zipcode");
    }
};

// fetch yelp API for coffee roasterie locations 

var getShopLocations = function(zipcode) {
    var apiUrl = "https://api.yelp.com/v3/businesses/search?location=" + zipcode;
    fetch(apiUrl).then(function(response) {

       // request succeful
       if (response.ok) {
           console.log(response);
       response.json().then(function(data) {
            console.log(data);
            displayShops(data, zipcode);
        });
      } 
    });
};

// create function to display top 5 coffee roasteries 
var displayShops = function(shop, searchTerm) {
    shopSearchTerm.textContent = searchTerm;
    
    // create for loop over arrays
     for(var i = 0; i < shop.length; i++) {
      // format shop name
      var shopName = shop[i].locations + "/" + shop[i].name;

    // create a container for each shop
    var shopEl = document.createElement("a");
    shopEl.classList = "list-item flex-row justify-space-between align-center";
    shopEl.setAttribute("href", "./single-shop.html?shop=" + shopName);

    // create a span element to hold shop name
    var titelEl = document.createElement("span");
    titelEl.textContent = shopName;

    // append to container
    shopEl.appendChild(titelEl);
    }
    
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

    // create a span element to hold coffee shop name
    //var nameEl = document.createElement("span");
    //nameEl.textContent = shopName;
    
    //append to the container 
    //shopEl.appendChild(nameEl);
    
    //append container to the DOM

// display map with nearest coffee roasterie locations

// create addEventListenrer to form container 
userFormEl.addEventListener("submit", formSubmitHandler);
