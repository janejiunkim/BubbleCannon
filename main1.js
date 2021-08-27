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
// x and y coords of bubble
let currentBubbleX = 200;
let currentBubbleY = 507;
// bubble movement
let dx = 0; 
let dy = 0;
// score variable
let score = 0;

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
        this.height = 105;
        this.hasBubble = true;
        this.currentBubble = new Bubble();
        this.cX = this.x + 0.5 * this.width;
        this.cY = this.y + 0.5 * this.height;

    this.render = () => {
        ctx.fillStyle = this.color;
        // ctx.clearRect(0,0,50,105);
        ctx.translate(this.cX, this.cY);
        ctx.rotate(Math.PI / 180 * (angle));
        ctx.fillRect(-(this.width/2), - (this.height/2), 50, 105);

    }
  }
}

class Bubble { 
    constructor(x, y) {
        this.color = bubbleColors[randomColor()];
        this.x =x;
        this.y=y;
        this.radius = 18;

    this.render = (x,y) => {
        drawCircle(ctx, this.x, this.y, 18, this.color, "white", 2);
    }
    
    this.shoot = (currentBubbleX, currentBubbleY) => {
        //drawCircle(ctx, currentBubbleX, currentBubbleY, 18, this.color, 'white', 2);
        //this.render(cannon.currentBubble.x, cannon.currentBubble.y);
        calculateBallDirection();
        /*
        if (currentBubbleX + dx > game.width-18 || currentBubbleX + dx < 18) {
            dx = -dx;
        }
        
        if (currentBubbleY + dy > game.height-18 || currentBubbleY + dy < 18) {
            //dx = -dx;
            dy = -dy;
        } */
        cannon.currentBubble.x += dx;
        cannon.currentBubble.y += dy;
        this.render(cannon.currentBubble.x, cannon.currentBubble.y);

    } 
  }

}
// array of all the bubbles
//const allBubbles = createBubbleRows();
// ====================== HELPER FUNCTIONS ======================= //

function randomColor() {
    let min = 0;
    let max = bubbleColors.length-1;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateBallDirection(){
    if (angle === 0) {
        dx = 0;
        dy = -4;
    } else if (angle > 0) {
        let radian = Math.PI / 180 * (90 - angle);
        let slope = Math.tan(radian);
        dx = Math.cos(radian) * slope;
        dy = -(Math.sin(radian) * slope);
    } else if (angle < 0) {
        let radian = Math.PI / 180 * (90 - angle);
        let slope = Math.tan(radian);
        dx = -(Math.cos(radian) * slope);
        dy = Math.sin(radian) * slope;
    }
    
    if (cannon.currentBubble.x > game.width-18) {
        
        dx = -dx;
        cannon.currentBubble.x += dx;
        cannon.currentBubble.y += dy;
        
    } else if(cannon.currentBubble.x < 18) {
        console.log('hit left wall');
        dx = -dx;
        cannon.currentBubble.x += dx;
        cannon.currentBubble.y += dy;

    } else if (cannon.currentBubble.y > game.height-18) {
        console.log('hit top wall');
        dy= -dy;
        cannon.currentBubble.x += dx;
        cannon.currentBubble.y += dy;
    } else if (cannon.currentBubble.y < 18) {
        console.log('hit bottom wall');
    }
    
    if (currentBubbleY + dy > game.height-18 || currentBubbleY + dy < 18) {
        currentBubbleX = dy;
        currentBubbleY = dx;
  
    } 
    
   //cannon.currentBubble.x += dx;
    //cannon.currentBubble.y += dy;
    
   //currentBubbleX -= dx;
   // currentBubbleY += dy;
    
    
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
    ctx.closePath();
    
}
// create a bubble to sit on top of cannon
function loadCannon() {
    if (cannon.hasBubble === false) {

    }
}

function createBubbleRows(){
    let x = 38;
    let y = 35;
    for (let i=0; i < 6; i++) {
        const tempArr=[];
        if (i%2 === 0) {
            x = 38;
            for(let j = 0; j <10; j++) {
                let temp = new Bubble(x, y);
                tempArr.push(temp);
                if (x < game.width -40) {
                    x += 38;
                }
            }
            allBubbles.push(tempArr);
            y += 33;
        } else {
            x = 20;
            for(let j=0; j < 11; j++) {
                let temp = new Bubble(x, y);
                tempArr.push(temp);
                if (x < game.width-40){
                    x += 38;
                }
            
            }
            allBubbles.push(tempArr);
            y += 33;
        }
        

    }
    console.log(allBubbles);
    return allBubbles;
}

function renderBubbles(){
    for (let i= 0; i < allBubbles.length; i++) {
        for(let j=0; j<allBubbles[i].length; j++){
            allBubbles[i][j].render();
        }
    }

}
/*
function addBubbleRow() {

}
const bubblesRemoved = [];
let turns = 0;
function updateScore() {
    let newScore = document.querySelector('#results');
    // when player scores, bubble sticks, compares and matches with at least 3 adjacent bubbles
    if (stick(cannon.currentBubble)) {
        // award player with certain amount of points based off of how many bubbles popped
        for(let i=0; i < bubblesRemoved.length; i++) {
            newScore += 10;
            bubblesRemoved.pop();
        }
    } else {
        turns += 1;
        if (turns >= 3) {
            addBubbleRow();
        }
    }
    newScore.innerHTML = 'newScore';
}

function winOrLose() {
    for(let i=0; i < allBubbles.length; i++) {
        for(let j=0; j< allBubbles[i].length; j++) {
            if 
        }
    }
}
*/
// ====================== COLLISION DETECTION ======================= //
function collision(b1x, b1y, r1, b2x, b2y, r2) {
    let a; 
    let x; 
    let y; 
    a = r1 + r2;
    x = b1x - b2x;
    y = b1y - b2y;

    if (a > Math.sqrt((x * x) + (y * y))) {
        return true;
    } else {
        return false;
    }
}

function stick(currentBubble) {
    for (let i=0; i < allBubbles[allBubbles.length -1][i]; i++) {
        if (collision(currentBubbleX, currentBubbleY,18,allBubbles[allBubbles.length-1][i].x, allBubbles[allBubbles.length-1][i].y)) {
            console.log("Collided!");
        }
        
    }
}
function printBubbles() {
    for (let i = 0; i < allBubbles.length; i++) {
        for(let j = 0; j < allBubbles[i].length; j++) {
            console.log(allBubbles[i][j]);
        }

    }
}

//  KEYBOARD INTERACTION LOGIC

// ====================== GAME PROCESSES ======================= //
/**
 * @function gameLoop
 * @todo clear the canvas
 * @todo generate bubbles
 * @todo move cannon left and right, shoot with space bar
 * @todo if hit detected, drop bubbles of same color
 */

function gameLoop () {
    ctx.save();
    ctx.clearRect(0, 0, game.width, game.height);
    renderBubbles();
    cannon.currentBubble.shoot(cannon.currentBubble.x, cannon.currentBubble.y);
    //cannon.currentBubble.x += dx;
    //cannon.currentBubble.y += dy;
    cannon.render();
    ctx.restore();
}


// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
window.addEventListener("DOMContentLoaded", (e) => {

    cannon = new Cannon('black');
    cannon.currentBubble = new Bubble(currentBubbleX, currentBubbleY);
    console.log(cannon.currentBubble);
    createBubbleRows();
    const runGame = setInterval(gameLoop, 100);
    //updateScore();
    document.addEventListener('keydown', function (event) {
        if (event.key === 'a') {
            if (angle > (-80)) {
                angle -= 10; 
                switch(angle) {
                    case 0:
                        currentBubbleX = 200;
                        currentBubbleY = 507;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;

                    case 10:
                        currentBubbleX = 212;
                        currentBubbleY = 508;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                   
                        
                    break;
                    case 20:
                        currentBubbleX = 224;
                        currentBubbleY = 511;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                       
                    break;
                    case 30:
                        currentBubbleX = 234;
                        currentBubbleY = 515;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                        
                    break;
                    case 40: 
                        currentBubbleX = 245;
                        currentBubbleY = 523;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 50:
                        currentBubbleX = 254;
                        currentBubbleY = 532;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                        
                    break;
                    case 60: 
                        currentBubbleX = 262;
                        currentBubbleY = 543;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 70:
                        currentBubbleX = 268;
                        currentBubbleY = 555;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 80:
                        currentBubbleX = 270;
                        currentBubbleY = 567;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                        
                    break;
                    case -10:
                        currentBubbleX = 188;
                        currentBubbleY = 508;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                        
                    break;
                    case -20:
                        currentBubbleX = 176;
                        currentBubbleY = 510;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -30:
                        currentBubbleX = 165;
                        currentBubbleY = 515;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -40: 
                        currentBubbleX = 154;
                        currentBubbleY = 523;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -50:
                        currentBubbleX = 145;
                        currentBubbleY = 532;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -60:
                        currentBubbleX = 137;
                        currentBubbleY = 543;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -70:
                        currentBubbleX = 132;
                        currentBubbleY = 555;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -80:
                        currentBubbleX = 132;
                        currentBubbleY = 567;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                }
            console.log(angle);
            }
        } else if (event.key === 'd') {
            if (angle < 80) {
                angle += 10;
                switch(angle) {
                    case 0:
                        currentBubbleX = 200;
                        currentBubbleY = 507;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    
                    case 10:
                        currentBubbleX = 212;
                        currentBubbleY = 508;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 20:
                        currentBubbleX = 224;
                        currentBubbleY = 511;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 30:
                        currentBubbleX = 234;
                        currentBubbleY = 515;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 40: 
                        currentBubbleX = 245;
                        currentBubbleY = 523;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 50:
                        currentBubbleX = 254;
                        currentBubbleY = 532;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 60: 
                        currentBubbleX = 262;
                        currentBubbleY = 543;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 70:
                        currentBubbleX = 268;
                        currentBubbleY = 555;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case 80:
                        currentBubbleX = 270;
                        currentBubbleY = 567;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -10:
                        currentBubbleX = 188;
                        currentBubbleY = 508;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -20:
                        currentBubbleX = 176;
                        currentBubbleY = 510;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -30:
                        currentBubbleX = 165;
                        currentBubbleY = 515;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -40: 
                        currentBubbleX = 154;
                        currentBubbleY = 523;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -50:
                        currentBubbleX = 145;
                        currentBubbleY = 532;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -60:
                        currentBubbleX = 137;
                        currentBubbleY = 543;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -70:
                        currentBubbleX = 132;
                        currentBubbleY = 555;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;
                    case -80:
                        currentBubbleX = 132;
                        currentBubbleY = 567;
                        cannon.currentBubble.x = currentBubbleX;
                        cannon.currentBubble.y = currentBubbleY;
                    break;

                }
                
            }
        } else if (event.keyCode === 32) {
            console.log("Shoot!");
            //clearInterval(runGame);
            //const shot = setInterval(cannon.currentBubble.shoot(), 1);

        }
    });
});
