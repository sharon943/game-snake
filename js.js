
window.onload=function(){
function Game(){
	this.she=[
		{x:0,y:0},
		{x:1,y:0},
		{x:2,y:0},
		{x:3,y:0}
	];
	this.food={};
	this.direction = 'r';
	this.t=null;
	this.speed=150;
	this.fenshu=0;
	console.log(this.she.length)
}
Game.prototype= {
	drawSence:function(){
		var box=document.querySelector('.box');
		var str=box.innerHTML;
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				str+=`<div id="c${j}-${i}"></div>`
			}
		}
		box.innerHTML=str;
	},
	drawShe:function(){
		this.she.forEach( function(obj) {
			var id='#c'+obj.x+'-'+obj.y;
			var domobj=document.querySelector(id);
			domobj.classList.add('she');
		});
	},
	getFood:function(){
		do{
			var x=Math.floor(Math.random()*20);
			var y=Math.floor(Math.random()*20);
		}while(this.check(x,y))//在蛇身上
	
		var foodobj=document.querySelector(`#c${x}-${y}`)
		foodobj.classList.add('food');
		this.food={x:x,y:y};
	},
	check:function(a,b){
		return this.she.some(function(value){
			console.log(value.x,value.y,a,b)
			return value.x==a&&value.y==b;
		})
	},
	move:function(){
		var self=this;
		this.t=setInterval(function(){
			var oldhead=self.she[self.she.length-1];
			var newhead;
			switch(self.direction){
				case 'l':newhead={x:oldhead.x-1,y:oldhead.y};break;
				case 'r':newhead={x:oldhead.x+1,y:oldhead.y};break;
				case 'b':newhead={x:oldhead.x,y:oldhead.y+1};break;
				case 't':newhead={x:oldhead.x,y:oldhead.y-1};break;
			}
			
			var newheadobj=document.querySelector(`#c${newhead.x}-${newhead.y}`);
			if(newheadobj==null||self.check(newhead.x,newhead.y)){
				alert('Game over!');
				clearInterval(self.t);
				return;
			}
			newheadobj.className='she';
			self.she.push(newhead);

			if(newhead.x==self.food.x&&newhead.y==self.food.y){
				self.getFood();
				self.fenshu++;

				var fenshuobj= document.querySelector('div.fenshu');
				fenshuobj.innerHTML=self.fenshu;
				if(this.fenshu==10){
					this.nextbegin();
					return;
				}
				if(this.fenshu==20){
					this.nextbegin();
					return;
				}
				if(this.fenshu==30){
					this.nextbegin();
					return;
				}
			}else{
				var end=self.she.shift();
				var endobj=document.querySelector(`#c${end.x}-${end.y}`)
				endobj.classList.remove('she');
			}
		},this.speed);
	},
	controlDir:function(){
		var self=this;
		document.onkeydown=function(e){
			var code=e.keyCode;
			switch (code) {
				case 37:
					if(self.direction == 'r'){
						return;
					}
					self.direction = 'l';
					break;
				case 38:
					if(self.direction == 'b'){
						return;
					}
					self.direction = 't';
					break;
				case 39:
					if(self.direction == 'l'){
						return;
					}
					self.direction = 'r';
					break;
				case 40:
					if(self.direction == 't'){
						return;
					}
					self.direction = 'b';
					break;
				
			}
		}
	},
	play:function(){
		this.drawSence();
		this.drawShe();
		this.getFood();
		this.move();
		this.controlDir();
	},
	nextbegin:function(){
		clearInterval(this.t);
		this.speed-=20;
	}
};

	var obj=new Game();
	// var btn=document.querySelector('button');
	// btn.onclick=function(){
		
		obj.play();
	// }
}
