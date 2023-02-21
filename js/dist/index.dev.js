"use strict";

// Description: This file contains the main javascript code for the website
// tokens for telegram bot
var apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
var chatId = "-1001806856376"; // This function is used to expand the images when clicked on

function myFunction(imgs, slide) {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg ".concat(slide)); // Get the image text

  var imgText = document.getElementById("imgtext"); // Use the same src in the expanded image as the image being clicked on from the grid

  expandImg.src = imgs.src; // Use the value of the alt attribute of the clickable image as text inside the expanded image

  imgText.innerHTML = imgs.alt; // Show the container element (hidden with CSS)
  // expandImg.parentElement.style.display = "block";
} // geting elements from html


var btn = document.getElementById("calculate-price-button");
var textName = document.getElementById("quiz1-1-input");
var textPhone = document.getElementById("quiz1-2-input");
var errorMessage = document.getElementById("errorMessage"); // initialize error messages

var error = {
  name: undefined,
  phone: undefined
}; // check if fields are not empty

function checkName() {
  error.name = undefined;
  errorMessage.style.display = "none";
  this.style.borderRadius = "10px 0";

  if (this.value.trim()) {
    this.style.border = "1px solid var(--border-color)";
    error.name = undefined;
    return;
  }

  this.style.border = "2px solid red";
  this.placeholder = "Обязательное поле";
  error.name = "Обязательное поле";
  return;
} //check if phone number is correct


function checkPhone() {
  error.phone = undefined;
  errorMessage.style.display = "none";

  if (textPhone.value.trim().length != 18) {
    textPhone.style.border = "2px solid red"; // textPhone.style.outlineColor = "red";

    textPhone.placeholder = "Номер телефона некорректен";
    error.phone = "Номер телефона некорректен";
    return;
  }

  textPhone.style.border = "1px solid var(--border-color)"; // textPhone.style.outlineColor = "blue";

  return;
} // phone mask for russian numbers


var prefixNumber = function prefixNumber(str) {
  if (str === "7") {
    return "7 (";
  }

  if (str === "8") {
    return "8 (";
  }

  if (str === "9") {
    return "7 (9";
  }

  return "7 (";
}; // ======================================


textPhone.addEventListener("input", function () {
  var value = textPhone.value.replace(/\D+/g, "");
  var numberLength = 11;
  var result;

  if (textPhone.value.includes("+8") || textPhone.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  } //


  for (var i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;

      case 4:
        result += ") ";
        break;

      case 7:
        result += "-";
        break;

      case 9:
        result += "-";
        break;

      default:
        break;
    }

    result += value[i];
  } //


  textPhone.value = result;
}); //script for sending message to telegram

function sendMessage() {
  var text = "<b>\u041B\u0438\u0434 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 </b> %0A"; // check if fields are not empty

  if (!textName.value.trim()) {
    textName.placeholder = "введите имя";
    textName.style.border = "2px solid red";
    error.name = "Имя обязательно";
  } // check if phone number is correct


  if (!textPhone.value.trim()) {
    textPhone.placeholder = "введите телефон";
    textPhone.style.border = "2px solid red";
    error.phone = "Телефон обязательно";
  } // if there are errors, show them


  if (error.name || error.phone) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "".concat(error.name || "", " ").concat(error.phone || "");
    return;
  } // if there are no errors, send message to telegram


  text += "<b>\u0418\u043C\u044F: </b>".concat(textName.value.trim(), " %0A<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D: </b>").concat(textPhone.value.trim(), "%0A%0A<b>\u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C: </b>").concat(document.getElementById("quiz2input").value.trim(), "%0A<b>\u041F\u043B\u043E\u0449\u0430\u0434\u044C: </b>").concat(document.getElementById("quiz3input").value.trim(), "%0A<b>\u0422\u0438\u043F \u0440\u0435\u043C\u043E\u043D\u0442\u0430: </b>").concat(document.getElementById("quiz4input").value.trim());
  var urlString = "https://api.telegram.org/bot".concat(apiToken, "/sendMessage?chat_id=").concat(chatId, "&parse_mode=HTML&text=").concat(text);
  btn.disabled = true;
  btn.textContent = "Расчитываем...";
  fetch(urlString).then(function (res) {
    return res.json();
  }).then(function (d) {
    console.log("success");

    if (d.ok) {
      btn.textContent = "Расчет запрошен, мы с вами свяжемся";
    }
  })["catch"](function (e) {
    btn.textContent = "Что-то пошло не так, уже чиним";
    console.warn("error", {
      e: e
    });
    return;
  });
} // check functions and phone masks are started here


textName.addEventListener("input", checkName);
textPhone.addEventListener("input", checkPhone);
btn.addEventListener("click", sendMessage);