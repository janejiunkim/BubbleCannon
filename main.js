// GLOBAL DOM / VARIABLES
// main game, rendering and updating
let game = document.getElementById('game');
// grab canvas
//let canvas = document.getElementById("canvas");
// Set context
const ctx = game.getContext('2d');
// angle of rotation
let angle = 0;
// cannon
let cannon;
// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.

// ====================== SETUP FOR CANVAS RENDERING ======================= //

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

console.log('height', game.height);
console.log('width', game.width);

// ====================== ENTITIES ======================= //
class Cannon {
    constructor(color) {
        this.color = color;
        this.x = 175;
        this.y = 525;
        this.width = 50;
        this.height = 75;
        this.centerX = (this.x + this.width)/2;
        this.centerY = (this.y + this.height)/2;
        this.centerPoint = (this.centerX, this.centerY);

    this.render = () => {
        ctx.fillStyle = this.color;
       // ctx.rotate(Math.PI / 2);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.translate(this.centerX, this.centerY);
       // ctx.rotate(Math.PI / 2);
        //ctx.translate(-this.centerX, -this.centerY);

    }
  }
}

class Bubble {
    constructor(color) {
        this.color = color;

    }
}
// ====================== HELPER FUNCTIONS ======================= //
function testPaint(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

//  KEYBOARD INTERACTION LOGIC


// ====================== GAME PROCESSES ======================= //
/**
 * @function gameLoop
 * @todo clear the canvas
 * @todo move cannon left and right, shoot with space bar
 */
setInterval(function () {
    ctx.save();
    ctx.clearRect(0, 0, game.width, game.height);

    drawCannon();

    ctx.restore();
}, 100);

function drawCannon() {
    //ctx.translate(175, 525);
    //ctx.fillRect(175, 525, 50, 75);
    let x = 175;
    let y = 525;
    let width = 50;
    let height = 105;
    let cX = x + 0.5 * width;
    let cY = y + 0.5 * height;
    
    ctx.fillRect(175, 525, 50, 105);
    ctx.clearRect(0,0,50,105);
    ctx.translate(cX, cY);
    ctx.rotate(Math.PI / 180 * (angle));
    ctx.fillRect(-(width/2), -(height/2), 50, 105);

}


// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", (e) => {
    cannon = new Cannon('black');
    document.addEventListener('keydown', function (event) {
        if (event.key === 'a') {
            if (angle > -80) {
                angle -= 5;
            console.log(angle);
            }
        } else if (event.key === 'd') {
            if (angle < 80) {
                angle += 5;
                console.log(angle);
            }
        }
    });
});
