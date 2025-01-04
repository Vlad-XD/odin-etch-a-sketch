// variable initializations
let PIXEL_WIDTH = "5px";
let PIXEL_HEIGHT = PIXEL_WIDTH;

// find our grid container div
const flexContainer = document.querySelector(".grid-container");

// use loop to create 16 grids
for(let i = 0; i < 16; i++) {
  // create new square grid
  let newGrid = document.createElement("div");
  newGrid.className = "grid-square";

  // add hover listener to grid
  newGrid.addEventListener("mousemove", (e) => {

    // create a "pixel" box and add to the container where mouse hovers
    let pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.minWidth = PIXEL_WIDTH;
    pixel.style.minHeight = PIXEL_HEIGHT;
    pixel.style.backgroundColor = "black";
    pixel.style.position = "absolute";
    //without setting pointerEvents to none, pixels can cause offsetX/Y to be incorrect
    pixel.style.pointerEvents = "none"; 
    let rect = e.currentTarget.getBoundingClientRect();
    pixel.style.left = `${e.offsetX}px`;
    pixel.style.top = `${e.offsetY}px`;
    e.currentTarget.appendChild(pixel);
    // console.log(`Target: ${e.currentTarget.className} X: Y:`);
  })

  // append square grid
  flexContainer.appendChild(newGrid);
}
