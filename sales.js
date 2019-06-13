'use strict';

// Worked with Melfi Perez on the function call getCookiesByHour
// Worked with Nick Paro on Math.Random call. 

//constructor by locaiton
var LocationTemplate = function(location, minCustHour, maxCustHour, avgCookie){
  this.location = location;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgCookie = avgCookie;
  this.makeRandomCustomers = function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  this.getCookiesByHour = function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  };
};

//array of location information
var locationArrayData = [
  ['1st and Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capitol Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6],
];

//array storing hours
var operationHours = ['6am', '7am','8am', '9am','10am', '11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

//create the locations by passing through the constructor
function makeLocation (locationArray){
  //return device
  var constructed = [];
  //iterate through locations
  for(var i = 0 ; i < locationArray.length; i++){
    var location = locationArray[i][0];
    var minCustHour = locationArray[i][1];
    var maxCustHour = locationArray[i][2];
    var avgCookie = locationArray[i][3];
    //push new
    var push = new LocationTemplate(location, minCustHour,maxCustHour,avgCookie);
    constructed.push(push);
  }//end for
  return constructed;
}//end MakeLocation

// Referencing the container for the DOM
function domReferenceParent(parent){
  var node = document.getElementById(parent);
  return node;
}

// build a new element to put on the page
function buildElement(element){
  var node = document.createElement(element);
  return node;
}

// give element some text
function assignElementText(text, element){
  element.textContent = text;
}

// append child to page
function appendChildtoParent(parent, child){
  parent.appendChild(child);
}

//build an element, assign it text, and append to page
function htmlTextHack(element, text, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  assignElementText(text, current);
  appendChildtoParent(node, current);
}

// build an element without text, append.
function htmlNodeAdd(element, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  appendChildtoParent(node, current);
}

//BEGIN TABLE:
function createTable(){
  //run the call, saving all templated location objects in an array.
  var arrayOfLocationObjects = makeLocation(locationArrayData);

  //create first table row, empty space on top corner.
  htmlNodeAdd('tr', 'salesByHour');
  htmlTextHack('td', '          ', 'salesByHour');

  //output hours over the first row.  total last.
  for(var b = 0 ; b < operationHours.length ; b ++ ){
    htmlTextHack('td', operationHours[b], 'salesByHour');
  }

  //daily location total, single table data add.
  htmlTextHack('td', 'Daily Location Total', 'salesByHour');

  //iterate over five rows, one for each location.
  for(var i = 0 ; i < arrayOfLocationObjects.length ; i++){
    //hold total by location
    var totalCookiesSoldbyLocation = 0;
    //add table rows
    htmlNodeAdd('tr', 'salesByHour');
    //add location to first column
    htmlTextHack('td', arrayOfLocationObjects[i].location, 'salesByHour');

    //create a new array for totals over hour, push into the object
    arrayOfLocationObjects[i].hourlyTotals = [];

    //Iterate over 15 hours
    for(var j = 0 ; j < operationHours.length ; j ++ ){
      var cookiesByHour = arrayOfLocationObjects[i].getCookiesByHour();
      htmlTextHack('td', cookiesByHour, 'salesByHour');
      //total by location
      totalCookiesSoldbyLocation += cookiesByHour;

      //push hour into our totals array
      arrayOfLocationObjects[i].hourlyTotals.push(cookiesByHour);
    }
    //add daily location total to table
    htmlTextHack('td', totalCookiesSoldbyLocation, 'salesByHour');
  }

  //add totals table row
  htmlNodeAdd('tr', 'salesByHour');
  //totals by hour, single table data add
  htmlTextHack('td', 'Hourly Total', 'salesByHour');

  //total by time 
  //iterate over 15 hours
  for(var c = 0 ; c < operationHours.length ; c ++ ){
    //temp total holder
    var tempByHour = 0;
    //iterate over five rows, one for each location.
    for(var d = 0 ; d < arrayOfLocationObjects.length ; d++){
      tempByHour += arrayOfLocationObjects[d].hourlyTotals[c];
    }
    htmlTextHack('td', tempByHour, 'salesByHour');
  }
} //END TABLE

//creates table of cookie data
createTable();

var form = document.getElementById('storeForm');

//function to get values of the form
var handleFormSubmit = function(e){
  //disable form submit to POST or GET
  e.preventDefault();
  var location = e.target.location.value;
  var minCust = parseInt(e.target.minCust.value, 10);
  var maxCust = parseInt(e.target.maxCust.value, 10);
  var avgCookie = parseInt(e.target.avgCookie.value, 10);
//push data primitives to our array of data.
  locationArrayData.push([location, minCust, maxCust, avgCookie]);
  document.getElementById('salesByHour').innerHTML = '';
  createTable();
};

//adds event listener to the submit button
form.addEventListener('submit', handleFormSubmit);

