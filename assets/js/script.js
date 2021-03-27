

// create formSubmitHandler 

// fetch yelp API for coffee roasterie locations 

var getShopLocations = function() {
    var apiUrl = "httpsforcoffeeroasteries" + shops + "httpsforlocations";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};



// fetch google places API for nearest coffee roasterie location 

var getShopRadius = function() {
    var apiUrl = "httpsforcoffeeroasteries" + shops + "httpsforlocations";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

// create function to display top 5 coffee roasteries 

// create for loop over arrays
    // for(var i = 0; i < shop.length; i++) {

    //}
    // create a span element to hold coffee shop name
    //append to the container 
    //append container to the DOM

// display map with nearest coffee roasterie locations

// create addEventListenrer to form container 


