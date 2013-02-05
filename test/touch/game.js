enchant();

window.onload = function() {
	var game = new Game(innerWidth, innerHeight);
	game.fps = 60;
	var touches = [];
	
	game.onload = function() {
		game.rootScene.backgroundColor = 'black';
		
		// サークル
		var r = 200;
		var circle = new Sprite(r * 2, r * 2);
		var surface = new Surface(r * 2, r * 2);
		surface.context.fillStyle = 'white';
		surface.context.beginPath();
		surface.context.arc(r, r, r, 0, Math.PI * 2);
		surface.context.fill();
		circle.image = surface;
		circle.x = game.width / 2 - r;
		circle.y = game.height / 2 - r;
		game.rootScene.addChild(circle);
		
		// サークルイベント
		circle.ready = [];
		circle.counter = 0;
		circle.center = {};
		circle.center.x = circle.x + r;
		circle.center.y = circle.y + r;
		circle.addEventListener(Event.ENTER_FRAME, function() {
			
			// すべてのプレイヤーに対して
			for(var i = 0; i < touches.length; i++) {
				
				// 円の中心と指の距離を測定
				var x = touches[i].clientX;
				var y = touches[i].clientY;
				var cx = circle.center.x;
				var cy = circle.center.y;
				var dx = Math.abs(x - cx);
				var dy = Math.abs(y - cy);
								
				// まだ円の中に入ってない奴がいたら
				if(!touches[i].ready) {
					// 円の中に入っているかチェックして
					if(dx * dx + dy * dy < r * r) {
						console.log('入ってるよ');
						touches[i].ready = true;
						circ le.counter++;
						circle.tl.scaleTo(0.9, 0.9, 2).scaleTo(1, 1, 1);
						
						// 全員入ったら
						if(circle.counter >= touches.length) {
							console.log('全員入ったよ');
						}
					}
				}
				
				// もう円の中に入っている奴は
				else {
					// 外に出ていないかチェック
					if(dx + dy > r) {
						console.log('出たよ');
						touches[i].ready = false;
						circle.counter--;
						circle.tl.scaleTo(1.1, 1.1, 1).scaleTo(1, 1, 1);
					}
				}
			}
		});
		
		// タッチしたらログイン
		window.addEventListener('touchstart', function(e) {
			e.changedTouches[0].ready = false;
			touches.push(e.changedTouches[0]);
		});
	};
	
	game.start();
};
