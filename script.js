//initialize the variables and some styles are given 


let istart=true; //for start the game
let rod=document.querySelectorAll('#rod1, #rod2');
let box=document.getElementById('box');
let ball=document.getElementById('ball');
box.style.height=window.innerHeight+'px';  //initial style of the box
box.style.width=window.innerWidth+'px';
let boxVal=box.getBoundingClientRect();
//rod position set
rod.forEach(element=>{
  element.style.left=50+'%';
  element.style.transform='translateX(-50%)';
  
})
let r1=rod[0].getBoundingClientRect();
let r2=rod[1].getBoundingClientRect();

ball.style.top=(window.innerHeight-r2.height-36)+'px'; //ball position

//measurment part of ball
let score=0; let maxScore;
let x=0, y=0, z=0;
let xspeed=5, yspeed=5;

//set localstorage
if(localStorage.getItem('max')== 'undefined'){
  maxScore=0;
}else{
  maxScore=localStorage.getItem('max');
}
//move the rods on the screen
function movingRods(){
  
  
  let u=40, v=u;
    
    document.addEventListener('keydown',(e)=>{
       r1=rod[0].getBoundingClientRect();
   r2=rod[1].getBoundingClientRect();
        if(e.key=='ArrowLeft' && rod[0].offsetLeft>=190){
           rod[0].style.left=(rod[0].offsetLeft-u)+'px';
           rod[1].style.left=(rod[0].offsetLeft-v)+'px';
        }else if(e.key=='ArrowRight' && (rod[0].offsetLeft+rod[0].offsetWidth)<=(window.innerWidth+155)){
           
            rod[0].style.left=(rod[0].offsetLeft+u)+'px';
           rod[1].style.left=(rod[0].offsetLeft+v)+'px';
        }
    })
   }

   //move the ball on the screen
function movingBall(){

    // console.log(ra);
    let interval=setInterval(()=>{
     let bl=ball.getBoundingClientRect();
     r1=rod[0].getBoundingClientRect();
     r2=rod[1].getBoundingClientRect();
        // console.log(bl.top);
      if(bl.top<=r1.bottom && (bl.left>=r1.left && bl.right<=r1.right)){
        yspeed=-yspeed; 
        
       
      }
      if(bl.bottom>=r2.top && (bl.left>=r2.left && bl.right<=r2.right)){
        yspeed=-yspeed;
      }
          if(bl.left<=0 || bl.right>=box.offsetWidth){
        xspeed=-xspeed;
      }
      
    x+=xspeed; y+=yspeed;
       ball.style.transform=`rotate(${z}deg) translate(${x}px, ${y}px)`;
       score++;

       if(bl.top<=r1.top){
        score=Math.round(score/10);
       maxScore=Math.max(maxScore,score);
        localStorage.setItem('max',maxScore);
         localStorage.setItem('score', score);
         alert('Game Over');
         alert(`Rod2 wins with a score of ${localStorage.getItem('score')} and Max score is ${localStorage.getItem('max')}`);
         localStorage.setItem('name', 'Rod2');
         reset(bl);
         clearInterval(interval); //finish the game after game over
         
       }
       if(bl.bottom>=r2.bottom){
        score=Math.round(score/10);
        maxScore=Math.max(maxScore,score);
        localStorage.setItem('max',maxScore);
         localStorage.setItem('score', score);
         alert('Game Over');
         alert(`Rod1 wins with a score of ${localStorage.getItem('score')} and Max score is ${localStorage.getItem('max')}`);
         localStorage.setItem('name', 'Rod1');
         reset(bl,x,y,z);
         clearInterval(interval); //finish the game after game over
         
       }
            
    },30)
    
   

}

//reset the game 
function reset(bl){
    score=0;
  console.log('reset');
  rod.forEach(element=>{
    element.style.left=50+'%';
    element.style.transform='translateX(-50%)';
    
  })
 
 if(bl.top<=0){
  ball.style.transform='translate(0px, 0px)';
 
  ball.style.transform=`translate(0px, ${-(box.offsetHeight-2*rod[0].offsetHeight-bl.height-2)}px)`;
    x=0; y=-(box.offsetHeight-2*rod[0].offsetHeight-bl.height-2);
  
 }else{
  ball.style.transform='translate(0px, 0px)';
  x=0; y=0;
  xspeed=5, yspeed=-5;
 }
 console.log(bl);
 istart=true;
  
  
}
//start the game from here
document.addEventListener('keydown', (e)=>{
    if(e.key=='Enter' && istart===true){
        istart=false;
        if((localStorage.getItem('name')!='undefined') && (localStorage.getItem('max')!='undefined')){
            alert(`${localStorage.getItem('name')} has max score is ${localStorage.getItem('max')}`);
        }else{
          alert('This is your first time!');
        }
        //movement of rod and ball 
        movingRods();
       movingBall();
        
    
    }
    })