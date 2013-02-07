/**
 * リザルトシーン
 * @class
 * @extends Scene
 */
var ResultScene = Class.create(Scene, {
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf ResultScene
	 */
	initialize: function() {
		Scene.call(this);
		this.backgroundColor = 'black';
		
		var message = new Label();
		message.text = 'RESULT';
		message.color = 'white';
		message.font = '150px Iceland';
		message.width = config.width;
		message.y = config.height / 2 - 75;
		this.addChild(message);
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf ResultScene
	 */
	touchstart: function() {
		game.changeScene(TitleScene, true);
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf ResultScene
	 */
	touchend: function() {
		
	}
});