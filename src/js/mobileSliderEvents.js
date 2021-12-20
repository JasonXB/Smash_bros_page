// Thanks to the class names, the mobile slider nav links glow red when hovered
// Must code in the behavious where clicking on one adds a long lasting red highlight effect
export const mobileSliderEvents = function () {
  const mobileSlider = document.querySelector("nav.mobileSlider");
  const burgerIcon = document.querySelector("#burger");
  const gamesTab = document.querySelector(".mobileSlider .nav__link--games"); // <div> container
  const gamesNav = document.querySelector(".mobileSlider .gamenav"); // <section> container
  const hardwareNav = document.querySelector(".mobileSlider .hardwarenav"); // the navbar extension that pops up after hitting hardwareTab
  const hardwareTab = document.querySelector(
    ".mobileSlider .nav__link--hardware"
  );
  const upString = `<svg xmlns="http://www.w3.org/2000/svg" class="up navbar__object" viewBox="0 0 24 24"><path fill="#484848" d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>`;
  const downString = `<svg xmlns="http://www.w3.org/2000/svg" class="down navbar__object" viewBox="0 0 24 24"><path fill="#484848" d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>`;
  const focusableElements = Array.from(
    document.querySelectorAll(
      ".mobileSlider .nav__link:not(.nav__link--games, .nav__link--hardware)"
    ) // all elements that highlight red on hover aside from gamesTab and hardwareTab
  );
  //@ ——————————————————————————————————————————————————————
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
    gamesNav.classList.remove("open"); // closes the gamenav extension
    // Set hardware arrow down
    const arrowSVG = document.querySelector(
      ".mobileSlider .nav__link--games > svg:last-of-type"
    );
    const svgParent = arrowSVG.closest(".nav__link");
    arrowSVG.remove();
    svgParent.insertAdjacentHTML("beforeend", downString);
  };
  const resetHardwareTab = function () {
    hardwareTab.classList.remove("redFocusFilter");
    hardwareNav.classList.remove("open"); // closes the hardwarenav extension
    // Set hardware arrow down
    const arrowSVG = document.querySelector(
      ".mobileSlider .nav__link--hardware > svg:last-of-type"
    );
    const svgParent = arrowSVG.closest(".nav__link");
    arrowSVG.remove();
    svgParent.insertAdjacentHTML("beforeend", downString);
  };
  const focusGamesTab = function () {
    const gamesArrow = document.querySelector(
      ".mobileSlider .nav__link--games > svg:last-of-type"
    );
    // Open the nav extension and flip the arrow SVG
    gamesNav.classList.remove("hide"); // open nav extension
    gamesNav.classList.add("open"); // open nav extension
    flipArrowDirection(gamesArrow);
    // Apply filter class to gamesTab, and apply a border on the bottom
    gamesTab.classList.add("redFocusFilter");
    // Remove the class from all other nav__links
    resetHardwareTab();
    focusableElements.forEach((el) => {
      el.classList.remove("redFocusFilter"); // now remove it
    });
  };
  const focusHardwareTab = function () {
    const hardwareArrow = document.querySelector(
      ".mobileSlider .nav__link--hardware > svg:last-of-type"
    );
    // Open the nav extension and flip the arrow SVG
    hardwareNav.classList.remove("hide"); // open nav extension
    hardwareNav.classList.add("open"); // open nav extension
    flipArrowDirection(hardwareArrow);
    // Apply filter class to hardwareTab, and apply a border on the bottom
    hardwareTab.classList.add("redFocusFilter");
    // Remove the class from all other nav__links
    resetGamesTab();
    focusableElements.forEach((el) => {
      el.classList.remove("redFocusFilter"); // now remove it
    });
  };
  // Removes redFilterFocus tab from all elements it could be on
  const removeFocusFromAll = function () {
    if (gamesNav.classList.contains("open")) resetGamesTab();
    if (hardwareNav.classList.contains("open")) resetHardwareTab();
    focusableElements.forEach((k) => k.classList.remove("redFocusFilter"));
  };

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
    else {
      focusGamesTab();
    }
  });

  //% Hardware ▼ tab
  hardwareTab.addEventListener("click", function (e) {
    // If the hardwarenav extension to the navbar is active, revert the hardwareTab to its orig look
    // If it's not open, highlight the hardwareTab, and open up the navbar extension
    if (hardwareNav.classList.contains("open")) resetHardwareTab();
    else focusHardwareTab();
  });

  //@ Hovering the nav_links in the gamenav
  const anchors = Array.from(
    document.querySelectorAll(".mobileSlider .gamenav .nav__sublink")
  );
  const paths = Array.from(
    document.querySelectorAll(".mobileSlider .gamenav path")
  );
  let combined = anchors.map((el, i) => {
    return [el, paths[i]];
  });

  //@ Clicking on the burger icon
  burgerIcon.addEventListener("click", function (e) {
    // Code that closes the burger, slider
    if (mobileSlider.classList.contains("slideOnscreen")) {
      mobileSlider.classList.remove("slideOnscreen");
      document.querySelector("#overlay").classList.remove("reveal");
    }
    // Code that brings slider into view and turns the burger into an X
    else {
      mobileSlider.classList.add("slideOnscreen");
      document.querySelector("#overlay").classList.add("reveal");
      // Reset the slider's gamenav and hardwarenav if you open the slider again
      resetGamesTab();
      resetHardwareTab();
    }
  });
};
