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

//@ HOW TO MAKE ALL IMAGES THE SAME SIZE WHEN ZOOMED INTO
/* 

1. Take each image and resize them to the same width while maintaining their original ratio
   Use this tool: https://redketchup.io/image-resizer

2. Use the medium zoom library normally following these instructions and the above code
   https://github.com/francoischalifour/medium-zoom#:~:text=import%20the%20library%20as%20a%20module%3A
   
*/
