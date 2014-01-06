function Map(width, height) {
  this.width = width;
  this.height = height;
  this.grid = new Array(height);
  var WALL_PERCENTAGE = 0.5;
  for (var y = 0; y < height; y++) {
    this.grid[y] = new Array(width);
    for (var x = 0; x < width; x++) this.grid[y][x] = (Math.random() < WALL_PERCENTAGE ? 0 : 1);
  }
  this.entities = [];
}
Map.isWallElement = function(cellValue) {
  return 0 === cellValue;
}
Map.prototype = {
  isWall: function(x, y) {
    return Map.isWallElement(this.grid[x][y]);
  },
  print: function() {
    this.grid.forEach(function(row) {
      console.log(row.reduce(function(previousValue, currentValue) {
        if (Map.isWallElement(currentValue)) {
          previousValue += "*";
        } else {
          previousValue += " ";
        }
        return previousValue;
      }, ""));
    });
  },
  drawMap: function(containerDivId) {
    this.drawMapTable(containerDivId);
    this.drawEntities(containerDivId);
  },
  drawMapTable: function(containerDivId) {
    if ($("#map-grid").length > 0) return;
    $("#" + containerDivId).append($("<table>", { id: "map-grid" }));
    for (var y = 0; y < this.height; y++) {
      $("#map-grid").append($("<tr>", { id: "map-row-" + y }));
      for (var x = 0; x < this.width; x++) {
        $("#map-row-" + y).append(
          $("<td>", { id: "map-cell-" + y + "-" + x })
        );
      }
    }
  },
  drawEntities: function(containerDivId) {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var currentCell = $("#map-cell-" + y + "-" + x);
        if (this.isWall(x, y)) {
          currentCell.addClass("wall");
        }
        if (this.grid[x][y] === 2) {
          // TODO fix magic numbers
          currentCell.html("P");
        } else {
          currentCell.html("");
        }
      }
    }
  },
  addPlayer: function(player) {
    this.entities.push(player);
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (!this.isWall(x, y)) {
          // TODO fix magic numbers
          this.grid[x][y] = 2;
          player.x = x;
          player.y = y;
          return;
        }
      }
    }
  },
  movePlayerUp: function() {
    var player = this.entities[0];
    if (player.y === 0 || this.isWall(player.x, player.y - 1)) return;
    this.grid[player.x][player.y] = 1;
    this.grid[player.x][player.y - 1] = 2;
    player.y--;
    this.drawEntities();
  },
  movePlayerDown: function() {
    var player = this.entities[0];
    if (player.y === this.height - 1 || this.isWall(player.x, player.y + 1)) return;
    this.grid[player.x][player.y] = 1;
    this.grid[player.x][player.y + 1] = 2;
    player.y++;
    this.drawEntities();
  },
  movePlayerLeft: function() {
    var player = this.entities[0];
    if (player.x === 0 || this.isWall(player.x - 1, player.y)) return;
    this.grid[player.x][player.y] = 1;
    this.grid[player.x - 1][player.y] = 2;
    player.x--;
    this.drawEntities();
  },
  movePlayerRight: function() {
    var player = this.entities[0];
    if (player.x === this.width - 1 || this.isWall(player.x + 1, player.y)) return;
    this.grid[player.x][player.y] = 1;
    this.grid[player.x + 1][player.y] = 2;
    player.x++;
    this.drawEntities();
  }
}
