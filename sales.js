'use strict';

// Worked with Melfi Perez on the function call getCookiesByHour
// Worked with Nick Paro on Math.Random Call 

//five locations
var pike = {
  location: '1st and Pike',
  minCustHour: 23,
  maxCustHour: 65,
  avgCookie: 6.3,
  makeRandomCustomers : function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getCookiesByHour : function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  }
};

var seatac = {
  location: 'SeaTac Airport',
  minCustHour: 3,
  maxCustHour: 24,
  avgCookie: 1.2,
  makeRandomCustomers : function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getCookiesByHour : function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  }
};
var center = {
  location: 'Seattle Center',
  minCustHour: 11,
  maxCustHour: 38,
  avgCookie: 3.7,
  makeRandomCustomers : function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getCookiesByHour : function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  }
};

var hill = {
  location: 'Capitol Hill',
  minCustHour: 20,
  maxCustHour: 38,
  avgCookie: 2.3,
  makeRandomCustomers : function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getCookiesByHour : function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  }
};

var alki = {
  location: 'Alki',
  minCustHour: 2,
  maxCustHour: 16,
  avgCookie: 4.6,
  makeRandomCustomers : function(){
    var min = this.minCustHour;
    var max = this.maxCustHour;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getCookiesByHour : function(){
    return Math.floor(this.makeRandomCustomers() * this.avgCookie);
  }
};

//array storing all five locations
var storeArray = [pike, seatac, center, hill, alki];
//array storing hours
var operationHours = ['6am', '7am','8am', '9am','10am', '11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// Referencing the container for the DOM
var salesList = document.getElementById('salesByHour');

//output and display -- loop over store, then loop over hour.
for (var i = 0 ; i < storeArray.length; i++){
  //inline horizontal list of stores  

  var totalCookiesSoldbyLocation = 0;

  // build a new element to put on the page
  var salesli = document.createElement('li');

  // give li some text
  salesli.textContent = storeArray[i].location;

  // append child to page
  salesList.appendChild(salesli);

  //second loop: blocked vertical list of hours
  for (var j = 0 ; j < operationHours.length; j++){

    // build a new element to put on the page
    var salesP = document.createElement('p');
    // var salesSpan = document.createElement('span');
    
    // add classes
    salesP.classList.add('hours');
    
    // concat full line expected.
    var timeAndCookies = operationHours[j] + ': ' + storeArray[i].getCookiesByHour() + ' cookies';

    // give some text
    salesP.textContent = timeAndCookies;
    
    // append child to page
    salesList.appendChild(salesP);
    
    // calc total cookies
    totalCookiesSoldbyLocation += storeArray[i].getCookiesByHour();
    
  }// for loop per hour

  // display total and output on the bottom.
  // build a new element to put on the page
  var totalCookieP = document.createElement('p');
  // add classes
  totalCookieP.classList.add('total');
  // give text
  totalCookieP.textContent = 'Total: ' + totalCookiesSoldbyLocation + ' cookies';
  // append child to page
  salesList.appendChild(totalCookieP);
  
} //for loop per location




//example for constructors

//old way
/*
var student = {
  name: 'steve',
  hobby: 'interior decorator',
  skill: 'spelunking',

};

student.gettingHairCut = function() {
  console.log('buzzzzz');
};
*/

//new way, psuedo construction
function teacher(name, hobby, skill) {
  var student = {
    name : name,
    hobby : hobby,
    skill : skill
  };
  student.skill = skill;
  student.gettingHairCut = function(){
    console.log('buzzzz');
  };
}

//real constructor.  named with title case
var Student = function (name, hobby, skill){
  this.name = name;
  this.hobby = hobby;
  this.skill = skill;
  this.haircut = function() {
    console.log('snip snip');
  };
};

//adding a new method outside to add to a constructor.
Student.prototype.usePowers = function() {
  console.log('i am good at ' + this.hobby + ' my ' + this.skill + 'is powerful.');
};

var matt = new Student(1,2,3);
// new Student (1,2,3);







