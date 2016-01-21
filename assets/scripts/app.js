var player1 = new Player("Sam","novice", "", [], 0);

var rows = ["A","B","C","D","E","F","G","H","I","J"];
var grid =  createGrid(rows);
var shipYard = createShips(2,2);

var missilesFired = 0;


function Ship(Size) {  
  this.hits=0;
  this.isSunk = function() {
    if (this.hits < this.size) {
      return false;
    } else {
      return true;
    }
  }
}

function createShips(totalShips, shipSize) {
  var ships = [];
  for (var i = 0; i < totalShips; i++) {
    ships.push(new Ship(shipSize));
  }
  return ships;
}

function createGrid(rows) {
  var grid = {};
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    grid[row] = [];
    for (var col = 0; col < rows.length; col++) {
      grid[row][col] = {name: row + col};
    }
  }
  return grid;
}

function fireMissile() {
  var coords = document.getElementById("user-guess").value;
  coords = parseInput(coords);
  var row = coords['row'];
  var col = coords['col'];
  checkHit(row, col);
  
}

function parseInput(coords) {
    var row = coords[0].toUpperCase();
    var col = coords[1] - 1;
  return {'row': row,
          'col': col}
}

function checkHit(row, col) {
  var cell = grid[row][col];
  if (cell.firedAt) {
    alert("Invalid Location: Already fired at" + row + col)
    return
  } else {
    cell.firedAt = true;
  }
  if (cell.ship) {
    cell.ship.hits += 1;
    cell.text = "Hit";
    if(cell.ship.isSunk()) {
      alert("You sank my battleship");
    } 
  } else {
    cell.text = "MISS";
  }  
}



function Player(name, rating, currentGuess, guesses, numberGuesses) {
  this.name = name;
  this.rating = rating;
  this.currentGuess = currentGuess;
  this.Guesses = guesses;
  this.numberGuesses = numberGuesses; 
}

function isPositionOccupied(rowIndex, colIndex) {
    if (grid[rowIndex][colIndex] !== "") {
        return false
    }
   return true
}

function checkShipPosition(ship,direction, rowIndex, colIndex) {
    var positionOccupied;
    if (direction === 0) {
        var finalRowIndex = rowIndex + ship.size;
        if (finalRowIndex < rows.length) {          
            for (var i = rowIndex; i < finalRowIndex; i++) {
                positionOccupied = isPositionOccupied(i,colIndex);
                if (positionOccupied) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
        
    } else {
        var finalColIndex = colIndex + ship.size;      
        if (finalColIndex < rows.length) {
           for (var i = colIndex; i < finalColIndex; i++) {
               positionOccupied = isPositionOccupied(rowIndex,i)
               if (positionOccupied) {
                   return false;
               }
           }
           return true;
        } else {
            return false;
        }
        
    }

}

function hideShip(ship){
  ship.isHit=false;
  var ifEmpty = false;
  while (!ifEmpty) {
    var direction = Math.round(Math.random());
    var rowIndex = Math.floor(Math.random()*grid.length);
    var colIndex = Math.floor(Math.random());
    ifEmpty = checkShipPosition(ship,direction, rowIndex, colIndex);
    if (ifEmpty) {
      grid[rowIndex][colIndex] = ship;
    }      
  }

  
}
 
function alert1(messege1) {
  alert(messege1);
}
 
hideShip(Ship);