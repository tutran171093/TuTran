//-------------------------------------------------------------
// Game configuration data
//-------------------------------------------------------------

// This is a numerical representation of the pacman game.
// It uses numbers to represent walls, coins, empty space, and pacman.
let gameData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,2,1,1,1,2,1,2,1,2,1,1,2,1,2,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,5,2,2,2,2,1,2,2,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,2,1,2,1,1,2,1,2,1,2,1,1,1,2,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Specifically, a wall is represented by the number 1,
// a coin is the number 2, empty ground is the number 3,
// and Pacman is the number 5.


// In our code below, we want to be able to refer to names of things,
// and not numbers. To make that possible, we set up a few labels.
const WALL   = 1;
const COIN   = 2;
const GROUND = 3;
const PACMAN = 5;


// We will use the identifier "map" to refer to the game map.
// We won't assign this until later on, when we generate it
// using the gameData.
let map;

// We need to keep track of Pacman's location on the game board.
// That is done through a pair of coordinates.
// And, we will keep track of what direction she is facing.
let pacman = {
  x: 12,
  y: 5,
  direction: 'right'
};


setInterval( function() {
	moveAuto(gameData, pacman.x, pacman.y); 
}, 500);

document.getElementById("btnResetCoin").addEventListener("click", function() {
	for(var i = 1; i < gameData.length - 1; i++) {
		for(var j = 1; j < gameData[0].length - 1; j++) {
			if(gameData[i][j] != WALL) {
				if(Math.floor((Math.random() * 10) + 1) > 8) {
					gameData[i][j] = COIN;
				}
				else
					gameData[i][j] = GROUND;
			}
		}
	}
});

var nearestCoin = findNearestCoin(gameData, pacman.x, pacman.y);
var moveStore = [[0, 0],[0,0],[0,0]];
function moveAuto(gameData, xTarget, yTarget) {
	
	if(pacman.x == xTarget && pacman.y == yTarget) {
    	nearestCoin = findNearestCoin(gameData, pacman.x, pacman.y);
    }
	var direction = findNextMove(gameData, pacman.x, pacman.y, nearestCoin[0], nearestCoin[1]);
	if(direction == 1)
		moveDown();
	else if(direction == 2)
		moveUp();
	else if(direction == 3)
		moveRight();
	else if(direction == 4)
		moveLeft();
	eraseMap();
    drawMap();
    if(pacman.x == xTarget && pacman.y == yTarget) {
    	nearestCoin = findNearestCoin(gameData, pacman.x, pacman.y);
    }
}

function findNextMove(gameData, xStart, yStart, xTarget, yTarget) {
	var lowestCost = 999;
	var direction = 0;
	if (gameData[yStart+1][xStart] !== WALL) {
		var h = Math.abs(xStart - xTarget) + Math.abs((yStart + 1) - yTarget);
		if(h < lowestCost && !checkMoveStore(xStart, yStart + 1)) {
			lowestCost = h;
			direction = 1;
		}
	}
	if (gameData[yStart-1][xStart] !== WALL) {
		var h = Math.abs(xStart - xTarget) + Math.abs((yStart - 1) - yTarget);
		if(h < lowestCost && !checkMoveStore(xStart, yStart - 1)) {
			lowestCost = h;
			direction = 2;
		}
	}
	if (gameData[yStart][xStart+1] !== WALL) {
		var h = Math.abs((xStart + 1) - xTarget) + Math.abs(yStart - yTarget);
		if(h < lowestCost && !checkMoveStore(xStart + 1, yStart)) {
			lowestCost = h;
			direction = 3;
		}
	}
	if (gameData[yStart][xStart-1] !== WALL) {
		var h = Math.abs((xStart - 1) - xTarget) + Math.abs(yStart - yTarget);
		if(h < lowestCost && !checkMoveStore(xStart - 1, yStart)) {
			lowestCost = h;
			direction = 4;
		}
	}
	moveStore.pop();
	moveStore.push([xStart, yStart]);
	return direction;
}

function checkMoveStore(x, y) {
	for(var i = 0; i < moveStore.length; i++) {
		if(moveStore[i][0] == x && moveStore[i][1] == y)
			return true;
	}
	return false;
}

function findNearestCoin(gameData, xStart, yStart) {
	var xTarget, yTarget;
	var lowestCost = 1000;
	for(var i = 1; i < gameData.length - 1; i++) {
		for(var j = 1; j < gameData[0].length - 1; j++) {
			if(gameData[i][j] == COIN) {
				var h = Math.abs(xStart - j) + Math.abs(yStart - i);
				if(h < lowestCost) {
					lowestCost = h;
					xTarget = j;
					yTarget = i;
				}
			}
		}
	}
	return [xTarget, yTarget];
}



//-------------------------------------------------------------
// Game map creation functions
//-------------------------------------------------------------
// This function converts gameData into DOM elements.
function createTiles(data) {

  // We'll keep the DOM elements in an array.
  let tilesArray = [];

  // Let's take one row at a time...
  for (let row of data) {

    // Then look at each column in that row.
    for (let col of row) {

      // We create a game tile as a div element.
      let tile = document.createElement('div');

      // We assign every tile the class name tile.
      tile.classList.add('tile');

      // Now, depending on the numerical value,
      // we need to add a more specific class.
      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === COIN) {
        tile.classList.add('coin');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      } else if (col === PACMAN) {
        tile.classList.add('pacman');

        // For Pacman, we will add yet another
        // class for the direction pacman is facing.
        tile.classList.add(pacman.direction);

      }

      // Now that our individual tile is configured,
      // we add it to the tilesArray.
      tilesArray.push(tile);
    }

    // Once we reach the end of a row, we create a br element,
    // which tells the browser to create a line break on the page.
    let brTile = document.createElement('br');

    // We then add that br element to the tilesArray.
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array
  // of configured tiles.
  return tilesArray;
}

// This function creates a map element, fills it with tiles,
// and adds it to the page.
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

// This function removes the map element from the page.
function eraseMap() {
  document.body.removeChild(map);
}

//-------------------------------------------------------------
// Movement functions
//-------------------------------------------------------------

// Each function does the following:
// - set pacman's direction so that we show the correct image
// - check to see if we hit a wall
// - if we didn't hit a wall, set pacman's old location to empty space
// - update pacman's location
// - draw pacman in the new location


function moveDown() {
  pacman.direction = 'down';
  if (gameData[pacman.y+1][pacman.x] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y + 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveUp() {
  pacman.direction = 'up';
  if (gameData[pacman.y-1][pacman.x] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y - 1;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveLeft() {
  pacman.direction = 'left';
  if (gameData[pacman.y][pacman.x-1] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x - 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveRight() {
  pacman.direction = 'right';
  if (gameData[pacman.y][pacman.x+1] !== WALL) {
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x + 1 ;
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}


// This function sets up the listener for the whole page.
// Specifically, when the user presses a key, we run a function
// that handles that key press.
function setupKeyboardControls() {
  document.addEventListener('keydown', function (e) {

    // As far as the browser is concerned, each key on the keyboard
    // is associated with a numeric value.
    // After some experimenting, you can discover which numeric values
    // correspond to the arrow keys.

    // Each time the user moves, we recalculate Pacman's location,
    // update the
    if (e.keyCode === 37) {         // left arrow is 37
      moveLeft();

    } else if (e.keyCode === 38) {  // up arrow is 38
      moveUp();

    } else if (e.keyCode === 39){   // right arrow is 39
      moveRight();

    } else if (e.keyCode === 40){   // down arrow is 40
      moveDown();
    }

    // After every move, we erase the map and redraw it.
    eraseMap();
    drawMap();
  });
}

//-------------------------------------------------------------
// Main game setup function
//-------------------------------------------------------------
function main() {
  // Initialize the game by drawing the map and setting up the
  // keyboard controls.
  drawMap();
  setupKeyboardControls();
}

// Finally, after we define all of our functions, we need to start
// the game.
main();
