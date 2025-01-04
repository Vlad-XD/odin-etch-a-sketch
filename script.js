// find our grid container div
const flexContainer = document.querySelector(".grid-container");

// use loop to create 16 grids
for(let i = 0; i < 16; i++) {
  let newGrid = document.createElement("div");
  newGrid.className = "grid-square";
  flexContainer.appendChild(newGrid);
  print(i);
}

function print(text){
  console.log(text);
}