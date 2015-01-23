"use strict";

// Grid arrows
var grid = [["top left",    "top middle",    "top right"],
            ["bottom left", "bottom middle", "bottom right"]];

// 8 directions
var directions = {
  "n":  new Life.Vector( 0, -1),
  "ne": new Life.Vector( 1, -1),
  "e":  new Life.Vector( 1,  0),
  "se": new Life.Vector( 1,  1),
  "s":  new Life.Vector( 0,  1),
  "sw": new Life.Vector(-1,  1),
  "w":  new Life.Vector(-1,  0),
  "nw": new Life.Vector(-1, -1)
};

// namespace for electronic life
var Life = {
	// Vector constructor
	Vector: function (x, y) {
	  this.x = x;
	  this.y = y;
	},
	// Grid constructor
	Grid: function (width, height) {
	  this.space = new Array (width * height);
	  this.width = width;
	  this.height = height;
	},

	elementFromChar: function (legend, ch) {
	  if (ch == " ")
	    return null;
	  var element = new legend[ch]();
	  element.originChar = ch;
	  return element;
	}
	// Word constructor
	World: function (map, legend) {
	  var grid = new Life.Grid(map[0].length, map.length);
	  this.grid = grid;
	  this.legend = legend;

	  map.forEach(function(line, y) {
	    for (var x = 0; x < line.length; x++)
	      grid.set(new Vector(x, y),
	               elementFromChar(legend, line[x]));
  		});
	}
};

// VECTOR ------------
Life.Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
// -------------------


// GRID --------------
Life.Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};

Life.Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};

Life.Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
// -------------------

/// TEST
var grid = new Life.Grid(10, 10);

console.log(grid.get(new Life.Vector(1, 1)));
// → undefined
grid.set(new Life.Vector(1, 1), "X");
console.log(grid.get(new Life.Vector(1, 1)));
// → X

