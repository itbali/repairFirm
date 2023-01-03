"use strict";

function myFunction(imgs, slide) {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg ".concat(slide)); // Get the image text

  var imgText = document.getElementById("imgtext"); // Use the same src in the expanded image as the image being clicked on from the grid

  expandImg.src = imgs.src; // Use the value of the alt attribute of the clickable image as text inside the expanded image

  imgText.innerHTML = imgs.alt; // Show the container element (hidden with CSS)
  // expandImg.parentElement.style.display = "block";
}

var apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
var chatId = "-1001806856376";
var btn = document.getElementById("calculatePriceButton");
btn.addEventListener("click", sendMessage);
textName = document.getElementById("quiz1-1-input");
textPhone = document.getElementById("quiz1-2-input");
textName.addEventListener("input", checker);
textPhone.addEventListener("input", checker);

function checker() {
  this.style.borderRadius = "10px 0";

  if (this.value.trim()) {
    this.style.outlineColor = "blue";
    this.style.border = "1px solid var(--border-color)";
    return;
  }

  this.style.border = "2px solid red";
  this.style.outlineColor = "red";
  this.placeholder = "Обязательное поле";
  return;
}

function sendMessage() {
  var text = "<b>\u041B\u0438\u0434 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 </b> %0A";

  if (!textName.value.trim()) {
    textName.placeholder = "ИМЯ ОБЯЗАТЕЛЬНО";
    textName.style.border = "2px solid red";
    return;
  }

  if (!textPhone.value.trim()) {
    textPhone.placeholder = "ТЕЛЕФОН ОБЯЗАТЕЛЬНО";
    textPhone.style.border = "2px solid red";
    return;
  }

  text += "<b>\u0418\u043C\u044F: </b>".concat(textName.value.trim(), " %0A<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D: </b>").concat(textPhone.value.trim(), "%0A<b>\u0412\u043E\u043F\u0440\u043E\u04411: </b>").concat(document.getElementById("quiz2input").value.trim(), "%0A<b>\u0412\u043E\u043F\u0440\u043E\u04412: </b>").concat(document.getElementById("quiz3input").value.trim(), "%0A<b>\u0412\u043E\u043F\u0440\u043E\u04413: </b>").concat(document.getElementById("quiz4input").value.trim());
  console.log({
    text: text
  });
  var urlString = "https://api.telegram.org/bot".concat(apiToken, "/sendMessage?chat_id=").concat(chatId, "&parse_mode=HTML&text=").concat(text);
  btn.disabled = true;
  btn.textContent = "Расчитываем...";
  console.log("111111111");
  debugger;
  fetch(urlString).then(function (res) {
    return res.json();
  }).then(function (d) {
    console.log("success");

    if (d.ok) {
      btn.textContent = "Расчет запрошен, мы с вами свяжемся";
    }
  })["catch"](function (e) {
    console.log("error");
    btn.textContent = "Что-то пошло не так, уже чиним";
    return console.warn({
      e: e
    });
  });
}