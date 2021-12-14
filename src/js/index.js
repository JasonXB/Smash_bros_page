import mediumZoom from "medium-zoom";
//^ The following code is messing up for some reason, halting the remaining JS code
if (module.hot) module.hot.accept(); // "enables hot module replacement"
import "core-js/stable"; // "enables polyfills"
import "regenerator-runtime/runtime"; //"enables polyfills for async JS"
import { animatedZoom } from "./animatedZoom.js";
import { allClickEvents } from "./clickEvents.js"; // must use .js extension or HTML thinks these are HTML files
import { allHoverEvents } from "./hoverEvents.js";
// Immediately execute the imported code to set the event listeners
allClickEvents();
allHoverEvents();
animatedZoom(); //@ must apply after click events (we change img brightness on click)

//% Game screenshots on the carousel

//% Past 640px, change the text for the login anchor on the navbar
const loginTextElement = document.querySelector(".nav__link--login span");
let width640 = window.matchMedia("(min-width: 450px)");

//% Change text depending on screen size. "log in" or "log in / sign up"
function handleTabletChange(e) {
  if (width640.matches) loginTextElement.textContent = "Log in / Sign up";
  else loginTextElement.textContent = "Log in";
}
// Register event listener
width640.addListener(handleTabletChange);
// Initial check
handleTabletChange(width640);
