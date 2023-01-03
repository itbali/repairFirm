// let apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
// let chatId = "-1001806856376";
// let chatId = "@ProDom_Sevastopol";
// let text = "text";
// let request = new XMLHttpRequest();
// request.open("GET", urlString);
// request.send();
// let response = request.response;
// console.log(JSON.stringify(response));
// let apiToken = "5958435569:AAEN5TT0vj4SSH6x7MLpopAof9gcsTpmlKU";
// let chatId = "-1001806856376";
// const sendMessage = () => {
//     let text = `<b>Лид с данными </b> \n`;
//     textName = document.getElementById("quiz1-1-input");
//     textPhone = document.getElementById("quiz1-2-input");
//     console.log({ text, textName, textPhone });
//     if (!textName.value.trim() || !textPhone.value.trime()) {
//         textName.placeholder = "ИМЯ ОБЯЗАТЕЛЬНО";
//         textPhone.placeholder = "ТЕЛЕФОН ОБЯЗАТЕЛЬНО";
//         return;
//     }
//     text.concat(
//         `<b>Имя: </b>${textName.value.trim()} \n <b>Телефон: </b>${textPhone.value.trim()}`
//     );
//     let urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
//     const btn = document.getElementById("calculatePriceButton");
//     btn.disabled = true;
//     btn.textContent = "Расчитываем...";
//     return fetch(urlString)
//         .then((res) => res.json())
//         .then((d) => {
//             if (d.ok) {
//                 btn.textContent = "Расчет запрошен, мы с вами свяжемся";
//             }
//         })
//         .catch((e) => {
//             btn.textContent = "Что-то пошло не так, уже чиним";
//             return console.warn(JSON.stringify(e));
//         });
// };
"use strict";