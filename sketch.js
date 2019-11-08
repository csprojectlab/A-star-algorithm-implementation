const CWIDTH = 400,
    CHEIGHT = 400;

/**
 * Grid related variables. 
 */
var rows = 5, 
    cols = 5,
    w,
    h,
    grid;
/**
 * A* algorithm related variables. 
 */
var openSet = [],
    closedSet = [],
    start,
    end;

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
     * - Add neighbors. 
     */
    w = width / cols;
    h = height / rows;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++)
            grid[i][j] = new Spot(i, j);
    }
    grid.forEach(col_elements => col_elements.forEach(spot => spot.addNeighbors(grid)));
    
    /**
     * Set start and end values. 
     * Add initial value to open set. 
     */
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push (start);
}

/**
 * This acts as while loop of the A* algorithm. 
 */
function draw () {
    background(0);
    /**
     * While loop condition. 
     */
    if (openSet.length > 0) {
        /**
         * Find lowest f score in openset 
         */
        let winner = 0;
        openSet.forEach((spot, index) => {
            if (spot.f < openSet[winner].f)
                winner = index;
        });
        let current = openSet[winner];
        /**
         * If winner is the end then we have reached the solution. 
         */
        if (current === end) {
            noLoop();
            console.log("DONE!!!!")
        }

        /**
         * Remove the current from open set and add it to the closed set. 
         */
        removeFromArray(openSet, current);
        closedSet.push(current);
        /**
         * Process each neighbor the current. 
         */
        let neighbors = current.neighbors;
        neighbors.forEach((neighbor, index) => {
            /**
             * If it is not in the closed set. Means it is not already processed. 
             */
            if (!closedSet.includes(neighbor)) {
                /**
                 * tentative_gScore is the distance from start to the neighbor through current
                 */
                let tentativeGScore = current.g + 1;
            }
        })
    } else {

    }

    /**
     * Draw the grid. 
     */
    grid.forEach(col_elements => col_elements.forEach(element => element.show(color(255))));
    /**
     * Draw the open set. 
     * - Green color. 
     */
    openSet.forEach(spot => spot.show(color(0, 255, 0)));
    /**
     * Draw the closed set. 
     * - Red color. 
     */
    closedSet.forEach(spot => spot.show(color(255, 0, 0)));


}   //  End of draw function. 

/**
 * Removes an element from the array specified. 
 */
function removeFromArray (arr, element) {
    for (let i = arr.length - 1; i >= 0; i--) 
        if (arr[i] == element) {
            arr.splice(i, 1);
            break;
        }    
}