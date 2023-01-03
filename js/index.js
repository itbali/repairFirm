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

let apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
let chatId = "-1001806856376";

const btn = document.getElementById("calculatePriceButton");
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
    let text = `<b>Лид с данными </b> %0A`;

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

    text += `<b>Имя: </b>${textName.value.trim()} %0A<b>Телефон: </b>${textPhone.value.trim()}%0A<b>Вопрос1: </b>${document
        .getElementById("quiz2input")
        .value.trim()}%0A<b>Вопрос2: </b>${document
        .getElementById("quiz3input")
        .value.trim()}%0A<b>Вопрос3: </b>${document
        .getElementById("quiz4input")
        .value.trim()}`;
    console.log({ text });

    let urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${text}`;

    btn.disabled = true;
    btn.textContent = "Расчитываем...";

    console.log("111111111");
    debugger;
    fetch(urlString)
        .then((res) => res.json())
        .then((d) => {
            console.log("success");
            if (d.ok) {
                btn.textContent = "Расчет запрошен, мы с вами свяжемся";
            }
        })
        .catch((e) => {
            console.log("error");
            btn.textContent = "Что-то пошло не так, уже чиним";
            return console.warn({ e });
        });
}
