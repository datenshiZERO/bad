function Map(width, height) {
  this.width = width;
  this.height = height;
  this.grid = new Array(height);
  for (var y = 0; y < height; y++) {
    this.grid[y] = new Array(width);
    for (var x = 0; x < width; x++) this.grid[y][x] = 0;
  }
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
  }
}
