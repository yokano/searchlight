/**
 * パターンベースクラス
 * サーチライトが出現するパターンの基底クラス
 * @class
 * @property {数値} _lightNum 生成したライトの数
 * @property {数値} _count 動作完了したライトの数
 * @param {数値} lightNum 生成するライトの数
 */
var PatternBase = Class.create(Group, {
	_lightNum: 0,
	_count: 0,
	initialize: function(lightNum, callback) {
		Group.call(this);
		this._lightNum = lightNum;
		this._callback = callback;
	},
	
	/**
	 * ライトの動作が完了するたびに呼ばれる
	 * @function
	 * @memberOf Pattern
	 */
	lightWasMoved: function() {
		this._count++;
		if(this._lightNum <= this._count) {
			this.scene.patternHasFinished();
		}
	},
	
	/**
	 * ゲーム画面の外枠からライトの半径分離れた距離にあるランダムな点の座標を得る
	 * 画面外に、画面よりも r ピクセル大きい四角形を考え、
	 * 四角形の辺を構成するある1点をランダムに選び座標を得る。
	 * 引数で、上下左右のどの辺から選ぶを指定できる。
	 * @function
	 * @memberOf PatternBase
	 * @param {数値} r 半径
	 * @param {'top'/'bottom'/'left'/'right'} direction どの辺から取得するか。省略するとすべての辺を対象とする。
	 * @returns {x:x座標, y:y座標} 取得した点
	 */
	_getRandomizedPoint: function(r, direction) {
		var p = {};
		
		// 四角形の左上に点をおく
		p.x = -r * 2;
		p.y = -r * 2;
		
		// 点を右に動かすか、下に動かすか決める
		if(Math.random() < 0.5) {
			direction = 'x';
		} else {
			direction = 'y';
		}
		
		// 点をランダムな距離動かす
		var distance = 0;
		if(direction == 'x') {
			distance = Math.floor(Math.random() * (game.width + 2 * r));
		} else {
			distance = Math.floor(Math.random() * (game.height + 2 * r));
		}
		p[direction] += distance;
		
		// 50%の確率で点を対辺へ移動させる
		if(Math.random() < 0.5) {
			if(direction == 'x') {
				p.y += game.height + 2 * r;
			} else {
				p.x += game.width + 2 * r;
			}
		}
		
		return p;
	}
});

/**
 * ランダムな箇所から直線にライトが動くパターン
 * @class
 * @extends PatternBase
 */
var RandomLinearPattern = Class.create(PatternBase, {
	initialize: function(lightNum, callback) {
		PatternBase.call(this, lightNum, callback);
		
		var r = 200;
		for(var i = 0; i < lightNum; i++) {
			var light = new Searchlight(r);
			
			var start = this._getRandomizedPoint(r);
			light.x = start.x;
			light.y = start.y;
			
			var end;
			do {
				end = this._getRandomizedPoint(r);
			} while(end.x == light.x || end.y == light.y);
			
			light.tl.moveTo(end.x, end.y, game.fps * 3).removeFromScene().then(function() {
				this.parentNode.lightWasMoved();
			});
			
			this.addChild(light);
		}
	}
});

/**
 * ランダムな箇所から垂直、または水平方向にライトが動くパターン
 * @class
 * @extends PatternBase
 */
var RandomLinearAcrossPattern = Class.create(PatternBase, {
	initialize: function(lightNum, callback) {
		PatternBase.call(this, lightNum, callback);
		var r = 150;
		for(var i = 0; i < lightNum; i++) {
			var light = new Searchlight(r);
			var start = this._getRandomizedPoint(r);
			var end = {};
			if(start.x == -r * 2) {
				end.x = game.width + r * 2;
				end.y = start.y;
			} else if(start.x == game.width) {
				end.x = -(r * 2);
				end.y = start.y;
			} else if(start.y == -r * 2) {
				end.x = start.x;
				end.y = game.height + r * 2;
			} else if(start.y == game.height) {
				end.x = start.x;
				end.y = -(r * 2);
			} else {
				console.log('game', game.width, game.height);
				console.log('outer', -r, game.width + r, -r, game.height + r);
				console.log('start', start.x, start.y);
				throw '不正な座標が設定されました';
			}
			
			light.x = start.x;
			light.y = start.y;
			light.tl.moveTo(end.x, end.y, game.fps * 3).removeFromScene().then(function() {
				this.parentNode.lightWasMoved();
			});
			
			this.addChild(light);
		}
	}
});

/**
 * ランダムな箇所から曲線を描きながら移動する
 * @class
 * @extends PatternBase
 */
//var RandomCurvePattern = Class.create(PatternBase, {
//	initialize: function(lightNum, callback) {
//		PatternBase.call(this, lightNum, callback);
//		var r = 150;
//		for(var i = 0; i < lightNum; i++) {
//			
//		}
//	}
//});

var RandomWavePattern = Class.create(PatternBase, {
	initialize: function(lightNum, callback) {
		PatternBase.call(this, lightNum, callback);
		 var r = 150;
		 for(var i = 0; i < lightNum; i++) {
		 	var light = new Searchlight(r);
			
			var start = this._getRandomizedPoint(r);
			light.x = start.x;
			light.y = start.y;
			
			light.dx = 0;
			light.dy = 0;
			if(start.x == -r * 2) {
				light.dx = 1;
			} else if(start.x == game.width) {
				light.dx = -1;
			} else if(start.y == -r * 2) {
				light.dy = 1;
			} else if(start.y == game.height) {
				light.dy = -1;
			} else {
				throw '不正な座標が設定されました';
			}
			
			if(Math.random() < 0.5) {
				light.moveDirection = +1;
			} else {
				light.moveDirection = -1;
			}
			
			light.addEventListener(Event.ENTER_FRAME, function() {
				var dx = this.dx;
				var dy = this.dy;
				if(dx == 0) {
					this.y = this.y + dy * 5;
					this.x += Math.sin(game.frame / 10) * this.moveDirection * r / 10;
					if(this.y < -r * 2 || game.height < this.y) {
						this.parentNode.lightWasMoved();
						this.parentNode.removeChild(this);
					}
				} else {
					this.x =  this.x + dx * 5;
					this.y += Math.sin(game.frame / 10) * r / 10;
					if(this.x < -r * 2 || game.width < this.x) {
						this.parentNode.lightWasMoved();
						this.parentNode.removeChild(this);
					}
				}
			});
			
			this.addChild(light);
		 }
	}
});

/**
 * 追跡するライトが発生するパターン
 * @class
 * @extends
 */
var RandomHomingPattern = Class.create(PatternBase, {
	initialize: function(lightNum) {
		PatternBase.call(this, lightNum);
		var r = 150;
		for(var i = 0; i < lightNum; i++) {
			var light = new Searchlight(r);
			
			var start = this._getRandomizedPoint(r);
			light.x = start.x;
			light.y = start.y;
			
			var idList = Object.keys(game.players);
			var index = Math.floor(Math.random() * idList.length);
			var targetId = idList[index];
			light.target = game.players[targetId];
			
			light.addEventListener(Event.ENTER_FRAME, function() {
				var cx = this.x + r;
				var cy = this.y + r;

				var dx = this.target._touch.clientX - cx;
				var dy = this.target._touch.clientY - cy;

				this.x += dx / (game.fps * 3);
				this.y += dy / (game.fps * 3);
			});
			
			this.addChild(light);
		}
	}
});

/**
 * 壁で跳ね返るライトがランダムに現れるパターン
 * @class
 * @extends
 */
var RandomReflectionPattern = Class.create(PatternBase, {
	initialize: function() {
		PatternBase.call(this, lightNum);
	}
});

/**
 * サーチライト
 * @class
 * @extends Sprite
 * @property {数値} _r 半径
 */
var Searchlight = Class.create(Sprite, {
	_r: 0,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf Searchlight
	 * @param {数値} r 半径
	 */
	initialize: function(r) {
		Sprite.call(this, r * 2, r * 2);
		this._r = r;
		
		// 円の描画
		this.image = getCircle(r, 'white');
		
		// フレームごとに衝突判定
		this.addEventListener(Event.ENTER_FRAME, this._checkCollision);
	},
	
	/**
	 * 衝突判定
	 * @function
	 */
	_checkCollision: function() {
		for(var id in game.players) {
			var player = game.players[id];
			
			// 生きているプレイヤーだけ計算
			if(player.alive) {
				
				// 円の中心と指の距離を測定
				var x = player._touch.clientX;
				var y = player._touch.clientY;
				var cx = this.x + this._r;
				var cy = this.y + this._r;
				var dx = Math.abs(x - cx);
				var dy = Math.abs(y - cy);
				
				// 円の中に入っているかチェック
				if(dx * dx + dy * dy < this._r * this._r) {
					this.image.context.fillStyle = 'red';
					this.image.context.fill();
					this.scene.dropout(id);
				}
			}
		}
	}
});