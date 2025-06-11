// Inputs Selector
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let categoryInput = document.getElementById("category");
let descriptionInput = document.getElementById("description");
let imageInput = document.getElementById("formFileLg");
let searchInput =document.getElementById("search");

// Buttons Selector
let updateBtn = document.getElementById("updateBtn");
let updateIndex ;
let submitBtn = document.getElementById("submitBtn");
let removeBtn;
let removeBtnArr;
let editBtn;
let editBtnArr;

let productsArr = [];
if (localStorage.getItem("productsArr")) {
  productsArr = JSON.parse(localStorage.getItem("productsArr"));
  display(productsArr);
}

submitBtn.addEventListener("click", addProduct);
updateBtn.addEventListener("click", updateElement);

// Validate Inputs on writing
productNameInput.addEventListener("input", () => {
    validationInputs(productNameInput);
})
productPriceInput.addEventListener("input", () => {
    validationInputs(productPriceInput);
})
categoryInput.addEventListener("input", () => {
    validationInputs(categoryInput);
})
descriptionInput.addEventListener("input", () => {
    validationInputs(descriptionInput);
})
imageInput.addEventListener("input", () => {
  validateImage(imageInput);
})

// Search
searchInput.addEventListener("input", () => {
  findMatch(searchInput.value);
})

function findMatch(key) {
  // First element in Array is a predefined value to handle display
  var matchingArr = [-1];
  var matchingArrIndex = 1 ;
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name.toLowerCase().includes(key.toLowerCase()) ) {
      matchingArr.push(productsArr[i]);
      matchingArr[matchingArrIndex].index = i ;
      matchingArr[matchingArrIndex].span = key ;
      matchingArr[matchingArrIndex].rest = matchingArr[matchingArrIndex].name.slice(key.length,);
      matchingArrIndex++ ;
    }
  }
  console.log(matchingArr);
  display(matchingArr);
}

function addProduct() {
  if (validationInputs(productNameInput) && validationInputs(productPriceInput) && validationInputs(categoryInput) && validationInputs(descriptionInput) && validateImage(imageInput)) {
    let newProduct = {
      name: productNameInput.value,
      price: productPriceInput.value,
      image : imageInput.value.slice(imageInput.value.lastIndexOf("\\"),) ,
      category : categoryInput.value,
      description : descriptionInput.value
    };
    productsArr.push(newProduct);
    clearInputs();
    display(productsArr);
    localStorage.setItem("productsArr", JSON.stringify(productsArr));
  } else {
    document.getElementById("layout").classList.remove("d-none")
  }
}

function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  categoryInput.value = "";
  imageInput.value = "";
  descriptionInput.value = "";
  productNameInput.classList.remove("is-valid" , "is-invalid");
  productPriceInput.classList.remove("is-valid" , "is-invalid");
  categoryInput.classList.remove("is-valid" , "is-invalid");
  descriptionInput.classList.remove("is-valid" , "is-invalid");
  imageInput.classList.remove("is-valid" , "is-invalid");
}

function display(array) {
  var blackBox = "";
  if (array[0] == -1) {
    if (array.length == 1) {
      document.getElementById("noMatch").classList.remove("d-none")
    } else {
      document.getElementById("noMatch").classList.add("d-none")
      for (let i = 1; i < array.length; i++) {
    blackBox += `<div class="col-md-6 col-lg-4 col-xxl-3">
                    <div class="card item m-auto" style="width: 18rem;">
                       <img src="images${array[i].image}" class="card-img-top" alt="mobile phone">
                       <div class="card-body">
                       <h5 class="card-title"><span class="text-danger fw-bolder text-capitalize">${array[i].span}</span>${array[i].rest}</h5>
                       <p class="card-text">${array[i].description}</p>
                       </div>
                       <ul class="list-group list-group-flush">
                           <li class="list-group-item">${array[i].price} $</li>
                           <li class="list-group-item">${array[i].category}</li>
                       </ul>
                       <div class="card-body d-flex justify-content-between">
                           <button class="btn btn-danger removeBtn" value="${array[i].index}">Remove <i class="fa-solid fa-trash-can"></i></button>
                           <button class="btn btn-info editBtn" value="${array[i].index}">Edit <i class="fa-solid fa-wrench"></i></button>
                       </div>
                    </div>
                </div>`
  }
    }
  } else {
    document.getElementById("noMatch").classList.add("d-none")
    for (let i = 0; i < array.length; i++) {
    blackBox += `<div class="col-md-6 col-lg-4 col-xxl-3">
                    <div class="card item m-auto" style="width: 18rem;">
                       <img src="images${array[i].image}" class="card-img-top" alt="mobile phone">
                       <div class="card-body">
                           <h5 class="card-title">${array[i].name}</h5>
                           <p class="card-text">${array[i].description}</p>
                       </div>
                       <ul class="list-group list-group-flush">
                           <li class="list-group-item">${array[i].price} $</li>
                           <li class="list-group-item">${array[i].category}</li>
                       </ul>
                       <div class="card-body d-flex justify-content-between">
                           <button class="btn btn-danger removeBtn" value="${i}">Remove <i class="fa-solid fa-trash-can"></i></button>
                           <button class="btn btn-info editBtn" value="${i}">Edit <i class="fa-solid fa-wrench"></i></button>
                       </div>
                    </div>
                </div>`
  }
  }
  document.getElementById("itemContainer").innerHTML = blackBox;
  setRemoveBtn();
  setEditBtn ();
}

function setRemoveBtn() {
  removeBtn = document.querySelectorAll(".removeBtn");
  removeBtnArr = [...removeBtn];
  for (let i = 0; i < removeBtnArr.length ; i++) {
  removeBtnArr[i].addEventListener("click",  () => {
    removeElement(removeBtnArr[i].value);
  });
  }
}

function setEditBtn() {
  editBtn = document.querySelectorAll(".editBtn");
  editBtnArr = [...editBtn];
  for (let i = 0; i < editBtnArr.length ; i++) {
  editBtnArr[i].addEventListener("click",  () => {
    editElement(editBtnArr[i].value);
  });
  }
}

function editElement(index) {
  productNameInput.value = productsArr[index].name;
  productPriceInput.value = productsArr[index].price;
  categoryInput.value = productsArr[index].category;
  descriptionInput.value = productsArr[index].description;
  updateIndex = index;
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateElement() {
  if (validationInputs(productNameInput) && validationInputs(productPriceInput) && validationInputs(categoryInput) && validationInputs(descriptionInput)) {
    let updatedImage = productsArr[updateIndex].image;
    if (imageInput.value && validateImage(imageInput) ) {
      updatedImage = imageInput.value.slice(imageInput.value.lastIndexOf("\\"),);
    }
    
    productsArr[updateIndex] = {
      name: productNameInput.value,
      price: productPriceInput.value,
      image : updatedImage,
      category : categoryInput.value,
      description : descriptionInput.value
    };
    clearInputs();
    display(productsArr);
    localStorage.setItem("productsArr", JSON.stringify(productsArr));
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}

function removeElement(index) {
  productsArr.splice(index, 1);
  display(productsArr);
  localStorage.setItem("productsArr", JSON.stringify(productsArr));
}

function validationInputs(element) {
  let isValid;
  let ragex = {
    productName : /^[A-Z][a-z]{2,15}$/gm ,
    productPrice : /^([6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/gm,
    category : /Screen|Mobile|Watch|Accessories/gm ,
    description : /^.{0,250}$/ ,
    
  };
  isValid = ragex[element.id].test(element.value) ;
  editInputValidation(isValid, element);
  return isValid;
}

function validateImage(element) {
  let isValid ;
  isValid = (element.value.slice(element.value.lastIndexOf('.')+1,) == 'jpg') || 
  (element.value.slice(element.value.lastIndexOf('.')+1,) == 'jpeg') || 
  (element.value.slice(element.value.lastIndexOf('.')+1,) == 'png');
  editInputValidation(isValid, element);
  return isValid ; 
}

function editInputValidation(isValid, element) {
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function closeTab() {
    document.getElementById("layout").classList.add("d-none")
}