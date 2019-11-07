const CWIDTH = 400,
    CHEIGHT = 400;

/**
 * Grid related variables. 
 */
var rows = 5, 
    cols = 5,
    grid;

function setup () {
    createCanvas(CWIDTH, CHEIGHT);
    /**
     * Create a 2d array. 
     */
    grid = new Array(cols);
    for (let i = 0; i < grid.length; i++) 
        grid[i] = new Array(rows);
    
    /**
     * Initialize the grid. 
     */
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++)
            grid[i][j] = new Spot();
    }
}


function draw () {
    background(0)
}