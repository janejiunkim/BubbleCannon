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
// all possible bubble colors
const bubbleColors = ["pink", "powderblue","mediumpurple", "limegreen","gold"];
// array of all the bubbles
const allBubbles = [];
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
        this.hasBubble = true;

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
    constructor() {
        this.color = bubbleColors[randomColor()];

    this.render = (x,y) => {
        drawCircle(ctx, x, y, 18, this.color, "white", 2);
    }
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

function randomColor() {
    let min = 0;
    let max = bubbleColors.length-1;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth;
        ctx.stokeStyle = stroke;
        ctx.stroke();
    }
}
// create a bubble to sit on top of cannon
function loadCannon() {

}
// when user presses space, cannon will release ball 
function shoot() {

}

function createBubbleRows(){
    // let x = 33;
    // let y = 35;
    // 6 rows of bubbles; 1st has 10, 2nd has 11, 3rd has 10 ....
    for (let i=0; i < 6; i++){
        let tempArr = [];
        // depending on odd or even row push 10 or 11 bubbles into an array
        if (i % 2 === 0) {
            for(let j = 0; j < 10; j++) {
                let temp = new Bubble();
                tempArr.push(temp);
            }
        } else {
            for (let j=0; j < 11; j++) {
                let temp = new Bubble();
                tempArr.push(temp);
            }
            
        }
        allBubbles.push(tempArr);
    }
}

function detectHit(p1, p2) {
    let hitTest = (
        p1.y + p1.
    )
}
/*
function renderBubbles(){
    let x = 33;
    let y = 35;
    for(let i=0; i < allBubbles.length; i++){
        // iterate through array and render each bubble?
        allBubbles[i].render(x, y);
        if (x < game.width -40) {
            x += 38;
        } else {
            x = 33;
            y += 38;
        }
    }

}
*/

function renderBubbles(){
    let y =35;
    for(let i=0; i< allBubbles.length; i++) {
        if (i%2 === 0) {
            let x= 38;
            for(let j= 0; j < allBubbles[i].length; j++) {
                allBubbles[i][j].render(x,y);
                if (x < game.width -40) {
                    x += 38;
                }
            }
            y += 33;
        } else {
            let x=20;
            for (j=0; j < allBubbles[i].length; j++){
                allBubbles[i][j].render(x,y);
                if (x < game.width-40){
                    x += 38;
                }
            }
            y += 33;

        }

    }
}
// black circle with a red stroke (width 2) at coordinates 50,50, with radius 25
// let ctx = canvas.getContext('2d')
//drawCircle(ctx, 50, 50, 25, 'black', 'red', 2)

//  KEYBOARD INTERACTION LOGIC


// ====================== GAME PROCESSES ======================= //
/**
 * @function gameLoop
 * @todo clear the canvas
 * @todo generate bubbles
 * @todo move cannon left and right, shoot with space bar
 * @todo if hit detected, drop bubbles of same color
 */

setInterval(function () {
    console.log("set interval");
    ctx.save();
    ctx.clearRect(0, 0, game.width, game.height);
    //let newBubz = new Bubble();
    //console.log(newBubz);
    //newBubz.render();
    //createBubbles();
    renderBubbles();
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
    ctx.fillRect(-(width/2), - (height/2), 50, 105);

}


// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", (e) => {
    cannon = new Cannon('black');
    //let newBubz = new Bubble();
    //console.log(newBubz);
    //newBubz.render();
    createBubbleRows();

   //drawCannon();
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
