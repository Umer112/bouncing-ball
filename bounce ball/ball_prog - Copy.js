//////////    initializing variables:
/////////     Canvas:
var canvas=document.getElementById("c");
var context=canvas.getContext('2d');


/////////     Ball variables:

var radius=10;
var x_axis=canvas.width/5;
var y_axis=canvas.height-350;
var dx=2;
var dy=-2;
var radians=Math.PI*2;
var colors=new Array(15);
colors[0]="blue";
colors[1]="blue";
colors[2]="blue";
colors[3]="blue";
colors[4]="blue";
colors[5]="blue";
colors[6]="yellow";
colors[7]="yellow";
colors[8]="yellow";
colors[9]="yellow";
colors[10]="brown";
colors[11]="brown";
colors[12]="brown";
colors[13]="brown";
colors[14]="brown";
var color_b=new Array(11);
color_b[0]="red";
color_b[1]="red";
color_b[2]="red";
color_b[3]="red";
color_b[4]="red";
color_b[5]="red";
color_b[6]="purple";
color_b[7]="purple";
color_b[8]="purple";
color_b[9]="purple";
color_b[10]="purple";
var change=0;




///// Audios:

let bounce=new Audio();
bounce.src="bounce.mp3";
let end=new Audio();
end.src="end.mp3";
let target=new Audio();
target.src="target.mp3";
let hit=new Audio();
hit.src="hit.mp3";

/////// Image on winning:
let trophy=new Image();
trophy.src="won.jpg";
let loser=new Image();
loser.src="loser.jpg";

/////////   Board variables:
var height=13;
var width=120;
var x= (canvas.width-width)/2;
var y=canvas.height-height;
var outline=new Array(20);
outline[0]="#FF0066";
outline[1]="#FF0066";
outline[2]="#FF0066";
outline[3]="#FF0066";
outline[4]="#FF0009";
outline[5]="#FF0009";
outline[6]="#FF0009";
outline[7]="#FF0009";
outline[8]="#FF0009 ";
outline[9]="#FF";
outline[10]="#FF";
outline[11]="#FF";
outline[12]="#FF";
outline[13]="#FF3300";
outline[14]="#FF3300";
outline[15]="#FF3300";
outline[16]="#FF3300";
outline[17]="#FF3300";
outline[18]="#BF ";
outline[19]="#BF";
var blink=0;
var right=false;
var left=false;
var l=0;





//**********************************************************************************************************************
////////////////////////////   WALL OF THE GAME:
var brick_row=2;
var brick_col=7;
var brick_height=20;
var brick_width=70;
var brick_padding=20;
var offsetleft=20;
var offsettop=5;
var count=0;
var score=0;
var over=0;
var color_c=new Array(2);
color_c[0]="black";
color_c[1]="grey";
var bricks=[];
for(var c=0;c<brick_col;c++)
{
	bricks[c]=[];
	for(var r=0;r<brick_row;r++){
		bricks[c][r]={
	     x: 0,y: 0,status: 1};
	}
}











//************************************************************************************************************************


/////////   Setting the board to move on x-axis and y-axis by keyboard:

/////  Adding the event listener for keyboard input:


document.addEventListener('keydown',keyboard_down,false);
document.addEventListener('keyup',keyboard_up,false);


//  if keys are pressed:

function keyboard_down(e) {

	// for right key:-->

if(e.keyCode==39){

right=true;



}	


else if(e.keyCode==37){

left=true;

}

}


//  if keys are not pressed:

function keyboard_up(e) {

	// for right key:-->

if(e.keyCode==39){

right=false;



}	


else if(e.keyCode==37){

left=false;

}

}

//**********************************************************************************************************************
//////////////////////////////  Wall Destruction:
function wall_destroy() {
	for(var c=0;c<brick_col;c++){
		for(var r=0;r<brick_row;r++){
			var b=bricks[c][r];
            if(b.status== 1){
            	if(x_axis>b.x && x_axis<b.x+brick_width && y_axis>b.y && y_axis<b.y+brick_height){
            		hit.play();
            		hit.play();
            		dy=-dy;
            		b.status=0;
            		hit.play();
            		score++;
                    update(score);
                    game_over(score);
                  
            	}
            }
           
            
		}
	}
}



//***********************************************************************************************************************


/////////    Creating the ball:
function ball() {
context.beginPath();
context.arc(x_axis,y_axis,radius,0,radians);         ///  false for clockwise direction
context.fillStyle=color_b[change];
context.fill();
context.closePath();

///

if(change!=10){
change++;

}
else{
	change=0;
}


}







//************************************************************************************************************************

/////////    Creating the board:
function board() {
context.beginPath();
context.rect(x,y,width,height);
context.fillStyle="#FF9933";
context.strokeStyle=colors[blink];
context.fill();
context.stroke();
context.closePath();

///  Colour change:

if(blink!=14){

blink++;

}

else{

	blink=0;
}

}
//**********************************************************************************************************************








//************************************************************************************************************************
////////////////////////// Now creating the wall:


function wall() {

  for(var c=0;c<brick_col;c++){
  	for(var r=0;r<brick_row;r++){
  		if(bricks[c][r].status==1){
  		var brick_x=(c*(brick_width+brick_padding))+offsetleft;
  		var brick_y=(r*(brick_width+brick_padding))+offsettop;
  		bricks[c][r].x=brick_x;
  		bricks[c][r].y=brick_y;
  		context.beginPath();
  		context.rect(brick_x,brick_y,brick_width,brick_height);
  		context.fillStyle=color_c[count];
  		context.strokeStyle="yellow";
  		context.fill();
  		context.closePath();
  	}
  }

}
if(count!=2){
count++;

}
else{
	count=0;
}
}

//***********************************************************************************************************************








//***********************************************************************************************************************
//////////////////////////////////////        MOVING THE BALL:

function update(score) {
context.clearRect(0,0,canvas.width,canvas.height);	
if(score!=14){
	var e=score;
wall();
ball();
board();
wall_destroy();

/////////////////// for ball:
if (x_axis+dx>= canvas.width-radius||x_axis+dx<=radius){
	bounce.play();
	dx=-dx;
}
if(y_axis+dy<radius){
	bounce.play();
	dy=-dy;
}
else if(y_axis+dy>canvas.height-radius || y_axis+dy>canvas.height-(radius+height)){
	if(x_axis> x && x_axis<(x+width)){
		target.play();
		dy=-dy;
	}

	else{
		end.play();
		
		
	if(l==1){
		 
        document.getElementById("img_1").src="null.jpg"; 
       dy=-dy;
	}
	else if(l==2){

      document.getElementById("img_2").src="null.jpg";
      dy=-dy;		
	}
	else if(l==3){

		document.getElementById("img_3").src="null.jpg";
		context.drawImage(loser,0,0,700,400);
	
		clearInterval(interval);
	}
	l++;
		
}
}

//////////////// for Keys:
if(right && x<=canvas.width-width){
	x+=5;
}
else if(left && x>0){
	x-=5;
}



///  increment in x-axis and y-axis to move the ball:
x_axis += dx;
y_axis += dy;

}

else if(score==14){
	context.clearRect(0,0,canvas.width,canvas.height);		
    clearInterval(interval); //
}

}



	




//******************************************************************************************************************

/////////////// CHECKING THE GAME IF IT IS OVER OR NOT:
function game_over(score) {
     if(score==14){
     	context.clearRect(0,0,canvas.width,canvas.height);
		context.drawImage(trophy,0,0,700,400);
		var p=document.getElementById('one');
		var s=document.createTextNode(score);
		p.appendChild(s);
		clearInterval(interval);  
     }
     
	
	}


//*********************************************************************************************************************
//////    Setting Interval for calling function update in every 10ms:

var interval=setInterval(update,20);
//***********************************************************************************************************************





