var app = function(){
  let url = 'https://swapi.co/api/';
  makePrimaryRequest(url, requestPrimaryComplete);

  let jsonString = localStorage.getItem('currentCategory');
  let savedCategory = JSON.parse(jsonString)
}


const makePrimaryRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}

const makeSecondaryRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}

const requestPrimaryComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const swapi = JSON.parse(jsonString);
  populateCategoryList(swapi);
  getCategory(swapi);
}

const requestSecondaryComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  debugger;
  const specific = JSON.parse(jsonString);
  console.log(specific);
  populateSpecificList(specific.results);
  getSpecific(specific);
}

const populateCategoryList = function (list) {
  newArray = Object.keys(list);
  const select = document.getElementById('category-list');
  for (let category of newArray) {
    const option = document.createElement("option");
    option.innerText = category;
    select.appendChild(option);
  }
}

const populateSpecificList = function (list) {
  const select = document.getElementById('specific-list');
  for (let specific of list) {
    const option = document.createElement("option");
    option.innerText = specific.name;
    select.appendChild(option);
  }
}

const getCategory = function (list) {
  const selectedCategory = document.querySelector('#category-list')
  selectedCategory.addEventListener('change', function() {
    let category = list[this.value]
    saveCategory(category)
    console.log(category);

    let url = category;
    makeSecondaryRequest(url, requestSecondaryComplete);
  })
}

const getSpecific = function (list) {
  const selectedSpecific = document.querySelector('#specific-list')
  selectedSpecific.addEventListener('change', function() {
    let specific = list[this.value]
    saveSpecific(specific)
    console.log(specific);

    let url = specific;
    makeSecondaryRequest(url, requestSecondaryComplete);

    // categoryDetails(category)
  })
}

const saveCategory = function(category){
  const jsonString = JSON.stringify(category);
  localStorage.setItem('currentCategory', jsonString);
}

const saveSpecific = function(specific){
  const jsonString = JSON.stringify(specific);
  localStorage.setItem('currentSpecific', jsonString);
}

const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

window.addEventListener('load', app);
