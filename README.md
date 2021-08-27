# Bubble Cannon #

Try to pop all the bubbles by color before another row is added or when you run out of moves.

![Bubble Cannon Image](https://raw.githubusercontent.com/janejiunkim/BubbleCannon/main/images/Bubble%20Cannon%20Screenplay.png)

## How to play ##
1. Aim the cannon using your W and D keys to move it *left* :arrow_upper_left: and:arrow_upper_right: *right* respectively.
2. Match the color of the loaded bubble to your target bubble to start popping similarly colored bubbles (must be at least 3 adjacent ones).

## Code Snippets ##

### Bubble Movement ###

Trigonometry was used to calculate the direction and movement of the bubble being shot. By using the locations as an origin the tangent function was able to get the slope as well as the rise and the run of the movinng bubble. Conditionals were added in case the bubbles bumped into the walls.                                                         

```javascript
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
}
```
### Cannon Object ###
Relatively not difficult to implement since there was only one on the page. cX and cY, collectively make up the center x and y coordinate of the "cannon". Required to keep track of whether a bubble is loaded onto the cannon or not, to know when to reload.

```javascript
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
```

### Cannon Render Function ###
The center coordinates of the cannon come into play here as we translate the origin to rotate the cannon so that it aims rotates around its center rather than all around the screen.

```javascript
this.render = () => {
        ctx.fillStyle = this.color;
        // ctx.clearRect(0,0,50,105);
        ctx.translate(this.cX, this.cY);
        ctx.rotate(Math.PI / 180 * (angle));
        ctx.fillRect(-(this.width/2), - (this.height/2), 50, 105);
```


## Stretch Goals ##
- [ ] Recalculate for when the bubble hits the outer bounds (left or right wall of the canvas)
- [ ] Detect Hit for bubble to bubble contact, if same color, stick, compare, then pop if true?
- [ ] Punishment Mode: If a player doesn't pop any bubbles within three turns, add another row and push the rest of the rows down. If the last row of all the bubble rows touches the floor, you lose!