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
    }

    /**
     * Show function. 
     * Takes color as an argument. 
     */
    show (col) {
        fill(col)        
        rect (this.x * w, this.y * h, w - 1, h - 1);
    }
}