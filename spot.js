/**
 * Grid is made up of spots.
 * Grid by default is not a wall.
 */
class Spot {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    /**
     * Each spot will also keep track of its neighbors.
     */
    this.neighbors = [];
    this.cameFrom = undefined;
    this.wall = false;
    if (random(1) < 0.4) this.wall = true;
  }

  /**
   * Show function.
   * Takes color as an argument.
   */
  show(col) {
    if (this.wall) fill(0);
    else fill(col);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }

  /**
   * Function to add the neighbors.
   */
  addNeighbors(grid) {
    if (this.x > 0) this.neighbors.push(grid[this.x - 1][this.y]);
    if (this.x < cols - 1) this.neighbors.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbors.push(grid[this.x][this.y - 1]);
    if (this.y < rows - 1) this.neighbors.push(grid[this.x][this.y + 1]);
  }
}
