// Get references to DOM elements
var bookMarkName = document.getElementById("bookMarkName");
var urlSite = document.getElementById("urlSite");
var alertKey = document.getElementById("alertKey");

// Initialize websitesList from localStorage or set to an empty array
var websitesList = JSON.parse(localStorage.getItem("myweb")) || [];

// Display data if websitesList is not empty
if (websitesList.length > 0) {
  displayData();
}

// Function to add a website
function addWebSite() {
  if (validName() && validUrl()) {
    var submit = {
      name: bookMarkName.value,
      url: urlSite.value.startsWith("http") ? urlSite.value : "https://" + urlSite.value,
    };
    websitesList.push(submit);
    clear();
    displayData();
    localStorage.setItem("myweb", JSON.stringify(websitesList));
    alertKey.classList.add("d-none");
  } else {
    alertKey.classList.remove("d-none");
  }
}

// Function to clear input fields
function clear() {
  bookMarkName.value = "";
  urlSite.value = "";
}

// Function to display the data in the table
function displayData() {
  var cartona = "";
  for (var i = 0; i < websitesList.length; i++) {
    cartona += `
         <tr>
                <td>${i + 1}</td>
                <td>${websitesList[i].name}</td>
                <td>
                    <button class="btn btn-success">
                        <a target="_blank" href="${websitesList[i].url}">
                            <span><i class="fa-solid fa-eye"></i></span> Visit
                        </a>
                    </button>
                </td>
                <td>
                    <button onclick="deletitem(${i})" class="btn btn-danger">
                        <span><i class="fa-solid fa-trash-can"></i></span> Delete
                    </button>
                </td>
              </tr>`;
  }
  document.getElementById("bodyOfTable").innerHTML = cartona;
}

// Function to delete an item from the list
function deletitem(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("myweb", JSON.stringify(websitesList));
  displayData();
}

// Function to validate the bookmark name
function validName() {
  var text = bookMarkName.value;
  var regex = /^([a-zA-Z]{3,10})$/;
  if (regex.test(text)) {
    bookMarkName.classList.add("is-valid");
    bookMarkName.classList.remove("is-invalid");
    return true;
  } else {
    bookMarkName.classList.add("is-invalid");
    bookMarkName.classList.remove("is-valid");
    return false;
  }
}

// Function to validate the URL
function validUrl() {
  var regexu = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  if (regexu.test(urlSite.value)) {
    urlSite.classList.add("is-valid");
    urlSite.classList.remove("is-invalid");
    return true;
  } else {
    urlSite.classList.add("is-invalid");
    urlSite.classList.remove("is-valid");
    return false;
  }
}

// Function to close the alert
function closeKey() {
  alertKey.classList.add("d-none");
}
