/**
 * タイトルシーン
 * @class
 * @extends Scene
 * @property {Label} _title タイトル
 * @property {Label} _message "-tap to start-"
 * @property {Sprite} _light サーチライト
 * @property {数値} _r サーチライトの半径
 */
var TitleScene = Class.create(Scene, {
	_title: null,
	_message: null,
	_light: null,
	_r: 150,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf TitleScene
	 */
	initialize: function() {
		Scene.call(this);
		this.backgroundColor = 'black';
		
		// タイトル文字を表示
		var title = new Label();
		title.font = '150px Iceland';
		title.color = 'white';
		title.text = 'SEARCHLIGHT';
		title.width = config.width;
		title.x = 75;
		title.y = config.height / 2 - 100;
		this.addChild(title);
		this._title = title;
		
		// 点滅する文字
		var message = new Label();
		message.font = '50px Iceland';
		message.color = 'white';
		message.text = '- tap to start -';
		message.width = config.width;
		message.x = 380;
		message.y = config.height / 2 + 50;
		message.tl.fadeTo(0, config.fps / 4).fadeTo(1, config.fps / 2).loop();
		this.addChild(message);
		this._message = message;
		
		// サーチライトを表示
		var r = this._r;
		var light = new Sprite(r * 2, r * 2);
		light.image = getCircle(r, 'white');
		light.y = 200;
		light.opacity = 0.2;
		light.dx = +5;
		light.dy = +5;
		light.addEventListener(Event.ENTER_FRAME, function() {
			this.x += this.dx;
			this.y += this.dy;
			if(this.x < 0 || config.width < this.x + this.width) {
				this.dx *= -1;
			}
			if(this.y < 0 || config.height < this.y + this.height) {
				this.dy *= -1;
			}
		});
		this.addChild(light);
		this._light = light;
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf TitleScene
	 */
	touchstart: function(e) {
		// タップしたらログインシーンへ
		this._title.tl.fadeTo(0, config.fps / 3);
		this._message.tl.clear().unloop().fadeTo(0, config.fps / 3);
		this._light.clearEventListener();
		this._light.tl
			.fadeTo(1, config.fps / 3,SIN_EASEOUT)
			.and()
			.moveTo(config.width / 2 - this._r, config.height / 2 - this._r, config.fps / 2, ELASTIC_EASEOUT)
			.then(function() {
				game.changeScene(LoginScene, true);
			});
		
		// １度きりの実行
		this.touchstart = function() {};
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf TitleScene
	 */
	touchend: function(e) {
	
	}
});