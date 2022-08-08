var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    console.log(dt)
    update1(dt);
    lastTime = now;
    context.clearRect(0,0,canvas.width,canvas.height);

    requestAnimFrame(main);
    console.log(requestAnimFrame(main))
};

function init() {

    reset();
    lastTime = Date.now();
    main();

}


//필요한 변수
var canvas,context,FPS_timer=0,shoot_cooldown=50,keyPressed={};
//적 이미지 및 총알 이미지
var jjol1=new Image(),jjol2=new Image(),jjol3=new Image();
var jjol1_Bullet=new Image(),jjol2_Bullet=new Image(),jjol3_Bullet=new Image(),jjol3_Bullet_2=new Image();
//적 객체 어레이 및 적 총알 어레이
var jjol1_Arr=new Array(),jjol2_Arr=new Array(),jjol2_Arr1=new Array(),jjol3_Arr=new Array(),jjol3_Arr1=new Array(),jjol3_Arr2=new Array();
var jjol1_bullet_Arr=new Array(),jjol2_bullet_Arr=new Array(),jjol2_bullet_Arr1=new Array(),jjol3_bullet_Arr=new Array(),jjol3_bullet_Arr1=new Array(),jjol3_bullet_Arr2=new Array();
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
boss2_bullet.src="boss1_bullet.png";
boss3_bullet.src="boss1_bullet.png";
//플레이어 및 총알 이미지
air_bullet.src="air_bullet.png";
sprite.src="sprite.png";
boximg=new Image(),
boxlist=new Array();
boximg.src='randombox.png';

var isGameOver
var score = 0;
var level = 0;
var levelByScore=0;
var cont=1;
var life=5;
var scoreEl=document.getElementById('score');
var lifeElement=document.getElementById('life');
var gameTime = 0;
var stateEl=document.getElementById("state");
var levelEl= document.getElementById("level1");
var arrowup=38,arrodown=40,arrowleft=37,arrowright=39;

// function update1(dt) {
//     gameTime += dt;

//     document.getElementById('score').value
   
//     switch(score) {
//       case 0:
//         document.getElementById('')
//         levelByScore = 5;
//         level = 1;
//         //air.speed = 100;
//         levelEl.innerHTML = level;
//         break;
//       case 500:
//         levelByScore = 10;
//         level = 2;
//         //air.speed = 150;
//         document.getElementById('level1').innerHTML = level;
//         break;
//       case 1000:
//         levelByScore = 13;
//         level = 3;
//         //air.speed = 200;
//         document.getElementById('level1').innerHTML = level;
//         break;
//       case 1500:
//         levelByScore = 16;
//         level = 4;
//         //air.speed = 310;
//         document.getElementById('level1').innerHTML = level;
//         break;
//       case 2200:
//         levelByScore = 18;
//         level = 5;
//         //air.speed = 400;
//         document.getElementById('level1').innerHTML = level;
//         break;
//       default:
//         break;
//     }

    
    


//     scoreEl.innerHTML = score;
// };

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
    gun:1,
    speed:1.2,
    frameIdx :0,
    speed:1.2,
	spriteFrames : [0, 1, 2, 3],
    cool_down:200,
    shoot_cooldown:0,
    draw(){
        drawDynamicImage();
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

class Cactus {
    constructor() {
      this.x=0;
      this.y=0;
      this.width=50;
      this.height=50;
    }
    draw() {
      context.fillStyle='rgba(0,0,0,0)';
      context.drawImage(boximg,this.x,this.y);
      }
  }

//class 선언
class player_shoot{
    constructor(){
        this.x=0;
        this.y=0;
        this.width = 7;
        this.height = 21;
    }
    draw(){
        switch(air.gun){
            case 1 :context.drawImage(air_bullet,this.x, this.y);
                    break;
            case 2 :context.drawImage(air_bullet,this.x-20, this.y);
                    context.drawImage(air_bullet,this.x+20, this.y);
                        break;
            case 3 :context.drawImage(air_bullet,this.x-20, this.y);
                    context.drawImage(air_bullet,this.x, this.y);
                    context.drawImage(air_bullet,this.x+20, this.y);
                    break;
            case 4 :context.drawImage(air_bullet,this.x-40, this.y);
                    context.drawImage(air_bullet,this.x-20, this.y);
                    context.drawImage(air_bullet,this.x+20, this.y);
                    context.drawImage(air_bullet,this.x-40, this.y);        
            break;
            case 5 :context.drawImage(air_bullet,this.x-40, this.y);
                    context.drawImage(air_bullet,this.x-20, this.y);
                    context.drawImage(air_bullet,this.x, this.y);
                    context.drawImage(air_bullet,this.x+20, this.y);
                    context.drawImage(air_bullet,this.x+40, this.y);
                    break;
        }
    }
}

//쫄1
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

//쫄 2
class JJOL2{
    constructor(){
        this.x = canvas.width/2;
        this.y = 0;
        this.width = 64;
        this.height = 32;
    }
    draw(){
        context.drawImage(jjol2,this.x,this.y);
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

//쫄2 총알 생성
class JJOL_Bullet2{
    constructor(){
        this.x = 0;
        this.y =40;
        this.width = 64;
        this.height = 32;
    }
    draw(){
        context.fillRect(this.x,this.y,this.width,this.height);
        context.drawImage(jjol2_Bullet, this.x, this.y)
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
class Boss1{
    constructor(){
        this.x = (canvas.width/2)-128;
        this.y = 0;
        this.width = 256;
        this.height = 128;
    }
    draw(){
        context.drawImage(boss1, this.x, this.y);
    }
}


//보스 총알 생성
class Boss1_Bullet{
    constructor(){
        this.x = 500;
        this.y = 150;
        this.width = 100;
        this.height = 100;
        this.frameIdx=0;
    }
    draw(){ 
        this.iq();
    }
    iq(){		
        var spriteFrames=[0,1,2,3];
        var spriteX = spriteFrames[this.frameIdx]  * 100;
        var spriteY = 0;
        context.drawImage(boss1_bullet, spriteX, spriteY, 100, 100, this.x, this.y, 100, 100);
        this.frameIdx++;
        if(this.frameIdx == spriteFrames.length)
            this.frameIdx = 0;
    }
}

//보스2

var boss22 = new Image();
boss22.src = 'battleCrusier.png';
class Boss2{
    constructor(){
        this.x = canvas.width/2-100;
        this.y = 0;
        this.width = 200;
        this.height = 200;
    }
    draw(){
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(boss22, this.x, this.y, this.width, this.height);

    }
}

var bullet2 = new Image();
bullet2.src = 'BOMB.png';
var boss2Laser = new Image();
boss2Laser.src = 'laser1.png';
var boss2Laser2 = new Image();
boss2Laser2.src = 'laser.png';

var sawsss=[], bossBullets2=[], bossBullets22=[], bossBullets222=[];
//보스2(battleCrusier) 총알 생성
class Boss_Bullet2{
    constructor(){
        this.x = canvas.width/2;
        this.y = 170;
        this.width = 32;
        this.height = 32;
    }   
    draw(){
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(bullet2, this.x, this.y, this.width ,this.height);

    }
}
class Boss_Bullet22{
    constructor(){
        this.x = canvas.width/2;
        this.y = 170;
        this.width = 500;
        this.height = 50;
    }   
    draw(){
        context.drawImage(boss2Laser, this.x, this.y, this.width ,this.height);

    }
}
class Boss_Bullet222{
    constructor(){
        this.x = canvas.width/2;
        this.y = 170;
        this.width = 500;
        this.height = 50;
    }   
    draw(){
        context.drawImage(boss2Laser2, this.x,this.y, this.width ,this.height);

    }
}
class drawSawBlade {
    constructor() {
        this.x = 0
        this.y = 150
        this. sprite1 = new Image();
        this. frameIdx = 0;
        this. spriteFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this.sprite1.src = "BOMBBOMB.png";
            this.drawDynamicImage();
        }
        drawDynamicImage()
        {
            var spriteX = Math.floor(this.spriteFrames[this.frameIdx] % 4) * 167;
            var spriteY = Math.floor(this.spriteFrames[this.frameIdx] / 4) * 189;
            
             // 이미지,   좌표x,    좌표y , 이미지너비, 이미지 높이, 캔버스에 어따둘까x,y/ 너비, 높이
            context.drawImage(this.sprite1, spriteX, spriteY, 167, 189, this.x+1000, this.y+350, 167, 189);
            this.frameIdx++;
            if(this.frameIdx == this.spriteFrames.length)
                this.frameIdx = 0;
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
        lifeElement.innerHTML=air.life;
        air.cool_down=180;
        if (air.life==0){
            cancelAnimationFrame(animation);
            context.clearRect(0,0,canvas.width,canvas.height);
        document.getElementById('start').style.display='none'
        document.getElementById('game-over').style.display="block"
        document.getElementById('game-over-overlay').style.display='block'
        document.getElementById('ranking').style.display='block'
        document.addEventListener("click", click);  
        
        function click(e){
            document.getElementById('ranking').style.display='none'
        }
    
        isGameOver=true;
        var name=document.getElementById('name').value;
        rscore=scoreEl.innerHTML
        var nameAndCountArray=[];
        function ranking(score, name) {
            rscore=scoreEl.innerHTML
            isGameOver=true;
            var nameAndCount = {
                name: name,
                score: score
            };
            nameAndCountArray.push(nameAndCount);
            nameAndCountArray.sort(NumberCompare);
            var rankingElem = document.getElementById("rank");
            var printArray = [];
            for (var i = 0; i < nameAndCountArray.length; i++) {
                if (i >= 5) {
                    break;
                }
                printArray.push((i + 1) + '등 : ' + nameAndCountArray[i].name + " " + nameAndCountArray[i].score );
            }
            rankingElem.innerHTML = printArray.join("<br/>");
        }
        function NumberCompare(a, b) {
            return a.score - b.score;
        }
        ranking(score,name);
        }
        }
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
            i--;
            score+= 200;
            scoreEl.innerHTML=score;

        }
    })
    }

// 윤성:아이템 상자 충돌 발생 이벤트
function collision_item(air,what,o,i){
    if(what.x < air.x + air.width && 
        what.x + what.width > air.x && 
        what.y < air.y + air.height && 
        what.y + what.height > air.y
        ){  // 아이템 상자 닿으면 사라짐
            o.splice(i,1);
            i--;
            score +=100;


            var randomitem=Math.floor(Math.random()*7);
            console.log(randomitem);
  
            // 총알 갯수 증가
            if (randomitem===0) { 
              air.gun ++;
              console.log(air.gun);
              console.log('아이템! 총알 증가!');
              stateEl.innerHTML='아이템! 총알 증가!'
          }
            // 라이프 증가
            else if (randomitem===1) { 
              air.life ++;
              lifeElement.innerHTML=air.life;
              console.log(air.life);
              console.log('아이템! 라이프 증가!');
              stateEl.innerHTML='아이템! 라이프 증가!'

              
          }
            // 라이프 감소
            else if (randomitem===2) { 
              air.life --;
              lifeElement.innerHTML=air.life;
              console.log(air.life);
              console.log('함정! 라이프 감소@');
              stateEl.innerHTML="함정! 라이프 감소@"
              if (air.life==0){
                cancelAnimationFrame(animation);
                context.clearRect(0,0,canvas.width,canvas.height);
            
            document.getElementById('start').style.display='none'
            document.getElementById('game-over').style.display="block"
            document.getElementById('game-over-overlay').style.display='block'
            isGameOver=true;
            }
          }
            // 함정(키 변경) ->랜덤으로?시간제한?
            else if (randomitem===3) { 
                
            //기존 키보드 함수 지우기
            stateEl.innerHTML='함정! 키 10초 변경@'
            arrowup=40;
            arrodown=38;
            arrowleft=39;
            arrowright=37;
                setTimeout(orikey1,10000)
            function orikey1(){
                arrowup=38;
                arrodown=40;
                arrowleft=37;
                arrowright=39;
                clearTimeout(orikey1,10000)
            }
            console.log('함정! 키 변경@');
            }
            // 스피드 증가
            else if (randomitem===4) { 
                air.speed += 0.5;
                stateEl.innerHTML='아이템! 스피드 증가!'
                console.log(air.speed);
                console.log('아이템! 스피드 증가!');
                }
            // 스피드 감소
            else if (randomitem===5) { 
                air.speed -= 0.5;
                console.log(air.speed);
                console.log('함정! 스피드 감소!');
                stateEl.innerHTML='함정! 스피드 감소!'
                setTimeout(function(){
                    document.getElementById('speeddown').style.display="block"
                    
                    },800)
                document.getElementById('speeddown').style.display="none"

                

                }
            // 5초동안 무적
            else if (randomitem===6) {
                shield();

                air.cool_down=300;
                console.log(air.cool_down);
                console.log('아이템! 5초 무적!');
                stateEl.innerHTML='아이템! 5초 무적!'
            }
            //꽝-> 아이템 없음!
            else {
                stateEl.innerHTML='꽝! 아이템 없음~'
              console.log('꽝! 아이템 없음~');
            }
            scoreEl.innerHTML=score;
        }
}

function change(a,b,c){
    if (FPS_timer% 50<=25){
        a.x+=b;
    }
    else if (FPS_timer%50>=25){
        a.x-=c;

    }
}

function change2(a,b){
    var switch1;
    var qwe=Math.floor(Math.random()*3)+1;
    if (a.length>=20 && !switch1){
        switch1=true;
    }
    if (switch1){
        console.log(qwe);
        switch(qwe){
            case 1:
                b--;
                break;
            case 2:
                b*=b;
                break;
            case 3:
                b/=b;
                break;
            case 4:
                b++;
                break;
        }
    }
}
//윤성:무적일때 생기는 방어막 함수
let set;
let time = 0;

function shield () {
    function redcircle() {
        time ++;
        context.beginPath();
        context.arc(air.x+25,air.y+25,35,Math.PI * 2,0,true);
        context.strokeStyle='red';
        context.stroke();

        animation=requestAnimationFrame(shield);
    }

    redcircle();
    
    if (time>300) {
        time=0;
        cancelAnimationFrame(animation);
    }

}

    var cactus=new Cactus();
    cactus.draw();

function Frame(){
    update()
    FPS_timer++;
    animation=requestAnimationFrame(Frame);
    context.clearRect(0,0,canvas.width,canvas.height);
    air.cool_down--;
    shoot_cooldown--;
    if ((air.y>3*canvas.height/4 && FPS_timer<200)||(air.y>3*canvas.height/4 && air.cool_down>0)){
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
        mybullet_collision(a,jjol2_Arr,i,o);
        mybullet_collision(a,jjol2_Arr1,i,o);
        })

    air.draw();
    if (FPS_timer%10==0 && FPS_timer>200 ){//&& !jjol3_Arr[0] && !jjol3_Arr2[0]){
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
    
    //jjol2 left
    if (FPS_timer%3000==0){
        var enemy3=new JJOL2();
        jjol2_Arr.push(enemy3);
        }
        jjol2_Arr.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0){
            o.splice(i,1);
        }
        a.x--;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer % 8 === 0 && jjol2_Arr[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new JJOL_Bullet2();
        jjol_Bullet3.x=jjol2_Arr[0].x;  
        jjol2_bullet_Arr.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    jjol2_bullet_Arr.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    console.log(a.y);
    a.y+=5;  
    a.x+=5;
    a.draw();
    collision(air,a);
    }
    )

    //jjol2 right
    if (FPS_timer%3000==0 ){
        var enemy3=new JJOL2();
        jjol2_Arr1.push(enemy3);
        }
        jjol2_Arr1.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0){
            o.splice(i,1);
        }
        a.x++;
        a.draw();
        collision(air,a);
    });
    if (FPS_timer % 8 === 0 && jjol2_Arr1[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new JJOL_Bullet2();
        jjol_Bullet3.x=jjol2_Arr1[0].x;  
        jjol2_bullet_Arr1.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    jjol2_bullet_Arr1.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    console.log(a.y);
    a.y+=5;  
    a.x-=5;
    a.draw();
    collision(air,a);
    }
    )

    //boss
    if (FPS_timer%20000==0 && !boss1_array[0]){
        var enemy3=new Boss1();
        boss1_array.push(enemy3);
        }
        boss1_array.forEach((a,i,o) => {
        if (a.x>=canvas.width || a.x <=0){
            o.splice(i,1);
        }
        change(a,10,10);
        a.draw();
        collision(air,a);
        console.log(boss1_array[0]);
    });
    if (FPS_timer % 500000000 === 0 && boss1_array[0]){ //미사일 발사 주기
        var jjol_Bullet3 = new Boss1_Bullet();
        jjol_Bullet3.x=boss1_array[0].x+boss1_array[0].width/2;  
        boss1_bullet_array.push(jjol_Bullet3);
    }
    // jjol_Bullet.y++; 
    boss1_bullet_array.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1);
    }
    change(a,3,3); //미사일 발사 속도
    a.y+=5;
    // console.log(a.x);
    a.draw();
    collision(air,a);
    }
    )
    if (FPS_timer%3000000==0 && !boss2_array[0] ){
        var enemy3=new Boss2();
        console.log(enemy3);
        boss2_array.push(enemy3);
        }
        boss2_array.forEach((a,i,o)=>{
            if(a.y>canvas.height){
                o.splice(i, 1)
            }
            change(a,1,1);
            a.draw();
            collision(air,a);
        })
    

    if (FPS_timer % 24   === 0  &&boss2_array[0] ){ //미사일 발사 주기
        console.log(boss2_array);
        var boss_bullet2 = new Boss_Bullet2();
        boss_bullet2.x= boss2_array[0].x
        var boss_bullet22 = new Boss_Bullet22();
        boss_bullet22.x=boss2_array[0].x+boss2_array[0].width/2;
        var boss_bullet222 = new Boss_Bullet222();
        boss_bullet222.x=boss2_array[0].x-boss2_bullet.width;
        var drawsawblade = new drawSawBlade();

        bossBullets2.push(boss_bullet2);
        bossBullets22.push(boss_bullet22);
        bossBullets222.push(boss_bullet222);
        sawsss.push(drawsawblade);
    }
    // boss-bullet.y++; 
    bossBullets2.forEach((a,i,o)=>{
    if(a.y>canvas.height){
        o.splice(i, 1)
        
        // o[i]=drawsawblade;
    }
    a.y+=13;  //보스 미사일 발사 속도
    a.draw();
    collision(air,a);
    }
    )
    bossBullets22.forEach((a,i,o)=>{
        if(a.y>canvas.height){
            o.splice(i, 1)
        }  //보스 미사일 발사 속도        
        a.x+=2;
        a.y+=2;
        a.draw();
        collision(air,a);
        }
        )   
    bossBullets222.forEach((a,i,o)=>{
        if(a.y>canvas.height){
            o.splice(i, 1)
        }
        // a.x+=1;
   //보스 미사일 발사 속도        
        a.x-=2;
        a.y+=2;
        a.draw();
        collision(air,a);
        }
        )   
        if(boss1_array && FPS_timer>=3000){
            boss1_array=[]
        }
        if(boss2_array && FPS_timer>=43000){
            boss2_array=[]
        }
    

//윤성:아이템박스 생성
    // 1분마다 랜덤 아이템상자 생성(1s=60frame)
    if (FPS_timer%300===0) { 
        var itemplace=Math.floor(Math.random()*900);
        var cactus=new Cactus();
        cactus.x=itemplace;
        boxlist.push(cactus);
      }
        boxlist.forEach((a,i,o)=>{
          if(a.y>700) {
            o.splice(i,1)
            i--;
          }
    
        a.y++;
        a.draw();
    
        collision_item(air,a,o,i);
      })
    
    air.draw();

}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    document.getElementById('start').display = 'block';

    isGameOver = false;
    gameTime = 0;
    scoreEl.innerHTML = '000';
    level = 0;
    gameTime = 0;
    FPS_timer=0;
    shoot_cooldown=50;
    keyPressed={}
    air.x=canvas.width/2,
    air.y=canvas.height+50
    stateEl.innerHTML='I T E M'
    lifeElement.innerHTML="3"


};
function gameOver() {
    isGameOver=true;
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    document.getElementById('ranking').style.display = 'block';
    

}
// 윤성:기본 키보드 적용 함수
function orikey (e) {
    if(e.code=='ArrowUp'&& air.y>3)
        air.y-=10;
    if(e.code=='ArrowDown'&& air.y+air.height<canvas.height)
        air.y+=10;
    if(e.code=='ArrowLeft'&& air.x>3)
        air.x-=10;
    if(e.code=='ArrowRight'&& air.x+air.width<canvas.width)
        air.x+=10;
}

//윤성:키변환 아이템 적용 함수 

window.addEventListener("keydown",function(e){
    var charCode=e.keyCode
    if(charCode == 13){
        document.getElementById("start").style.display="none";
        document.getElementById('game-over-overlay').style.display = 'none';

        
    }
});
//윤성:키보드 함수 실행


window.onkeydown = function(e) {
    keyPressed[e.keyCode] = true
}
window.onkeyup = function(e) {
    keyPressed[e.keyCode] = false;
}
function update() {
    var press = false;
    if (keyPressed[38]) { //up
        if (air.y>0){
         air.y -= 2*air.speed;
         press = true;}
    }

    if (keyPressed[40]) { //down
        if (air.y<680){
        air.y += 2*air.speed;
         press = true;}
    }

    if (keyPressed[37]) { //left
        if(air.x>0){
        air.x -= 2*air.speed;
         press = true;}
    }

    if (keyPressed[39]) { //right
        if(air.x<900){
        air.x += 2*air.speed;
         press = true;}
    }

    if (keyPressed[32] && shoot_cooldown<0 ) { //space
        shoot_cooldown=8;
        var player_shoot1=new player_shoot();
        player_shoot1.x=air.x+air.width/2;
        player_shoot1.y=air.y;
        air_bullet_array.push(player_shoot1);
    }

    
}

Frame();
