export const allClickEvents = function () {
  const burgerIcon = document.querySelector("#burger");
  const gamesTab = document.querySelector(".navbar2 > .nav__link--games"); // <div> container
  const gamesNav = document.querySelector(".gamenav"); // <section> container
  const hardwareNav = document.querySelector(".hardwarenav"); // the navbar extension that pops up after hitting hardwareTab
  const hardwareTab = document.querySelector(".navbar2 > .nav__link--hardware");
  const upString = `<svg xmlns="http://www.w3.org/2000/svg" class="up navbar__object" viewBox="0 0 24 24"><path fill="#484848" d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>`;
  const downString = `<svg xmlns="http://www.w3.org/2000/svg" class="down navbar__object" viewBox="0 0 24 24"><path fill="#484848" d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>`;
  const focusableElements = Array.from(
    document.querySelectorAll(
      ".nav__link:not(.nav__link--games, .nav__link--hardware)"
    ) // all elements that highlight red on hover aside from gamesTab and hardwareTab
  );

  // Utility functions
  const flipArrowDirection = function (initialSVG) {
    const svgParent = initialSVG.closest(".nav__link");
    // If arrow class="down", switch to an upward arrow SVG
    if (initialSVG.classList.contains("down")) {
      initialSVG.remove();
      svgParent.insertAdjacentHTML("beforeend", upString);
    }
    // If arrow class="up", switch to an downward arrow SVG
    else {
      initialSVG.remove();
      svgParent.insertAdjacentHTML("beforeend", downString);
    }
    return;
  };

  // Click event action helper functions
  const resetGamesTab = function () {
    gamesTab.classList.remove("redFocusFilter");
    gamesTab.style.borderBottom = "0px";
    gamesNav.classList.remove("open"); // closes the gamenav extension
    // Set hardware arrow down
    const arrowSVG = document.querySelector(
      ".nav__link--games > svg:last-of-type"
    );
    const svgParent = arrowSVG.closest(".nav__link");
    arrowSVG.remove();
    svgParent.insertAdjacentHTML("beforeend", downString);
  };
  const resetHardwareTab = function () {
    hardwareTab.classList.remove("redFocusFilter");
    hardwareTab.style.borderBottom = "0px";
    hardwareNav.classList.remove("open"); // closes the hardwarenav extension
    // Set hardware arrow down
    const arrowSVG = document.querySelector(
      ".nav__link--hardware > svg:last-of-type"
    );
    const svgParent = arrowSVG.closest(".nav__link");
    arrowSVG.remove();
    svgParent.insertAdjacentHTML("beforeend", downString);
  };
  const focusGamesTab = function () {
    const gamesArrow = document.querySelector(
      ".nav__link--games > svg:last-of-type"
    );
    // Open the nav extension and flip the arrow SVG
    gamesNav.classList.toggle("open"); // open nav extension
    flipArrowDirection(gamesArrow);
    // Apply filter class to gamesTab, and apply a border on the bottom
    gamesTab.classList.add("redFocusFilter");
    gamesTab.style.borderBottom = "3px solid #f70018";
    // Remove the class from all other nav__links
    resetHardwareTab();
    focusableElements.forEach((el) => {
      el.classList.remove("redFocusFilter"); // now remove it
    });
  };
  const focusHardwareTab = function () {
    const hardwareArrow = document.querySelector(
      ".nav__link--hardware > svg:last-of-type"
    );
    // Open the nav extension and flip the arrow SVG
    hardwareNav.classList.toggle("open"); // open nav extension
    flipArrowDirection(hardwareArrow);
    // Apply filter class to hardwareTab, and apply a border on the bottom
    hardwareTab.classList.add("redFocusFilter");
    hardwareTab.style.borderBottom = "3px solid #f70018";
    // Remove the class from all other nav__links
    resetGamesTab();
    focusableElements.forEach((el) => {
      el.classList.remove("redFocusFilter"); // now remove it
    });
  };
  const removeFocusFromAll = function () {
    if (gamesNav.classList.contains("open")) resetGamesTab();
    if (hardwareNav.classList.contains("open")) resetHardwareTab();
    focusableElements.forEach((k) => k.classList.remove("redFocusFilter"));
  }; // removes redFilterFocus tab from all elements it could be on

  //% Burger Icon
  burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("open"); // toggle "open" class
    removeFocusFromAll(); // should remove focus from all nav__links
  });

  //% All nav__links should divert redFocusFilter to the one clicked
  focusableElements.forEach((element) => {
    element.addEventListener("click", function (clickedEl) {
      // Apply the redFocusFilter class to the element
      element.classList.toggle("redFocusFilter");
      // Remove class from every other nav__link
      if (gamesNav.classList.contains("open")) resetGamesTab();
      if (hardwareNav.classList.contains("open")) resetHardwareTab();
      const allButThisElement = focusableElements.filter((el) => {
        return el !== element;
      });
      allButThisElement.forEach((k) => k.classList.remove("redFocusFilter"));
    });
  });

  //% Games ▼ tab
  gamesTab.addEventListener("click", function (e) {
    // If the gamenav extension to the navbar is active, revert the gamesTab to its orig look
    // If it's not open, highlight the gamesTab, and open up the navbar extension
    if (gamesNav.classList.contains("open")) resetGamesTab();
    else focusGamesTab();
  });

  //% Hardware ▼ tab
  hardwareTab.addEventListener("click", function (e) {
    // If the hardwarenav extension to the navbar is active, revert the hardwareTab to its orig look
    // If it's not open, highlight the hardwareTab, and open up the navbar extension
    if (hardwareNav.classList.contains("open")) resetHardwareTab();
    else focusHardwareTab();
  });

  //% Clicking outside the navbar should remove the redFocusFilter class from all nav__links
  document.addEventListener("click", function (e) {
    const isClickInside = document.querySelector(".navbar").contains(e.target);
    if (!isClickInside) removeFocusFromAll();
  });

  //% Clicking on the Slide Down Menu elements
  // prettier-ignore
  const labels = Array.from(document.querySelectorAll(".menu1, .menu2 , .menu3 , .menu4"));
  labels.forEach((el) => {
    el.addEventListener("click", function () {
      // Define template literal strings for up and down arrows
      const upString = `<svg xmlns="http://www.w3.org/2000/svg" class="up"  width="20px" viewBox="0 0 24 24"><path fill="rgb(22, 96, 160)" d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>`;
      const downString = `<svg xmlns="http://www.w3.org/2000/svg" class="down" width="20px" viewBox="0 0 24 24"><path fill="rgb(22, 96, 160)" d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>`;
      // Locate the arrow SVG currently displayed
      const arrowSVG = document.querySelector(
        `.${el.classList[0]} label > svg`
      );
      // Locate the label element that houses that SVG
      const parentLabel = document.querySelector(`.${el.classList[0]} label`);
      // Determine whether the SVG displayed now points up or down
      const direction = arrowSVG.classList[0]; // equals "up" or "down"

      // If you click on this element, add a class to the div
      el.classList.toggle("clicked");
      // If the arrow points down, switch SVG's so it points up
      if (direction === "down") {
        arrowSVG.remove();
        parentLabel.insertAdjacentHTML("beforeend", upString);
      }
      // If the arrow points down, change the SVG so it points up
      else {
        arrowSVG.remove();
        parentLabel.insertAdjacentHTML("beforeend", downString);
      }
    });
  });
  const downButton = document.querySelector(".temp1");
  const upButton = document.querySelector(".temp2");
  console.log(downButton, upButton);
  const nav = document.querySelector(".navbar");

  downButton.addEventListener("click", function (e) {
    console.log("down");
    nav.classList.add("slideDown");
    nav.classList.remove("slideUp");
  });
  upButton.addEventListener("click", function (e) {
    console.log("up");
    nav.classList.add("slideUp");
    nav.classList.remove("slideDown");
  });
};
