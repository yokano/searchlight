/**
 * パターンクラス
 * サーチライトが出現するパターンの基底クラス
 * @class
 * @property {数値} _lightNum 生成したライトの数
 * @property {数値} _count 動作完了したライトの数
 * @param {数値} lightNum 生成するライトの数
 */
var Pattern = Class.create(Group, {
	_lightNum: 0,
	_count: 0,
	_callback: null,
	initialize: function(lightNum, callback) {
		Group.call(this);
		this._lightNum = lightNum;
		this._callback = callback;
		
		// ライトを追加
		for(var i = 0; i < this._lightNum; i++) {
			var light = new Searchlight(200);
			this.addChild(light);
		}
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
		
		// 発生場所を設定
		var start = this._getRandomizedPoint();
		this.x = start.x;
		this.y = start.y;
		
		// 移動先を設定
		var end;
		do {
			end = this._getRandomizedPoint();
		} while(end.x == start.x || end.y == start.y);
		
		// 移動
		this.tl.moveTo(end.x, end.y, game.fps * 10).removeFromScene().then(function() {
			this.parentNode.lightWasMoved();
		});
		
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
	},
	
	/**
	 * ゲーム画面の外枠からライトの半径分離れた距離にあるランダムな点の座標を得る
	 * 画面外に、画面よりも r ピクセル大きい四角形を考え、
	 * 四角形の辺を構成するある1点をランダムに選び座標を得る。
	 * 引数で、上下左右のどの辺から選ぶを指定できる。
	 * @function
	 * @memberOf Searchlight
	 * @param {'top'/'bottom'/'left'/'right'} どのへんから取得するか。省略するとすべての辺を対象とする。
	 * @returns {x:x座標, y:y座標} 取得した点
	 */
	_getRandomizedPoint: function() {
		var p = {};
		
		// 四角形の左上に点をおく
		p.x = -(this._r * 2);
		p.y = -(this._r * 2);
		
		// 点を右に動かすか、下に動かすか決める
		var direction = '';
		if(Math.random() < 0.5) {
			direction = 'x';
		} else {
			direction = 'y';
		}
		
		// 点をランダムな距離動かす
		var distance = 0;
		if(direction == 'x') {
			distance = Math.floor(Math.random() * (game.width + 2 * this._r));
		} else {
			distance = Math.floor(Math.random() * (game.height + 2 * this._r));
		}
		p[direction] += distance;
		
		// 50%の確率で点を対辺へ移動させる
		if(Math.random() < 0.5) {
			if(direction == 'x') {
				p.y += game.height + 2 * this._r;
			} else {
				p.x += game.width + 2 * this._r;
			}
		}
		
		return p;
	}
});