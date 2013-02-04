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
		title.font = '100pt Iceland';
		title.color = 'white';
		title.text = 'SPOTLIGHT';
		title.width = config.width;
		title.x = 50;
		title.y = 25;
		this.addChild(title);
		
		// タップしたらログインシーンへ
		this.addEventListener(Event.TOUCH_START, function() {
//			game.changeScene(LoginScene);
			game.changeScene(GameScene);
		});
	}
});