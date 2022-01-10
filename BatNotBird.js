var cvs = document.getElementById("gameCanvas");
var ctx = cvs.getContext("2d");

// Images loading:
var bat = new Image();
var bg = new Image();
var fg = new Image();
var chimneyTop = new Image();
var chimneyBottom = new Image();

bat.src = "/images/bat3.png";
bg.src = "/images/bg.png";
fg.src = "/images/fg.png";
chimneyTop.src = "/images/chimneyTop.png";
chimneyBottom.src = "/images/chimneyBottom.png";

// variables:
var gap = 120;
var constant = chimneyTop.height + gap;
var batX = 10;
var batY = 150;
var gravity = 0.4;
var distance = 80;
var score = 0;

// keys:
document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == '40') {
        console.log("UNTEN");
        batY += 20; // Bat moves down
    } else if (e.keyCode == '38') {
        console.log("OBEN");
        batY -= 28; // Bat moves up
    }
};


// OR why not use mouse:

// Not So Good:
// const goUp = () => batY -= 10;
// let canvasDom = document.querySelector("canvas");
// canvasDom.addEventListener("wheel", goUp); 

// This Is The Good Way!
function wheelAction(event) {
    event.preventDefault();

    // Mouse Sensitivity (just like in Doom!)
    batY += event.deltaY * -0.15;

    // Restrict Bat Limits
    batY = Math.min(Math.max(0, batY), 360);

    //Animation??
    if (bat.src = "/images/bat3.png") {
        bat.src = "/images/bat3b.png";
    };
    if (bat.src = "/images/bat3b.png") {
        setTimeout(() => {
            bat.src = "/images/bat3.png";
        }, 333);
    };

}

const el = document.querySelector('canvas');
el.onwheel = wheelAction;


// coordinates:
var chimney = [];
chimney[0] = { x: cvs.width, y: 0 };

var ground = [];
ground[0] = { x: cvs.width, y: cvs.height - fg.height };

// Images drawing:
fg.onload = function () {
    ctx.drawImage(bg, 0, 0);
    //ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bat, batX, batY);

    for (let i = 0; i < ground.length; i++) {
        ctx.drawImage(fg, ground[i].x, ground[i].y);

        ground[i].x--; // chimney going from right(max x) to left(min x)

        if (ground[i].x == 8) {
            ground.push({
                x: cvs.width,
                y: cvs.height - fg.height
            });
        }
    }

    for (var i = 0; i < chimney.length; i++) {
        ctx.drawImage(chimneyTop, chimney[i].x, chimney[i].y);
        ctx.drawImage(chimneyBottom, chimney[i].x, chimney[i].y + constant);

        chimney[i].x--; // chimney going from right(max x) to left(min x)

        if (chimney[i].x == distance) {         // Create new chimney / set distance between
            distance += 8;                      // Getting closer!
            chimney.push({

                x: cvs.width,
                y: Math.floor(Math.random() * chimneyTop.height) - chimneyTop.height
            });
        }

        // collision:
        if (batX + bat.width - 8 >= chimney[i].x
            && batX <= chimney[i].x + chimneyTop.width
            && (batY <= chimney[i].y + chimneyTop.height
                || batY + bat.height - 16 >= chimney[i].y + constant)) {
            alert('fckd ' + score);
            location.reload();
        } else if (batY + bat.height >= cvs.height - fg.height) {
            batY -= 40; // bounce from the ground
        }

        if (chimney[i].x == 2) {
            score++;
        }

        if (score == 18) {
            alert('インポシブル! impossiburu! 18!'); // End is 18
        }
    }

    ctx.fillStyle = "#999";
    ctx.fillText("score: " + score, 12, 24);

    batY += gravity;

    // if (distance % 5) {
    //     bat.src = "/images/bat3.png";
    //     console.log("anim1");
    // } else {
    //     bat.src = "/images/bat3b.png";
    // };

    requestAnimationFrame(fg.onload);
}
