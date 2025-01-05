// variable initializations
let PIXEL_WIDTH = "5px";
let PIXEL_HEIGHT = PIXEL_WIDTH;

// find our grid container div
const flexContainer = document.querySelector(".grid-container");

// use loop to create 16 grids
for(let i = 0; i < 64; i++) {
  // create new square grid
  let newGrid = document.createElement("div");
  newGrid.className = "grid-square";

  // add hover listener to grid
  newGrid.addEventListener("mousemove", (e) => {
    e.currentTarget.style.backgroundColor = "black";
  })

  // append square grid
  flexContainer.appendChild(newGrid);
}
