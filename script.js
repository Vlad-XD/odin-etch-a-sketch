// variable initializations
const DEFAULT_GRID_SIZE = 16;
const MIN_USER_INPUT = 10;
const MAX_USER_INPUT = 100;
const INITIAL_PROMPT_MESSAGE = "Input a new grid size: ";
const INVALID_PROMPT_MESSAGE = "Not a valid input!\nEnter new input:";
const MAX_LIMIT_PROMPT_MESSAGE = `Maximum grid size is ${MAX_USER_INPUT}.\nEnter new input:`;
const MIN_LIMIT_PROMPT_MESSAGE = `Minimum grid size is ${MIN_USER_INPUT}.\nEnter new input:`;
const GRID_BOX_DIMENSIONS = 1000;
const GRID_BOX_PADDING = 50;

// set dimensions and padding of grid box containing grid container/grids
const gridBox = document.querySelector(".grid-box");
gridBox.style.width = `${GRID_BOX_DIMENSIONS}px`;
gridBox.style.height = `${GRID_BOX_DIMENSIONS}px`;
gridBox.style.padding = `${GRID_BOX_PADDING}px`;

// find our grid container div
const flexContainer = document.querySelector(".grid-container");

// create initial grid
createGrid(DEFAULT_GRID_SIZE, flexContainer, GRID_BOX_DIMENSIONS, GRID_BOX_PADDING);

// when input button is pressed, prompt user for new grid size
const inputButton = document.querySelector("#input-button");
inputButton.addEventListener("click", () => {
  let validInputEntered = false;
  let userInput = prompt(INITIAL_PROMPT_MESSAGE);
  let userInputInt = parseInt(userInput);
  do {

    //check if user canceled prompt
    if (userInput === null) {
      break;
    } else {
      // no numbers with decimals allowed (even if it is technically whole)
      //  e.g., "1.0" is not a valid input, sorry!
      if (userInput.includes(".")){
        userInputInt = NaN;
      } else {
        userInputInt = Number(userInput);
      }
    }
    
    // test user input
    if (!userInputInt || !Number.isInteger(userInputInt)){
      userInput = prompt(INVALID_PROMPT_MESSAGE);
      continue;
    } else if (userInputInt > MAX_USER_INPUT) {
      userInput = prompt(MAX_LIMIT_PROMPT_MESSAGE);
      continue;
    } else if (userInputInt < MIN_USER_INPUT) {
      userInput = prompt(MIN_LIMIT_PROMPT_MESSAGE);
      continue;
    } else {
      validInputEntered = true;
      // delete old grid and make new grid
      destroyGrid(flexContainer);
      createGrid(userInputInt, flexContainer, GRID_BOX_DIMENSIONS, GRID_BOX_PADDING);
    }
    
  } while(!validInputEntered);


})

/*
  createGrid: adds drawables grids to the pass gridContainer element.
              Number of grids based on passed gridSize argument. Utilizes
              passed gridBox properties to size drawable grids.
  Parameters: int gridSize, <div> gridContainer, <div> gridBox
  Return value: N/A
*/

function createGrid(gridSize, gridContainer, gridBoxDimension, gridBoxPadding) {
  // use loop to create grids
  for(let i = 0; i < gridSize**2; i++) {
    // create new square grid
    let newGrid = document.createElement("div");
    newGrid.className = "grid-square";

    // calculate square grid dimensions
    let gridDimension = calcGridDim(gridSize, gridBoxDimension, gridBoxPadding);
    newGrid.style.width = `${gridDimension}px`;
    newGrid.style.height = `${gridDimension}px`;

    // add hover listener to grid
    newGrid.addEventListener("mousemove", (e) => {
      e.currentTarget.style.backgroundColor = "black";
    })

    // append square grid
    gridContainer.appendChild(newGrid);
  }

}

/*
  destroyGrid: destroys existing grids of passed gridContainer element.
  Parameters: <div> gridContainer
  Return value: N/A
*/

function destroyGrid(gridContainer) {
  const gridContainerChildren = document.querySelectorAll(`.${gridContainer.className} > .grid-square`);
  gridContainerChildren.forEach((grid) => {
    gridContainer.removeChild(grid);
  })
}

/*
  calcGridDim: given the number of grids and the dimension/padding of the
               box containing the grids, returns the grid dimension to make
               the squares fit evenly in the grid.
  Parameters: int gridSize, int boxDimension, int boxPadding
  Return value: float gridDimension
*/

function calcGridDim(gridSize, boxDimension, boxPadding) {
  // variable initializations
  let gridDimension = (boxDimension)/gridSize;
  return gridDimension;
  
}