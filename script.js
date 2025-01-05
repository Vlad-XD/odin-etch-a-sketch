// variable initializations
const DEFAULT_GRID_SIZE = 16;
const MIN_USER_INPUT = 1;
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

// create initial grid
createGrid(DEFAULT_GRID_SIZE, gridBox, GRID_BOX_DIMENSIONS, GRID_BOX_PADDING);

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
      destroyGrid(gridBox);
      createGrid(userInputInt, gridBox, GRID_BOX_DIMENSIONS);
    }
    
  } while(!validInputEntered);


})

/*
  createGrid: adds drawables grids to the passed gridBox element.
              Number of grids based on passed gridSize argument. Utilizes
              passed gridBox properties to size drawable grids.
  Parameters: int gridSize, <div> gridBox, int gridBoxDimension
  Return value: N/A
*/

function createGrid(gridSize, gridBox, gridBoxDimension) {

  // use loops to create rows
 
  for(let i = 0; i < gridSize; i++) {
    let gridContainer = document.createElement("div");
    gridContainer.className = "grid-container";

    // use loop to create grids
    for(let i = 0; i < gridSize; i++) {
      // create new square grid
      let newGrid = document.createElement("div");
      newGrid.className = "grid-square";

      // calculate square grid dimensions
      let gridDimension = calcGridDim(gridSize, gridBoxDimension);
      newGrid.style.width = `${gridDimension}px`;
      newGrid.style.height = `${gridDimension}px`;

      // add hover listener to grid
      newGrid.addEventListener("mousemove", (e) => {
        e.currentTarget.style.backgroundColor = getRandomColorString();
      }, {once: true});

      // append square grid
      gridContainer.appendChild(newGrid);
    }

    // append row
    gridBox.appendChild(gridContainer);

  }

}

/*
  destroyGrid: destroys existing grids of passed gridBox element.
  Parameters: <div> gridBox
  Return value: N/A
*/

function destroyGrid(gridBox) {

  const gridBoxRows = document.querySelectorAll(`.grid-container`);
  gridBoxRows.forEach((row) => {

    const gridContainerChildren = row.childNodes;
    gridContainerChildren.forEach((grid) => {
      row.removeChild(grid);
    })

    gridBox.removeChild(row);
})

}

/*
  calcGridDim: given the number of grids and the dimension/padding of the
               box containing the grids, returns the grid dimension to make
               the squares fit evenly in the grid.
  Parameters: int gridSize, int boxDimension, int boxPadding
  Return value: float gridDimension
*/

function calcGridDim(gridSize, boxDimension) {
  // variable initializations
  let GRID_BORDER_SIZE = 1;
  let gridDimension = (boxDimension-((gridSize+1)*GRID_BORDER_SIZE))/gridSize;
  return gridDimension;
  
}

/*
  getRandomColorString: given the number of grids and the dimension/padding of the
               box containing the grids, returns the grid dimension to make
               the squares fit evenly in the grid.
  Parameters: N/A
  Return value: string with color (in rgb notation)
*/

function getRandomColorString() {
  return (`rgb(${getRandomIntInclusive(0,255)},
               ${getRandomIntInclusive(0,255)},
               ${getRandomIntInclusive(0,255)})`);
}


// ***** fucntion I borrowed from MDF Math.random() reference page
/*
  getRandomInclusive: given a min and a max, return a random integer within
                      that range, including the passed min and max.
  Parameters: number min, number max
  Return value: integer
*/
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
