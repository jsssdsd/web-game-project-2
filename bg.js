const canvas1 = document.getElementById('canvas1');
const context1 = canvas1.getContext('2d');
const backImg = new Image();
const bgArray = [];


class bg {
constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.draw();
}

draw() {
    if (this.y < -1) this.y = 0;
    context1.drawImage(backImg, 0,this.y);

    for (let i=0; i<1840; i++){
    context1.drawImage(backImg, 0,-1840*[i]+this.y);

}}

}

function render() {
context1.clearRect(0, 0, canvas1.width, canvas.height);

let background;
for (let i = 0; i < bgArray.length; i++) {
    background = bgArray[i];
    background.x += 1;
    background.y += 1;
    background.draw();
    
}


req=requestAnimationFrame(render);

}

backImg.src = "bg.jpg";
backImg.addEventListener('load', () => {
let x, y, speed;
for (let i = 0; i < 10; i++) {
    x = 0;
    y =  0; 
    speed = 10;
    bgArray.push(new bg(x, y,speed));
}

render();
});
