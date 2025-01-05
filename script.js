// variable initializations
const DEFAULT_GRID_SIZE = 16;
const MIN_USER_INPUT = 10;
const MAX_USER_INPUT = 100;
const INITIAL_PROMPT_MESSAGE = "Input a new grid size: ";
const INVALID_PROMPT_MESSAGE = "Not a valid input!\nEnter new input:";
const MAX_LIMIT_PROMPT_MESSAGE = `Maximum grid size is ${MAX_USER_INPUT}.\nEnter new input:`;
const MIN_LIMIT_PROMPT_MESSAGE = `Minimum grid size is ${MIN_USER_INPUT}.\nEnter new input:`;

// find our grid container div
const flexContainer = document.querySelector(".grid-container");

// create initial grid
createGrid(DEFAULT_GRID_SIZE, flexContainer);

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
      createGrid(userInputInt, flexContainer);
    }
    
  } while(!validInputEntered);


})

/*
  createGrid: adds drawables grids to the pass gridContainer element.
              Number of grids based on passed gridSize argument.
  Parameters: int gridSize, <div> gridContainer
  Return value: N/A
*/

function createGrid(gridSize, gridContainer) {
  // use loop to create grids
  for(let i = 0; i < gridSize; i++) {
    // create new square grid
    let newGrid = document.createElement("div");
    newGrid.className = "grid-square";

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