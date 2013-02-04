enchant();

var finger = {};

window.onload = function() {
	var game = new Game(innerWidth, innerHeight);
	game.rootScene.backgroundColor = 'black';
	game.fps = 60;
	game.onload = function() {
		var count = -1;
		window.addEventListener('touchstart', function(e) {
			var r = 75;
			var animation = new Sprite(r*2, r*2);
			var surface = new Surface(r*2, r*2);
			
			var colors = [
				'red',
				'white',
				'blue',
				'yellow',
				'pink',
				'lime',
				'skyblue'
			];
			count = (count + 1) % colors.length;
			
			surface.context.fillStyle = colors[count];
			surface.context.beginPath();
			surface.context.arc(r, r, r, 0, Math.PI * 2);
			surface.context.fill();
			animation.image = surface;
			
			// アニメーション
			var easing = CIRC_EASEOUT;
			var time = 60;
			var f = function() {
				animation.tl.scaleTo(0, 0, 0).show().scaleTo(1.2, 1.2, time, easing).and().fadeTo(0, time, easing).then(f);
			};
			animation.tl.scaleTo(1.2, 1.2, time, easing).and().fadeTo(0, time, easing).then(f);
			
			// 座標更新
			var touch = e.changedTouches[0];
			animation.addEventListener(Event.ENTER_FRAME, function() {
				animation.x = touch.clientX - r;
				animation.y = touch.clientY - r;
			});
			
			// 描画
			animation.scaleX = 0;
			animation.scaleY = 0;
			animation.x = touch.clientX - r;
			animation.y = touch.clientY - r;
			game.rootScene.addChild(animation);
		});
		
	};
	game.start();
};
