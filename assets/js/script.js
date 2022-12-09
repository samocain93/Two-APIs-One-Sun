
// modal visibility functions
const overLay = document.querySelector("#overlay");
var submitClick = document.querySelector("#submit");
document.querySelector("#show-modal-btn").addEventListener("click", () => {
  overLay.style.display = "block";
});
document.querySelector("#close-modal-btn").addEventListener("click", () => {
  overLay.style.display = "none";

});
document.querySelector("#submit").addEventListener("click", () => {
  overLay.style.display = "none";
});


// first api url set as variable
var apiOneUrl = 'https://api.zippopotam.us/us/';
function zipQuery () {
    // creating variables to take the input from the zip code input box, and adding that to the url for setting the query search parameters on apiOne
    // the input from the zip code input box is also set in the #zipCode inner.HTML
    var textInputEl = document.querySelector("#textInput").value;
    var zipCodeEl = document.querySelector('#zipCode');
    zipCodeEl.innerHTML = textInputEl;  // setting the #zipCode text value = to the text input value that was entered in the "Enter Zip Code" input box 

    var apiOneRequest = apiOneUrl + textInputEl;  // this is the concatonated string that is submitted for the first api request
    localStorage.setItem("apiOneQuery", apiOneRequest);  // storing apiOneRequest into local storage
    console.log(apiOneRequest);
    

    fetch(apiOneRequest)  //  sending a queried request
        .then(response => {  // if a response is reached then this function
            //console.log(response);  // logs the response from the api server  status 200 etc....
            return response.json(); // requesting the information stream to be converted from json input and produced into a javascript object
        })
        .then(dataOneReturned => { // create a function that will work with the apiOneRequest response information
            localStorage.setItem("apiOne", JSON.stringify(dataOneReturned)); // restringing the response request to store in local storage
            console.log(dataOneReturned);

            var postCodeVar = dataOneReturned["post code"];  // returns the value of the nested key {post code}, parses it to a numeric value, assigns the value to html #latitude
            //var zipVar = JSON.parse(["post code"]);
            console.log(postCodeVar);
            document.getElementById("zipCode").textContent = postCodeVar;

            var {places: { [0]: {latitude} } } = dataOneReturned;  // returns the value of the nested key {latitude}, assigns the value to html #latitude
            var latVar = (latitude);
            localStorage.setItem("latitude", latVar);
            //console.log(latVar);
            document.getElementById("latitude").textContent = latVar;
            
            var {places: { [0]: {longitude} } } = dataOneReturned;  // returns the value of the nested key {longitude}, assigns the value to html #longitude
            var lonVar = (longitude);
            localStorage.setItem("longitude", lonVar);
            //console.log(lonVar);
            document.getElementById("longitude").textContent = lonVar;
            
            var {places: { [0]: {state} } } = dataOneReturned;  // returns the value of the nested key {state}, assigns the value to html #state
            var stateVar = (state);
            localStorage.setItem("state", stateVar);
            //console.log(stateVar);
            document.getElementById("state").textContent = stateVar;
            
            var cityVar = dataOneReturned.places[0]["place name"];  // returns the value of the nested key {place name}, assigns the value to html #city
            localStorage.setItem("city", cityVar);
            console.log(cityVar);
            document.getElementById("city").textContent = cityVar;
        })
}
document.getElementById("submit").addEventListener("click", zipQuery);  // make click event to submit a zip code that will retreive city, state, latitude and longitude of our zip code


function sunQuery () {
    // now we take the latitude and longitude values that we received from the first api request and use those values as query parameters for the second api
    var latEl = document.getElementById("latitude").textContent;
    var latQuery = (latEl);
    //console.log(latQuery);
    var lonEl = document.getElementById("longitude").textContent;
    var lonQuery = (lonEl);
    //console.log(lonQuery);
    var apiTwoUrl = 'https://api.sunrisesunset.io/';
    // this is the concatonated result of the second api request
    var apiTwoRequest = apiTwoUrl + "json?" + "lat=" + latQuery + "&" + "lng=" + lonQuery + "&" + "timezone=CST" + "&" + "date=today";
        localStorage.setItem("apiTwoQuery", apiTwoRequest);
        console.log(apiTwoRequest);

    fetch(apiTwoRequest)
        .then(response => {
            //console.log(response);  // logs the response from the 2nd api server  status 200 etc....
            return response.json();  // requesting the information stream to be converted from json input and produced into a javascript object
        })
        .then(dataTwoReturned => { // when the data returns as an object run this function
            localStorage.setItem("apiTwo", JSON.stringify(dataTwoReturned));
            console.log(dataTwoReturned);
            
            // NOTE: on var = apiTwoRequest we have decided to hard code the time zone parameter to reduce additional coding. 
            // future improvements could be to implement a drop down box to make this selectable
            // this variable only returns the sun rise and sun set times as values of the Central Time Zone 
            // Example: When the sun rises at 8am in california, it would be 10am in texas. 
            // So even if searching a california zipcode, the sun rise time would be displayed in texas time
            var {results: {timezone} } = dataTwoReturned; // returns the value of the nested key {timezone}, assigns the value to html #timezone
            var timeZoneVar = (timezone);
            localStorage.setItem("timezone", timeZoneVar);
            //console.log(timeZoneVar);
            document.getElementById("timezone").textContent = timeZoneVar;

            var {results: {dawn} } = dataTwoReturned;  // returns the value of the nested key {dawn}, assigns the value to html #dawn
            var dawnVar = (dawn);
            localStorage.setItem("dawn", dawnVar);
            //console.log(dawnVar);
            document.getElementById("dawn").textContent = dawnVar;

            var {results: {sunrise} } = dataTwoReturned;  // returns the value of the nested key {sunrise}, assigns the value to html #sunrise
            var sunRiseVar = (sunrise);
            localStorage.setItem("sunrise", sunRiseVar);
            //console.log(sunRiseVar);
            document.getElementById("sunrise").textContent = sunRiseVar;

            var {results: {solar_noon} } = dataTwoReturned;  // returns the value of the nested key {solar_noon}, assigns the value to html #solarNoon
            var solarNoonVar = (solar_noon);
            localStorage.setItem("solarNoon", solarNoonVar);
            //console.log(dayLengthVar);
            document.getElementById("solarNoon").textContent = solarNoonVar;

            var {results: {sunset} } = dataTwoReturned;  // returns the value of the nested key {sunset}, assigns the value to html #sunset
            var sunsetVar = (sunset);
            localStorage.setItem("sunset", sunsetVar);
            //console.log(sunsetVar);
            document.getElementById("sunset").textContent = sunsetVar;

            var {results: {dusk} } = dataTwoReturned;  // returns the value of the nested key {dusk}, assigns the value to html #dusk
            var duskVar = (dusk);
            localStorage.setItem("dusk", duskVar);
            //console.log(sunsetVar);
            document.getElementById("dusk").textContent = duskVar;

            var {results: {day_length} } = dataTwoReturned;  // returns the value of the nested key {day_length}, assigns the value to html #dayLength
            var dayLengthVar = (day_length);
            localStorage.setItem("day_length", dayLengthVar);
            //console.log(dayLengthVar);
            document.getElementById("dayLength").textContent = dayLengthVar;
        })
}
document.getElementById("getSun").addEventListener("click", sunQuery);  //  create a click event so that once a zip code is selected, you can now view the times of the sun's events for the day

