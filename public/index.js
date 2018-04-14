// loads on window load, calls makePrimaryRequest with root url and callback
var app = function(){
  let url = 'https://swapi.co/api/';
  makePrimaryRequest(url, requestPrimaryComplete);
}

// open root url and call requestPrimaryComplete
const makePrimaryRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}

// open category url and call requestPrimaryComplete
const makeSecondaryRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}


// gets the response of the ping and parses it, assigning it to variable,
// calls populateCategoryList with the new list variable,
// calls getCategory with the new list variable
const requestPrimaryComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const swapi = JSON.parse(jsonString);
  populateCategoryList(swapi);
  getCategory(swapi);
}


// gets the response of the ping and parses it, assigning it to variable,
// calls populateSpecificList with the new list variable,
// calls getSpecific with the new list variable
const requestSecondaryComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const specific = JSON.parse(jsonString);
  populateSpecificList(specific.results);
  getSpecific(specific.results);
}


// gets keys from passed in list and puts them in array,
// for each key in array, assigns the key to the drop down list
const populateCategoryList = function (list) {
  newArray = Object.keys(list);
  const select = document.getElementById('category-list');
  for (let categoryName of newArray) {
    const option = document.createElement("option");
    option.innerText = categoryName;
    select.appendChild(option);
  }
}

// empties drop down of any existing children,
// assigns the name of each 'specific' in the list and gives it an id
const populateSpecificList = function (list) {
  const select = document.getElementById('specific-list');
    while (select.firstChild) {
    select.removeChild(select.firstChild);
    }
  let idCount = 0;
  for (let specific of list) {
    const option = document.createElement("option");
    option.innerText = specific.name;
    option.value = idCount;
    select.appendChild(option);
    idCount += 1;
  }
}

// assigns the chosen option in the dropdown to variable,
// calls saveCategory with new variable passed in,
// sets url for secondary request to category,
// calls makeSecondaryRequest with new url and callback passed in
const getCategory = function (list) {
  const selectedCategory = document.querySelector('#category-list')
  selectedCategory.addEventListener('change', function() {
    let category = list[this.value];
    saveCategory(category)
    console.log(category);

    let url = category;
    makeSecondaryRequest(url, requestSecondaryComplete);
  })
}

// assigns the chosen option in the dropdown to variable,
// calls saveSpecific with new variable passed in
const getSpecific = function (list) {
  const selectedSpecific = document.querySelector('#specific-list')
  selectedSpecific.addEventListener('change', function() {
    let specific = list[this.value];
    saveSpecific(specific)
    console.log(specific);
  })
}

// assigns stringified 'category' (url) to variable and saves it local storage
const saveCategory = function(category){
  const jsonString = JSON.stringify(category);
  localStorage.setItem('currentCategory', jsonString);
}

// assigns stringified 'specific' (object) to variable and saves it local storage
const saveSpecific = function(specific){
  const jsonString = JSON.stringify(specific);
  localStorage.setItem('currentSpecific', jsonString);
}



window.addEventListener('load', app);
