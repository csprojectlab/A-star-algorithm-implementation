/**
 * Grid is made up of spots. 
 */
class Spot {
    constructor (i, j) {
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        /**
         * Each spot will also keep track of its neighbors. 
         */
        this.neighbors = [];
    }

    /**
     * Show function. 
     * Takes color as an argument. 
     */
    show (col) {
        fill(col)        
        rect (this.x * w, this.y * h, w - 1, h - 1);
    }

    /**
     * Function to add the neighbors. 
     */
    addNeighbors (grid) {
        if (this.x > 0)
            this.neighbors.push(grid[this.x - 1][this.y]);
        if (this.x < cols - 1)
            this.neighbors.push(grid[this.x + 1][this.y]);
        if (this.y > 0)
            this.neighbors.push(grid[this.x][this.y - 1]);
        if (this.y < rows - 1)
            this.neighbors.push(grid[this.x][this.y + 1]);
    }
}