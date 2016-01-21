var grid =  [, , ];
var missilesFired = 0;
var battleship = new Ship(5);
createShips(2,2)
var rows = ["A","B","C","D","E","F","G","H","I","J"];

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

var player1 = new Player("Sam","novice", "", [], 0);

function Player(name, rating, currentGuess, guesses, numberGuesses) {
  this.name = name;
  this.rating = rating;
  this.currentGuess = currentGuess;
  this.Guesses = guesses;
  this.numberGuesses = numberGuesses; 
}

var ship = {isHit: false};

function hideShip(){
  ship.isHit=false;
  var ranIndex = Math.floor(Math.random()*grid.length);
  grid[ranIndex] = ship;
}
 
function alert1(messege1) {
  alert(messege1);
}
 
hideShip();