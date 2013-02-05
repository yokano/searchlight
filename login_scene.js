/**
 * ログインシーン
 * ゲームの参加者を募ってゲームを開始する
 * @class
 * @extends Scene
 * @property {Sprite} _loginCircle ゲーム参加者が入る中央の円
 * @property {配列（文字列）} _colors プレイヤーに割り当てる色リスト
 */
var LoginScene = Class.create(Scene, {
	_loginCircle: null,
	_colors: ['red', 'skyblue', 'lime', 'yellow', 'pink', 'blue', 'green'],
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf LoginScene
	 */
	initialize: function() {
		Scene.call(this);
		this.backgroundColor = 'black';
		this._loginCircle = new LoginCircle(150);
		this.addChild(this._loginCircle);
		
		var self = this;
		window.addEventListener('touchstart', function(e) {
			self.touchstart(e);
		});
		window.addEventListener('touchend', function(e) {
			self.touchend(e);
		});
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf LoginScene
	 * @param {Event} e イベント情報
	 */
	touchstart: function(e) {
		for(var i = 0; i < e.changedTouches.length; i++) {
			var touch = e.changedTouches[i];
			var player = new Player(touch, this._colors[touch.identifier % this._colors.length]);
			game.players[touch.identifier] = player;
		}
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf LoginScene
	 */
	touchend: function(e) {
		for(var i = 0; i < e.changedTouches.length; i++) {
			var id = e.changedTouches[i].identifier;
			this.removeChild(game.players[id]);
			delete game.players[id];
		}
	}
});

/**
 * ログインサークル
 * ゲーム参加者が集まる円
 * @class
 * @param {数値} r 半径
 * @property {数値} _r 半径
 * @property {数値} _count 中央の円に入っている人数
 */
var LoginCircle = Class.create(Sprite, {
	_r: 0,
	_count: 0,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf LoginCircle
	 * @param {数値} r 半径
	 */
	initialize: function(r) {
		Sprite.call(this, r * 2, r * 2);
		this._r = r;
		this.x = config.width / 2 - r;
		this.y = config.height / 2 - r;
		this.image = getCircle(r, 'white');
	},
	
	/**
	 * フレームごとの処理
	 * @function
	 * @memberOf LoginCircle
	 */
	onenterframe: function() {
		for(var key in game.players) {
			var player = game.players[key];
			
			// 円の中心と指の距離を測定
			var x = player._touch.clientX;
			var y = player._touch.clientY;
			var cx = this.x + this._r;
			var cy = this.y + this._r;
			var dx = Math.abs(x - cx);
			var dy = Math.abs(y - cy);
							
			// まだ円の中に入ってない奴がいたら
			if(!player.ready) {
				
				// 円の中に入っているかチェックして
				if(dx * dx + dy * dy < this._r * this._r) {
					player.ready = true;
					this._count++;
					this.tl.clear().scaleTo(0.9, 0.9, 3).scaleTo(1, 1, 2);
					
					// 全員入ったら
					if(this._count >= Object.keys(game.players).length) {
						game.changeScene(GameScene);
					}
				}
			}
			
			// もう円の中に入っている奴は
			else {
				// 外に出ていないかチェック
				if(dx * dx + dy * dy > this._r * this._r) {
					player.ready = false;
					this._count--;
					this.tl.clear().scaleTo(1.1, 1.1, 3).scaleTo(1, 1, 1);
				}
			}
		}
	}
});