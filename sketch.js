const CWIDTH = 600,
  CHEIGHT = 600;

/**
 * Grid related variables.
 */
var rows = 50,
  cols = 50,
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
/**
 * For debugging
 */
var pause = false;
/**
 * For final result.
 */
var path = [];

function setup() {
  createCanvas(CWIDTH, CHEIGHT);
  //   frameRate(20);
  /**
   * Create a 2d array.
   */
  grid = new Array(cols);
  for (let i = 0; i < grid.length; i++) grid[i] = new Array(rows);

  /**
   * Initialize the grid.
   * - Add neighbors.
   */
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) grid[i][j] = new Spot(i, j);
  }
  grid.forEach(col_elements =>
    col_elements.forEach(spot => spot.addNeighbors(grid))
  );

  /**
   * Set start and end values.
   * Add initial value to open set.
   */
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

/**
 * This acts as while loop of the A* algorithm.
 */
function draw() {
  background(0);
  /**
   * Draw the grid.
   */
  grid.forEach(col_elements =>
    col_elements.forEach(element => element.show(color(255)))
  );
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

  /**
   * While loop condition.
   */
  if (openSet.length > 0) {
    /**
     * Find lowest f score in openset
     */
    let winner = 0;
    openSet.forEach((spot, index) => {
      if (spot.f < openSet[winner].f) winner = index;
    });
    let current = openSet[winner];
    /**
     * If winner is the end then we have reached the solution.
     */
    if (current === end) {
      console.log("DONE!!!!");
      /**
       * Find and print the path back to the starting node.
       */
      storePath(current);
      /**
       * Print the final path if found.
       */
      path.forEach(spot => spot.show(color(0, 0, 255)));
      noLoop();
    }

    /**
     * Remove the current from open set and add it to the closed set.
     */
    removeFromArray(openSet, current);
    closedSet.push(current);
    storePath(current);
    /**
     * Process each neighbor the current.
     */
    let neighbors = current.neighbors;
    neighbors.forEach(neighbor => {
      /**
       * If it is not in the closed set. Means it is not already processed.
       */
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        /**
         * tentative_gScore is the distance from start to the neighbor through current
         */
        let tentativeGScore = current.g + 1;
        /**
         * If neighbor is in the open set then try to update its g score.
         */
        let newPath = false;
        if (openSet.includes(neighbor)) {
          /**
           * If better g score is found.
           */
          if (tentativeGScore < neighbor.g) {
            newPath = true;
            neighbor.g = tentativeGScore;
          }
        } else {
          newPath = true;
          neighbor.g = tentativeGScore;
          openSet.push(neighbor);
        }

        if (newPath) {
          /**
           * Educated guess
           * - Here I have considered heuristic distance between neighbor and end
           */
          neighbor.h = heuristic(neighbor, end);
          /**
           * Update the f score of each node.
           */
          neighbor.f = neighbor.g + neighbor.h;
          /**
           * Where did I came from.
           */
          neighbor.cameFrom = current;
        }
      }
    });
  } else {
    console.log("A*", "No Solution.");
    path.forEach(spot => spot.show(color(0, 0, 255)));
    noLoop();
  }
} //  End of draw function.

/**
 * Removes an element from the array specified.
 */
function removeFromArray(arr, element) {
  for (let i = arr.length - 1; i >= 0; i--)
    if (arr[i] == element) {
      arr.splice(i, 1);
      break;
    }
}

/**
 * Finds the distance between a point and b point.
 */
function heuristic(a, b) {
  /**
   * Euclidian distance
   */
//    let d = dist(a.x, a.y, b.x, b.y);
  /**
   * Manhattan distance
   */
  let d = abs(a.x - b.x) + abs(a.y - b.y);
  return d;
}

/**
 * Pause function for dubugging point of view.
 */
function keyPressed() {
  if (key == "p" || key == "P") {
    pause = !pause;
    if (pause) noLoop();
    else loop();
  }
}

/**
 * Stores the path from destination to source using came from variable.
 */
function storePath(current) {
  path = [];
  let temp = current;
  path.push(temp);
  while (temp.cameFrom) {
    path.push(temp.cameFrom);
    temp = temp.cameFrom;
  }
}
