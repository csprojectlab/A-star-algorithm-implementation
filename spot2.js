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
      if (random(1) < 0.45) this.wall = true;
    }
  
    /**
     * Show function.
     * Takes color as an argument.
     */
    show(col) {
        // fill(col)
      if (this.wall) {
        stroke(0);
        fill(0);
        noStroke();
    ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2)
      }
    //   rect(this.x * w, this.y * h, w - 1, h - 1);
    
    }
  
    /**
     * Function to add the neighbors.
     */
    addNeighbors(grid) {
      if (this.x > 0) this.neighbors.push(grid[this.x - 1][this.y]);
      if (this.x < cols - 1) this.neighbors.push(grid[this.x + 1][this.y]);
      if (this.y > 0) this.neighbors.push(grid[this.x][this.y - 1]);
      if (this.y < rows - 1) this.neighbors.push(grid[this.x][this.y + 1]);
      /**
       * Upper left
       * Upper Right
       * Bottom left
       * Bottom right
       */
      if (this.x > 0 && this.y > 0)
        this.neighbors.push(grid[this.x - 1][this.y - 1]);
      if (this.x < cols - 1 && this.y > 0)
        this.neighbors.push(grid[this.x + 1][this.y - 1]);
      if (this.x > 0 && this.y < rows - 1)
        this.neighbors.push(grid[this.x - 1][this.y + 1]);
      if (this.x < cols - 1 && this.y < rows - 1)
        this.neighbors.push(grid[this.x + 1][this.y + 1]);
    }
  }
  