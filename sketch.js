/*I wanted to experiment with sin and cos since I had liked the sin and cos examples on p5 at the beginnning of the semester. I also never did much animation for a homework nor have I used sound before so I opted to do an animation this time

I tried to use camera capture for a live viewer reaction (Markiplier style) but couldn't get it to display on this project

A lot of YouTube help or this wouldn't be possible*/

var netflixAhSound;
var confetti;

function preload() {
  netflixAhSound=loadSound('dotted-spiral.mp3');
  confetti=loadSound('confetti.mp3');
}

function setup() {
  const specs = min(windowWidth, windowHeight);// make canvas max possible size to window
  createCanvas(specs, specs);
  colorMode(RGB,1); //color measurements easier between 0-1 like a unit circle; can still add all 3 arguments of R G B
  noStroke();
}


function cosNorm(v) {
  return cos(v * TWO_PI) * 0.5 + 0.5;//spread outward
}

function invCosNorm(v) {
  return 1 - cosNorm(v);//rewind animation
}




const dotSize = 0.075;
const radius = Math.sqrt(0.5) + dotSize;//for coordinate system; not same as "r" const
const PHI = (1 + Math.sqrt(5)) / 2;//PHI supposed to distribute interestingly since its irrational

let t;//time
const frames = 1000;


function draw() {
  t = fract(frameCount/frames);
  //---------maybe add counter for frames------------
  scale(width,height); //scale coordinate grid with canvas, go from 0-1
  background(0);
  fill(1);//white
  
  //polar coordinates: angle of rotation and radius distance from start
  //circles -> sin cos
  
  
  //for loop to make spiral
  const count = 1000 * invCosNorm(t);

  //divide by time to get reduced pan out from pattern
  for (let i=0; i<count/t; i++) {
    const calc = i/count;//determine angle placement -> determine spacing
    const a = i * PHI;
    
    const distance = calc * radius;//how far away to move circles to spiral; otherwise just a circle
    const x = 0.5 + cos(a * TWO_PI) * distance;
    const y = 0.5 + sin(a * TWO_PI) * distance;
    
    const voidRing = pow(cosNorm(calc + t * 6),2);//add black ring where dots shrink to nothing; pow function drastically increases number values so effects should be more far-reaching
    const r = voidRing * calc * dotSize;//for circles; not same as "radius" const
    const hue=fract(calc * 0.2 + t);
    const sat=1;
    const bright=0.5;
    const clr=color(hue,sat,bright);
    fill(clr);
    
    //does this actually do what i think it does?
    if (mouseX>0 && mouseX<windowWidth) {
    //if condition if mouse leaves canvas to revert resp plus to 0
    circle(x,y,r+(sqrt(mouseX)/10000));//minor responsive radii
    } else circle(x,y,r-sqrt(mouseX)/1000);
    
    if(calc==1) {
      //get final position of animation, then play song
      //will play toward the end of animation after it drifts, and then when it drifts back
      netflixAhSound.play();
    }
    
    //0.001 starting hue when calc==0 and 1/1000 frame
    //
    //plays at end and beginning of animation
    if((hue==0.001)||(hue==0.9&&t==0.9)) {
      confetti.play();
    }
}
  
  
  
}