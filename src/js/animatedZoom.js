import mediumZoom from "medium-zoom";

export const animatedZoom = function () {
  console.log("media zoom function ran");
  // Decide margin based on viewport size
  // Some margins look good on mobile but terrible on desktop & vice versa
  let margin = 50;
  // Set up the medium-zoom click event listener
  const zoomProtocol = mediumZoom(".zoom", {
    background: "rgba(0, 0, 0, 0.5)", // transparent dark filter
    offset: 0,
    margin, // determined by viewport size
  });
  const screenshot_cell = document.querySelector(".zoom");
  if (screenshot_cell)
    screenshot_cell.addEventListener("click", () => zoomProtocol.open());
};

// The zoom-desktop or zoom-mobile class will get added to img elements on click
// This behaviour is set in clickEvents.js
// The medium-zoom library will use these classes to decide which elements to zoom into
