import mediumZoom from "medium-zoom";
//^ The following code is messing up for some reason, halting the remaining JS code
if (module.hot) module.hot.accept(); // "enables hot module replacement"
import "core-js/stable"; // "enables polyfills"
import "regenerator-runtime/runtime"; //"enables polyfills for async JS"
import { clickEvents } from "./clickEvents.js"; // must use .js extension or HTML thinks these are HTML files
import { allHoverEvents } from "./hoverEvents.js";
import { animatedZoom } from "./animatedZoom.js"; //@ must apply after click events (we change img brightness on click)
import { mobileSliderEvents } from "./mobileSliderEvents";
// Immediately execute the imported code
clickEvents();
allHoverEvents();
mobileSliderEvents();
animatedZoom(); //@ must apply after click events (we change img brightness on click)

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

// Close some webpage elements whenever the user changes his/her viewport size
window.addEventListener("resize", () => {
  // Hide the overlay and mobile slider
  document.querySelector("#overlay").classList.remove("reveal");
  document.querySelector(".mobileSlider").classList.remove("slideOnscreen");
  // Close the burger icon
  document.querySelector("#burger").classList.remove("open");
  // Remove focus from every nav__link on the mobile Slider and regular navbar
  // prettier-ignore
  const sliderAnchors= Array.from(document.querySelectorAll("nav.mobileSlider .nav__link, nav.mobileSlider .nav__sublink"));
  //  prettier-ignore
  const navAnchors = Array.from(document.querySelectorAll("nav.navbar .nav__link, nav.navbar .nav__sublink"));
  sliderAnchors.concat(navAnchors).forEach((el) => {
    el.classList.remove("redFocusFilter");
  });
  // Close the regular navbar's gamenav and hardwarenav
  
});
