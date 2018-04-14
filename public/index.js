var app = function(){
  let url = 'https://swapi.co/api/';
  makeRequest(url, requestComplete);

  let jsonString = localStorage.getItem('currentCategory');
  let savedCategory = JSON.parse(jsonString)
  // categoryDetails(savedCategory)
}


const makeRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}

const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const swapi = JSON.parse(jsonString);
  populateCategoryList(swapi);
  getCategory(swapi);
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

const getCategory = function (list) {
  const selectedCategory = document.querySelector('select')
  selectedCategory.addEventListener('change', function() {
    let category = list[this.value]
    saveCategory(category)
    console.log(category);

    let url = category;
    makeRequest(url, requestComplete);

    let jsonString = localStorage.getItem('currentCategory');
    let savedCategory = JSON.parse(jsonString)
    // categoryDetails(category)
  })
}

const saveCategory = function(category){
  const jsonString = JSON.stringify(category);
  localStorage.setItem('currentCategory', jsonString);
}

window.addEventListener('load', app);
