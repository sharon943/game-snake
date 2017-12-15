window.onload = function () {
	//游戏场景的构建
	//棋盘的坐标思想
	// 绘制棋盘
	var box = document.querySelector('.box')
	var str = ''
	var gameBegin = document.querySelector('.game-begin')
	var count = document.querySelector('.count span')
	var endgame = document.querySelector('.end')
	var sub = 0
	var t
	var yes = document.querySelector('.yes')
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			str += `<div id="c${j}-${i}"></div>`
		}
	}
	box.innerHTML=str
	// 棋盘绘制完毕
	


	// 设置she
	var she = [
		{x: 0, y: 0},
		{x: 1, y: 0},
		{x: 2, y: 0}
	]
	// 定义移动的方向
	var dir
	document.onkeydown = function (e) {
		var key = e.keyCode
		switch (key) {
			case 37:
				if (dir == 'r') {
					return
				}
				dir = 'l'
				break
			case 38:
				if (dir == 'b') {
					return
				}
				dir = 't'
				break
			case 39:
				if (dir == 'l') {
					return
				}
				dir = 'r'
				break
			case 40:
				if (dir == 't') {
					return
				}
				dir = 'b'
				break
		}
	}
	// 设置蛇的运动
	function move(dir = 'r') {
		//旧蛇头的位置
		var oldhead = she[she.length-1]
		//根据旧蛇头位置和键盘方向 获得新蛇头的位置
		switch (dir) {
			case 'r':
				var newhead = {x: oldhead.x+1, y: oldhead.y}
				break
			case 'l':
				var newhead = {x: oldhead.x-1, y: oldhead.y}
				break
			case 't':
				var newhead = {x: oldhead.x, y: oldhead.y-1}
				break
			case 'b':
				var newhead = {x: oldhead.x, y: oldhead.y+1}
				break
		}
		//
		var cls = `#c${newhead.x}-${newhead.y}`
		var divshe = document.querySelector(cls)
		//判断是否撞墙和撞到自己
		if (divshe== null || check(newhead.x, newhead.y)) {
			endgame.style.display = 'block'
			clearInterval(t)

			
		}
		she.push(newhead)
		//给新蛇加背景
		divshe.className='she'
		// var shetou = document.querySelectorAll('.she')
		// shetou[shetou.length-2].classList.remove('head')
		// shetou[shetou.length-1].classList.add('head')
		// 判断是否吃到蛇
		if (she[she.length-1].x == food.x && she[she.length-1].y == food.y) {
			food = getFood()
		} else {
			//移除蛇尾的背景
			var end = she.shift()
			var endcls = `#c${end.x}-${end.y}`
			var endshe = document.querySelector(endcls)
			endshe.classList.remove('she')
		}	
	}
	gameBegin.onclick = function () {
		t = setInterval(function () {
			move(dir)
		}, 200)
	}
	yes.onclick = function () {
		endgame.style.display = 'none'
		location.reload()
	}
	
	she.forEach(function (value) {
		var cls = `#c${value.x}-${value.y}`
		var divshe = document.querySelector(cls)
		divshe.classList.add('she')
	})
	// 设置she完毕

	// 设置food
	function getFood() {
		do{
			var x = Math.floor(Math.random() * 20)
			var y = Math.floor(Math.random() * 20)
		} while(check(x,y))
	// 得到food的坐标
		food = {x: x, y: y}
		var cls = `#c${food.x}-${food.y}`
		var divfood = document.querySelector(cls)
		divfood.classList.add('food')
		count.innerText = sub
		sub++
		return food
	}
	// 判断x、y在不在she身上
	function check(a, b) {
		var result = she.some(function (value) {
			return value.x == a && value.y == b
			
		})
		return result
	}
	
	var food = getFood()
	
	// food设置完毕
}