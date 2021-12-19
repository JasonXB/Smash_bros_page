export const allHoverEvents = function () {
  const nintendoRed = "#f70018";
  const textGray = "#484848";
  //% Any nav__link
  const navLinks = Array.from(document.querySelectorAll(".nav__link")); // all nav__link 's
  navLinks.forEach((el) => {
    // Add red highlighting on hover (toggled class uses filter method)
    el.addEventListener("mouseenter", function (e) {
      // The nav links use either <a> or <div>'s as a parent container
      let parentContainer = e.target.closest("a");
      if (!parentContainer) parentContainer = e.target.closest("div");
      parentContainer.style.cursor = "pointer"; // make hands appear on hover
      // Add class that recolors the SVG and text red using the filter property
      parentContainer.classList.add("redFilter");
    });
    // Remove red highlights on exit
    el.addEventListener("mouseleave", (e) => {
      // The nav links use either <A> or <div>'s as a parent container
      let parentContainer = e.target.closest("a");
      if (!parentContainer) parentContainer = e.target.closest("div");
      // Remove class that recolors the SVG and text red using the filter property
      parentContainer.classList.remove("redFilter"); // targets SVG background
    });
  });

  //% nav__link in the gamenav
  const gamenav_anchors = Array.from(
    document.querySelectorAll(
      ".navbar .nav__sublink--shop, .navbar .nav__sublink--sales, .navbar .nav__sublink--soon, .navbar .nav__sublink--online, .navbar .nav__sublink--mobile"
    )
  );
  gamenav_anchors.forEach((el) => {
    // On hover, change the look of the individual gamenav SVG's
    el.addEventListener("mouseenter", (e) => {
      const parentContainer = e.target.closest("a");
      parentContainer.style.cursor = "pointer"; // make hands appear on hover
      // Color text red on hover
      parentContainer.lastElementChild.style.color = nintendoRed; // style anchors red
      parentContainer.style.color = nintendoRed; // style p tags red
      // Recolor SVG white while turning its background red
      const svgElement = parentContainer.firstElementChild;
      svgElement.style.backgroundColor = nintendoRed; // change SVG background color to red
      svgElement.firstChild.style.fill = "white"; // make our SVG white
    });
    // Return SVG's back to normal when you exit the parent container
    el.addEventListener("mouseleave", (e) => {
      const parentContainer = e.target.closest("a");
      // Undo the text recoloring
      parentContainer.lastElementChild.style.color = textGray; // targets <a> tags
      parentContainer.style.color = textGray; // targets <p> tags
      // Undo the SVG recoloring
      const svgElement = parentContainer.firstElementChild;
      svgElement.style.backgroundColor = "white"; // change our SVG background back to white
      svgElement.firstChild.style.fill = textGray; // change SVG color back to the original gray
    });
  });

  //% nav__link in the hardwarenav
  const hardwarenav_anchors = Array.from(
    document.querySelectorAll(
      ".nav__sublink--lineup, .nav__sublink--accessories, .nav__sublink--amiibo"
    )
  );
  hardwarenav_anchors.forEach((el) => {
    // On hover, change the background color to red and make the cursor a pointer
    el.addEventListener("mouseenter", (e) => {
      const parentContainer = e.target.closest("a");
      parentContainer.style.cursor = "pointer"; // make hands appear on hover
      parentContainer.lastElementChild.style.color = nintendoRed; // make spans red
      // Make the background red
      const svgElement = parentContainer.firstElementChild;
      svgElement.style.backgroundColor = nintendoRed;
    });
    // Undo the above changes when you exit the nav__link container
    el.addEventListener("mouseleave", (e) => {
      const parentContainer = e.target.closest("a");
      // Undo the text recoloring
      parentContainer.lastElementChild.style.color = textGray;
      // Undo the background recoloring
      const svgElement = parentContainer.firstElementChild;
      svgElement.style.backgroundColor = "white";
    });
  });
  //% Hovering over a game screenshot should make a magnifier animation play
  const screenshots = Array.from(document.querySelectorAll(".DLC .img"));
  screenshots.forEach((el) => {
    el.addEventListener("mouseenter", (i) => {
      // Set brightness of img to 70%
      el.style.setProperty("filter", "brightness(70%)");
      // Locate exact svg to reveal, then make it visible
      const svgClass = `mag${Array.from(el.classList)[1].slice(-1)}`;
      const svgIcon = document.querySelector("." + svgClass);
      svgIcon.style.setProperty("opacity", "1");
    });
    el.addEventListener("mouseleave", (i) => {
      // Revert brightness back to normal
      el.style.setProperty("filter", "brightness(100%)");
      // Locate exact svg to reveal, then make it visible
      const svgClass = `mag${Array.from(el.classList)[1].slice(-1)}`;
      const svgIcon = document.querySelector("." + svgClass);
      svgIcon.style.setProperty("opacity", "0");
    });
    el.addEventListener("click", (i) => {
      // Revert brightness back to normal
      el.style.setProperty("filter", "brightness(100%)");
      console.log(el);
      // Locate exact svg to reveal, then hide it
      const svgClass = `mag${Array.from(el.classList)[1].slice(-1)}`;
      const svgIcon = document.querySelector("." + svgClass);
      svgIcon.style.setProperty("opacity", "0");
    });
  });
};
