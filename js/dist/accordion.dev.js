"use strict";

var acc = document.getElementsByClassName("accordion-button");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");
    /* Toggle between hiding and showing the active panel */

    var panel = this.nextElementSibling;

    if (panel.classList.contains("is-active")) {
      panel.classList.remove("is-active");
    } else {
      panel.classList.add("is-active");
    } // if (panel.style.display === "block") {
    //     panel.style.display = "none";
    // } else {
    //     panel.style.display = "block";
    // }

  });
}