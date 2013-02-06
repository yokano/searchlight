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