enchant();

// エントリーポイント
var game;
window.onload = function() {
	game = new Game(innerWidth, innerHeight);
	game.fps = 60;
	game.onload = function() {
		game.rootScene.backgroundColor = 'black';
		var light = new Searchlight(300);
		this.rootScene.addChild(light);
	};
	game.start();
};

/**
 * ゲーム管理クラス
 * @class
 */
var Game = Class.create(Core, {
	initialize: function(width, height) {
		Core.call(this, width, height);
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
		Sprite.call(this);
		this._r = r;

		this.width = r;
		this.height = r;
		
		var point = this._getRandomizedPoint();
		this.x = point.x;
		this.y = point.y;
		
		this.image = this._circle();
	},
	
	/**
	 * 円のサーフェイスを返す
	 * @function
	 * @memberOf Searchlight
	 * @returns {Surfaceオブジェクト} 円のサーフェイス
	 */
	_circle: function() {
		var r = this._r;
		var surface = new Surface(r, r);
		surface.context.strokeStyle = 'white';
		surface.context.fillStyle = 'white';
		surface.context.beginPath();
		surface.context.arc(r/2, r/2, r/2, 0, Math.PI * 2, true);
		surface.context.fill();
		return surface;
	},
	
	/**
	 * ゲーム画面の外枠からライトの半径分離れた距離にあるランダムな点の座標を得る
	 * 画面外に、画面よりも r ピクセル大きい四角形を考え、
	 * 四角形の辺を構成するある1点をランダムに選び座標を得る。
	 * @function
	 * @memberOf Searchlight
	 * @returns {x:x座標, y:y座標} 取得した点
	 */
	_getRandomizedPoint: function() {
		var p = {};
		
		// 四角形の左上に点をおく
		p.x = -(this._r);
		p.y = -(this._r);
		
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