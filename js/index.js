// Description: This file contains the main javascript code for the website

// tokens for telegram bot
let apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
let chatId = "-1001806856376";

// This function is used to expand the images when clicked on
function myFunction(imgs, slide) {
    // Get the expanded image
    var expandImg = document.getElementById(`expandedImg ${slide}`);
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    // expandImg.parentElement.style.display = "block";
}

// geting elements from html
const btn = document.getElementById("calculate-price-button");
const textName = document.getElementById("quiz1-1-input");
const textPhone = document.getElementById("quiz1-2-input");
const errorMessage = document.getElementById("errorMessage");

// initialize error messages
let error = {
    name: undefined,
    phone: undefined,
};

// check if fields are not empty
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
}
//check if phone number is correct
function checkPhone() {
    error.phone = undefined;
    errorMessage.style.display = "none";
    if (textPhone.value.trim().length != 18) {
        textPhone.style.border = "2px solid red";
        // textPhone.style.outlineColor = "red";
        textPhone.placeholder = "Номер телефона некорректен";
        error.phone = "Номер телефона некорректен";
        return;
    }
    textPhone.style.border = "1px solid var(--border-color)";
    // textPhone.style.outlineColor = "blue";
    return;
}
// phone mask for russian numbers
const prefixNumber = (str) => {
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
};

// ======================================
textPhone.addEventListener("input", () => {
    const value = textPhone.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    if (textPhone.value.includes("+8") || textPhone.value[0] === "8") {
        result = "";
    } else {
        result = "+";
    }

    //
    for (let i = 0; i < value.length && i < numberLength; i++) {
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
    }
    //
    textPhone.value = result;
});

//script for sending message to telegram
function sendMessage() {
    let text = `<b>Лид с данными </b> %0A`;
    // check if fields are not empty
    if (!textName.value.trim()) {
        textName.placeholder = "введите имя";
        textName.style.border = "2px solid red";
        error.name = "Имя обязательно";
    }
    // check if phone number is correct
    if (!textPhone.value.trim()) {
        textPhone.placeholder = "введите телефон";
        textPhone.style.border = "2px solid red";
        error.phone = "Телефон обязательно";
    }
    // if there are errors, show them
    if (error.name || error.phone) {
        errorMessage.style.display = "block";
        errorMessage.textContent = `${error.name || ""} ${error.phone || ""}`;
        return;
    }

    // if there are no errors, send message to telegram
    text += `<b>Имя: </b>${textName.value.trim()} %0A<b>Телефон: </b>${textPhone.value.trim()}%0A%0A<b>недвижимость: </b>${document
        .getElementById("quiz2input")
        .value.trim()}%0A<b>Площадь: </b>${document
        .getElementById("quiz3input")
        .value.trim()}%0A<b>Тип ремонта: </b>${document
        .getElementById("quiz4input")
        .value.trim()}`;

    let urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${text}`;

    btn.disabled = true;
    btn.textContent = "Расчитываем...";

    fetch(urlString)
        .then((res) => res.json())
        .then((d) => {
            console.log("success");
            if (d.ok) {
                btn.textContent = "Расчет запрошен, мы с вами свяжемся";
            }
        })
        .catch((e) => {
            btn.textContent = "Что-то пошло не так, уже чиним";
            console.warn("error", { e });
            return;
        });
}

// check functions and phone masks are started here
textName.addEventListener("input", checkName);
textPhone.addEventListener("input", checkPhone);
btn.addEventListener("click", sendMessage);
