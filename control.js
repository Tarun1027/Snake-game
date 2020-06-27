function init(){
	//this function is used for initialising the elements
	var canvas=document.getElementById("myCanvas");
	//we make a square canvas so specify the height and width
	w=canvas.width=850;
	h=canvas.height=850;
	//we need a pen object to draw something on the canvas
	//two-dimensional rendering context
	pen=canvas.getContext('2d');
	//cell size, matches wih the grid size of the canvas 
	cellSize=67;
	//calling the food object
	food=getRandom();
	//game over indicator
	gameOver=false;
	//cresting the fod image object
	foodImg=new Image();
	foodImg.src="apple.png";
	//creating the trophy image
	scoreImg=new Image();
	scoreImg.src="trophy.png";
	//a score variable
	score=100;
	//creating the snake object
	//parameters of fillRect(): x,y,width,height
	//we create a snake of len 5 at coord x=1,y=0
	//basically, what we do is draw the array of snake at those coords of size 50*50
	snake={
		init_len:5,
		color:"red",
		cells:[],
		direction:"right",
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cellSize,this.cells[i].y*cellSize,cellSize-2,cellSize-2);
			}
		},
		updateSnake:function(){
			//we pop a cell from back of snake and add it to its head
			//if the snake has eaten the food then we need to increase the length of the snake
			//generate new food object
			var headx=this.cells[0].x;
			var heady=this.cells[0].y;
			//for collision the coordinates match
			if(headx==food.x && heady==food.y){
				console.log("Yum! Food detected");
				food=getRandom();
				score=score+50;
			}
			else{
				this.cells.pop();
			}
			var nextx,nexty;
			if(this.direction=="right"){
				nextx=headx+1;
				nexty=heady;
			}
			else if(this.direction=="left"){
				nextx=headx-1;
				nexty=heady;
			}
			else if(this.direction=="down"){
				nextx=headx;
				nexty=heady+1;
			}
			else{
				nextx=headx;
				nexty=heady-1;
			}
			this.cells.unshift({x:nextx,y:nexty});
			//that the snake touches the boundary of the game board
			var lastx=Math.round(w/cellSize);
			var lasty=Math.round(h/cellSize);
			if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>lastx||this.cells[0].y>lasty){
				gameOver=true;	
			}
		}
	};
	//call the snake create function to put it in its form
	snake.createSnake();
	//add an event listener on the document object
	function keyPressed(e){
		//to update the direction,we use conditional statements
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		else{
			snake.direction="up";
		}

	}
	document.addEventListener('keydown',keyPressed);


}
function draw(){
	//we call the draw snake function here
	//whenever a new snake is drawn, old must be erased
	pen.clearRect(0,0,w,h);
	snake.drawSnake();
	pen.drawImage(foodImg,food.x*cellSize,food.y*cellSize,cellSize,cellSize);
	pen.drawImage(scoreImg,28,30,cellSize,cellSize);
	pen.fillStyle="blue";
	pen.font="20px Roboto";
	pen.fillText(score,50,50); //write score at coords 
}
function update(){
	//we call the update function here
	snake.updateSnake();
}
function getRandom(){
	var foodx=Math.round(Math.random()*(w-cellSize)/cellSize);
	var foody=Math.round(Math.random()*(h-cellSize)/cellSize);
	//we create a food object
	var food={
		x:foodx,
		y:foody,
		color:"red"
	}
	return food;
}

//this function keeps drawing and updating the snake till the game ends
function gameLoop(){
	if(gameOver==true){
		clearInterval(f);
		alert("Game Over!");
		return;
	}
	draw();
	update();
}
init();
var f=setInterval(gameLoop,400); //call the gameLoop function after every hundred miliseconds