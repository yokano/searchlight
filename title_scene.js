/**
 * タイトルシーン
 * @class
 * @extends Scene
 */
var TitleScene = Class.create(Scene, {
	
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
		
		// サーチライトを表示
		var light = new Sprite(300, 300);
		light.image = getCircle(150, 'white');
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
		
		// タップしたらログインシーンへ
		this.addEventListener(Event.TOUCH_START, function() {
			game.changeScene(LoginScene);
		});
	}
});