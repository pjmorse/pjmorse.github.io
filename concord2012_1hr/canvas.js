// Or you can try and complete the full test I've included below in less than four hours.
// 
// Please try and complete Part A described below.
// If you finish Part A in less than four hours feel free to start Part B.
// If you finish Parts A and B you can try linking them together in Part C.
// 
// Part A: Canvas
// 
// # create a 300x300 pixel Canvas object
// # render a 40x40 pixel square into the Canvas object
// # make the square draggable.

// Square object
// Attributes: x, y, side, color
// Methods: draw, move, isClicked
// Method: accept click, figure difference in mouse
var square = {
    x: 130,
    y: 130,
    side: 40,
    color: '#ff0000',
    canvasObj: null,
    startDragX: null,
    startDragY: null,

    drawToCanvas: function(canvas) {
        var context;
        if (canvas) {
            this.canvas = canvas;
            context = canvas.getContext('2d');
            context.setFillColor(this.color);
            context.fillRect(this.x, this.y, this.side, this.side);
        }
    },

    moveOnCanvas: function(newX, newY) {
        var context;
        if (this.canvas) {
            // Erase the old square
            this.color = '#ffffff';
            this.drawToCanvas(this.canvas);
            // Re-set the color
            this.color = '#ff0000';
            // Change position
            this.x = newX;
            this.y = newY;
            console.log("New position is " + this.x + ', ' + this.y);
            // Draw the new version
            this.drawToCanvas(this.canvas);
        }
    },
    
    isInSquare: function(x, y) {
        // Confirm that the click is inside the square; otherwise we ignore it
        if (((x >= this.x) && (x < (this.x + this.side))) && ((y >= this.y) && (y < (this.y + this.side)))) {
            this.startDragX = x;
            this.startDragY = y;
            return true;
        } else {
            return false;
        }
    },
    
    endDrag: function(x, y) {
        var offsetX, offsetY;
        if (this.startDragX) {
            // Figure the offset
            offsetX = this.startDragX - x;
            offsetY = this.startDragY - y;
            // Move the square
            this.moveOnCanvas((this.x - offsetX), (this.y - offsetY));
            // When we have the SVG we'll add a method to move the square there as well
            // reset the startDrag values
            this.startDragX = null;
            this.startDragY = null;
        } else {
            // ignore
        }
    }
};

function canvasStartDrag(evt) {
    // This just hands the mousedown coordinates to the square
    // Brittle: assumes the square variable is defined
    square.isInSquare(evt.layerX, evt.layerY);
}

function canvasEndDrag(evt) {
    // This just hands the mouseup coordinates to the square
    // Brittle: assumes the square variable is defined
    square.endDrag(evt.layerX, evt.layerY);
}

// Function to create Canvas object
function createCanvas(id, height, width) {
    // defaults
    if (!height) {
        height = 300;
    }
    if (!width) {
        width = 300;
    }
    // Generate the object
    return '<canvas id="' + id + '" height="' + height + '" width="' + width + '" onmousedown="canvasStartDrag(event)" onmouseup="canvasEndDrag(event)"></canvas>';
}

// Function to add Canvas object to container
function addCanvas(target, canvasId) {
    // Find the element we're adding this to
    var container = document.getElementById('canvasSpace');
    if (container) { // Make sure we found something
        container.innerHTML = createCanvas(canvasId);
        if (canvasId) {
            return document.getElementById(canvasId);
        } else {
            return null;
        }
    } else {
        alert("No container with ID " + target + " was found.");
        return null;
    }
}

// And run:
// Create the canvas
var canvasObj = addCanvas('canvasSpace', 'ourCanvas');
// Draw the square on the canvas
square.drawToCanvas(canvasObj);


// Part B: SVG
// # create a 300x300 pixel SVG object
// # render a 40x40 pixel square into the SVG object
// # make the square draggable.
// 
// Part C: Linking the drag operations
// # When the Canvas square is dragged the SVG square is also moved.
// # When the SVG square is dragged the Canvas square is also moved.
// 
// The target browser is Chrome 20.