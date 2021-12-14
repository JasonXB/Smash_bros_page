export const allClickEvents = function () {
  // const nintendoRed = "#f70018";
  // const textGray = "#484848";
  const burgerIcon = document.querySelector("#burger");
  const gamesTab = document.querySelector(".navbar2 > .nav__link--games"); // <div> container
  const gamesNav = document.querySelector(".gamenav"); // <section> container
  const gamesArrow = document.querySelector(
    ".nav__link--games > object:last-child"
  );
  const hardwareNav = document.querySelector(".hardwarenav"); // the navbar extension that pops up after hitting hardwareTab
  const hardwareTab = document.querySelector(".navbar2 > .nav__link--hardware");
  const hardwareArrow = document.querySelector(
    ".nav__link--hardware > object:last-child"
  );
  const focusableElements = Array.from(
    document.querySelectorAll(
      ".nav__link:not(.nav__link--games, .nav__link--hardware)"
    ) // all elements that highlight red on hover aside from gamesTab and hardwareTab
  );
  // Utility functions
  const flipArrowDirection = function (objectSVG) {
    if (objectSVG.data.includes("down.svg"))
      objectSVG.data = "src/images/navbar/up.svg";
    else objectSVG.data = "src/images/navbar/down.svg";
    return;
  };
  const setArrowDown = function (objectSVG) {
    objectSVG.data = "src/images/navbar/down.svg";
    return;
  };
  // Click event action helper functions
  const resetGamesTab = function () {
    gamesTab.classList.remove("redFocusFilter");
    gamesTab.style.borderBottom = "0px";
    setArrowDown(
      document.querySelector(".nav__link--games > object:last-child")
    );
    gamesNav.classList.remove("open"); // closes the gamenav extension
  };
  const resetHardwareTab = function () {
    hardwareTab.classList.remove("redFocusFilter");
    hardwareTab.style.borderBottom = "0px";
    setArrowDown(
      document.querySelector(".nav__link--hardware > object:last-child")
    );
    hardwareNav.classList.remove("open"); // closes the hardwarenav extension
  };
  const focusGamesTab = function () {
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

  // Clicking outside the navbar should remove the redFocusFilter class from all nav__links
  document.addEventListener("click", function (e) {
    const isClickInside = document.querySelector(".navbar").contains(e.target);
    if (!isClickInside) removeFocusFromAll();
  });


};
