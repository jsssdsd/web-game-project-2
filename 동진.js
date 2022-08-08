//필요한 변수
var canvas,context,FPS_timer=0,shoot_cooldown=50,keyPressed={};
//적 이미지 및 총알 이미지
var jjol1=new Image(),jjol2=new Image(),jjol3=new Image();
var jjol1_Bullet=new Image(),jjol2_Bullet=new Image(),jjol3_Bullet=new Image(),jjol3_Bullet_2=new Image();
//적 객체 어레이 및 적 총알 어레이
var jjol1_Arr=new Array(),jjol2_Arr=new Array(),jjol3_Arr=new Array(),jjol3_Arr1=new Array(),jjol3_Arr2=new Array();
var jjol1_bullet_Arr=new Array(),jjol2_bullet_Arr=new Array(),jjol3_bullet_Arr=new Array(),jjol3_bullet_Arr1=new Array(),jjol3_bullet_Arr2=new Array();
//플레이어 이미지 및 총알
var sprite=new Image();
var air_bullet=new Image();
var air_bullet_array=new Array();
//보스 이미지 및 어레이
var boss1=new Image(),boss2=new Image(),boss3=new Image();
var boss1_array=new Array(),boss2_array=new Array(),boss3_array=new Array();
//보스 총알 이미지 및 어레이
var boss1_bullet=new Image(),boss2_bullet=new Image(),boss3_bullet=new Image();
var boss1_bullet_array=new Array(),boss2_bullet_array=new Array(),boss3_bullet_array=new Array();
//적 이미지
jjol1.src="jjol1.png";
jjol2.src="jjol2.png";
jjol3.src="jjol3.png";
//적 총알 이미지
jjol1_Bullet.src="jjol1_Bullet.png";
jjol2_Bullet.src="jjol2_Bullet.png";
jjol3_Bullet.src="jjol3_Bullet.png";
//보스 이미지
boss1.src="boss1.png";
boss2.src="boss1.png";
boss3.src="boss1.png";
//보스 총알 이미지
boss1_bullet.src="boss1_bullet.png";
boss1_bullet.src="boss1_bullet.png";
boss1_bullet.src="boss1_bullet.png";
//플레이어 및 총알 이미지
air_bullet.src="air_bullet.png";
sprite.src="sprite.png";


canvas=document.getElementById('canvas');
context=canvas.getContext("2d");
canvas.width=window.innerWidth*9/16 ;
canvas.height=window.innerHeight*3/4;

//비행기 객체화
var air={
    x:canvas.width/2,
    y:canvas.height+50,
    height:40,
    width:38,
    life:3,
    gun:2,
    speed:1.2,
    frameIdx :0,
    speed:1.2,
	spriteFrames : [0, 1, 2, 3],
    cool_down:200,
    shoot_cooldown:0,
    draw(){
        drawDynamicImage();
        function eventSpriteLoaded(){ 
            startUp();
        }
        
        function startUp(){
           requestAnimationFrame(drawDynamicImage);
        }
        
        // function defaultDraw(){
        //     context.drawImage(sprite, 0, 0, 38, 40, air.x, air.y, 38, 40);
        // }
        
        function drawDynamicImage(){		
            var spriteX = air.spriteFrames[air.frameIdx]  * 38;
            var spriteY = 0;
            context.drawImage(sprite, spriteX, spriteY, 38, 40, air.x, air.y, 38, 40);
            air.frameIdx++;

            if(air.frameIdx == air.spriteFrames.length)
                air.frameIdx = 0;
        }
    }
}

class player_shoot{
    constructor(){
        this.x=0;
        this.y=0;
        this.width = 7;
        this.height = 21;
    }
    draw(){
        context.fillRect(this.x,this.y,this.width,this.height);
        context.drawImage(air_bullet,this.x, this.y);
    }
}

//class 선언
//쫄따구 생성1
class JJOL{
    constructor(){
        this.x = Math.floor(Math.random()*(canvas.width-50));
        this.y = -50;
        this.width = 40;
        this.height = 44;
    }
    draw(){
        context.drawImage(jjol1,this.x, this.y);
    }
}

//쫄3
class JJOL3{
    constructor(){
        this.x = 200;
        this.y = 0;
        this.width = 80;
        this.height = 38;
    }
    draw(){
        context.drawImage(jjol3,this.x+40, this.y);
        context.drawImage(jjol3,this.x, this.y);
    }
}

//쫄따구 1총알 생성
class JJOL_Bullet{
    constructor(){
        this.x = canvas.width/2;
        this.y = 50;
        this.width = 8;
        this.height = 8;
        this.cool_down=30;
    }
    draw(){
        context.drawImage(jjol1_Bullet, this.x, this.y);
    }
}

//쫄3 총알
class JJOL_Bullet3{
    constructor(){
        this.x = 200;
        this.y = 50;
        this.width = 50;
        this.height = 8;
    }
    draw(){
        context.drawImage(jjol3_Bullet, this.x, this.y, this.width, this.height);
    }
}

//보스 생성
class Boss{
    constructor(){
        this.x = 500;
        this.y = 0;
        this.width = 255;
        this.height = 120;
    }
    draw(){
        context.drawImage(boss1, this.x, this.y);
    }
}

//보스 총알 생성
class Boss_Bullet{
    constructor(){
        this.x = 500;
        this.y = 50;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        context.drawImage(boss1_bullet, this.x+18, this.y+10)
    }
}

//기능 작성
//충돌 모션 감지

function collision(air,what){
    if(what.x < air.x + air.width && 
        what.x + what.width > air.x && 
        what.y < air.y + air.height && 
        what.y + what.height > air.y
        ){
        if(air.life>=1 && air.cool_down<0){
        air.x=canvas.width/2;
        air.y=canvas.height+50;
        air.life--;
        air.cool_down=180;
        if (air.life==0){
            cancelAnimationFrame(animation);
            context.clearRect(0,0,canvas.width,canvas.height);
            }}
    }
}

function mybullet_collision(air,what,z,x){
    what.forEach((a,i,o)=>{
    if(a.x < air.x + air.width && 
        a.x + a.width > air.x && 
        a.y < air.y + air.height && 
        a.y + a.height > air.y ){
            o.splice(i,1);
            x.splice(z,1);
        }
    })
    }

function Frame(){
    update()
    animation=requestAnimationFrame(Frame);
    context.clearRect(0,0,canvas.width,canvas.height);
    air.cool_down--;
    shoot_cooldown--;
    if ((air.y>3*canvas.height/4 && FPS_timer<200)||(air.y>3*canvas.height/4&&air.cool_down>0)){
        air.y-=5;
    }
    
    air_bullet_array.forEach((a,i,o) => {
        if (a.y<=0){
            o.splice(i,1);
        }
        a.y-=5;
        a.draw();
        mybullet_collision(a,jjol1_Arr,i,o);
        mybullet_collision(a,jjol3_Arr,i,o);
        mybullet_collision(a,jjol3_Arr2,i,o);
        })

    FPS_timer++;
    air.draw();
    if (FPS_timer%20==0 && FPS_timer>200 ){//&& !jjol3_Arr[0] && !jjol3_Arr2[0]){
        var enemy=new JJOL();
        jjol1_Arr.push(enemy);
        var enemyshoot=new JJOL_Bullet();
        enemyshoot.x=enemy.x;
        jjol1_bullet_Arr.push(enemyshoot);
        }
        jjol1_Arr.forEach((a,i,o) => {
        if (a.y==canvas.height){
            o.splice(i,1);
        }
        a.y+=5;
        a.draw();
        collision(air,a);
    });
    jjol1_bullet_Arr.forEach((a,i,o) => {
        if (a.y==canvas.height){
            o.splice(i,1);
        }
        a.y+=10;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer%1000==0 ){
        var enemy3=new JJOL3();
        jjol3_Arr.push(enemy3);
        }
        jjol3_Arr.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0){
            o.splice(i,1);
        }
        a.x--;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer % 2 === 0 && jjol3_Arr[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new JJOL_Bullet3();
        jjol_Bullet3.x=jjol3_Arr[0].x;  
        jjol3_bullet_Arr.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    jjol3_bullet_Arr.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    a.y+=5;  //미사일 발사 속도
    a.x--;
    a.width+=2;
    a.draw();
    collision(air,a);
    }
    )
    
    // 쫄3 오른
    if (FPS_timer%1000==0 ){
        var enemy3=new JJOL3();
        enemy3.x=canvas.width-enemy3.x;
        jjol3_Arr1.push(enemy3);
        }
        jjol3_Arr1.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0){
            o.splice(i,1);
        }
        a.x++;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer % 2 === 0 && jjol3_Arr1[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new JJOL_Bullet3();
        jjol_Bullet3.x=jjol3_Arr1[0].x;  
        jjol3_bullet_Arr1.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    jjol3_bullet_Arr1.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    a.y+=5;  //미사일 발사 속도
    a.x--;
    a.width+=2;
    a.draw();
    collision(air,a);
    }
    )
    //가운데

    if (FPS_timer%1500==0 ){
        var enemy3=new JJOL3();
        enemy3.x=canvas.width/2;
        enemy3.y=canvas.height/2;
        jjol3_Arr2.push(enemy3);
        }
        jjol3_Arr2.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0 || a.y<0){
            o.splice(i,1);
        }
        a.y-=0.5;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer % 2 === 0 && jjol3_Arr2[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new JJOL_Bullet3();
        jjol_Bullet3.x=jjol3_Arr2[0].x; 
        jjol_Bullet3.y= jjol3_Arr2[0].y;
        jjol3_bullet_Arr2.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    jjol3_bullet_Arr2.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    a.y+=5;  //미사일 발사 속도
    a.x--;
    a.width+=2;
    a.draw();
    collision(air,a);
    }
    )

}

// window.addEventListener("keydown", function(e){if(e.code=='ArrowUp' && air.y>3)air.y-=10;}, false);
// window.addEventListener("keydown", function(e){if(e.code=='ArrowDown'&& air.y+air.height<canvas.height)air.y+=10;}, false);
// window.addEventListener("keydown", function(e){if(e.code=='ArrowLeft'&& air.x>3)air.x-=10;}, false);
// window.addEventListener("keydown", function(e){if(e.code=='ArrowRight'&& air.x+air.width<canvas.width)air.x+=10;}, false);
// window.addEventListener("keydown", function(e){if(e.keycode==32 && shoot_cooldown<0)shoot_cooldown=50;var player_shoot1=new player_shoot()
//     
//     player_shoot1.x=air.x;
//     player_shoot1.y=air.y;
//     air_bullet_array.push(player_shoot1);
// }, false);

// window.addEventListener("keydown",keybord,true);
// function keybord(e){
//     if (e.code=='ArrowUp' && air.y>3)
//     air.y-=10;
//     if(e.code=='ArrowDown'&& air.y+air.height<canvas.height)
//     air.y+=10;
//     if(e.code=='ArrowLeft'&& air.x>3)
//     air.x-=10;
//     if(e.code=='ArrowRight'&& air.x+air.width<canvas.width)
//     air.x+=10;
//     if(e.code=='Space' && shoot_cooldown<0){
//         shoot_cooldown=50;var player_shoot1=new player_shoot()
        
//         player_shoot1.x=air.x+air.width/2;
//         player_shoot1.y=air.y;
//         air_bullet_array.push(player_shoot1);}
// }

// window.addEventListener('keydown',a,false);

window.onkeydown = function(e) {
    keyPressed[e.keyCode] = true
}
window.onkeyup = function(e) {
    keyPressed[e.keyCode] = false;
}
function update() {
    var press = false;
    if (keyPressed[38]) { //up
         air.y -= 3*air.speed;
         press = true;
    }

    if (keyPressed[40]) { //down
        air.y += 3*air.speed;
         press = true;
    }

    if (keyPressed[37]) { //left
        air.x -= 3*air.speed;
         press = true;
    }

    if (keyPressed[39]) { //right
        air.x += 3*air.speed;
         press = true;
    }

    if (keyPressed[32] && shoot_cooldown<0 ) { //space
        shoot_cooldown=50;
        var player_shoot1=new player_shoot();
        player_shoot1.x=air.x+air.width/2;
        player_shoot1.y=air.y;
        air_bullet_array.push(player_shoot1);
    }
    
}



Frame();


// function a(e){
//     var keypress={}
//     setInterval(function(){
//         if(keypress['87']) air.y -=10 ; //up
//         if(keypress['83']) air.y += 10; //down 
// 		if(keypress['65']) air.x -= 10; //left
// 		if(keypress['68']) air.x += 10; //right
//     },10)
//     window.keydown(function(e){ // 어떤 키가 눌렸는지 저장 
// 		keypress[e.which.toString()] = true;
//         console.log(e.code);
// 	});
//     window.keyup(function(e){ // 눌렸던 키를 해제
// 		keypress[e.which.toString()] = false;
        
//     });
// }