/**
 * ゲームシーン
 * スポットライトを避けるシーン
 * @class
 * @extends Scene
 */
var GameScene = Class.create(Scene, {
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf GameScene
	 */
	initialize: function() {
		Scene.call(this);
		this.backgroundColor = 'black';
	},
	
	/**
	 * シーン開始直後の処理
	 * @function
	 * @memberOf GameScene
	 */
	onenter: function() {
		
		// プレイヤーアニメーションを画面に追加
		for(var id in game.players) {
			this.addChild(game.players[id]);
		}
		
		this.startPattern();
	},
	
	/**
	 * サーチライトのパターンを開始する
	 * @function
	 * @memberOf GameScene
	 * @see Pattern
	 */
	startPattern: function() {
		var pattern = new Pattern();
		this.addChild(pattern);
	},
	
	/**
	 * タッチされた時の処理
	 * @function
	 * @memberOf GameScene
	 */
	touchstart: function(e) {
	
	},
	
	/**
	 * 指が離れた時の処理
	 * @function
	 * @memberOf GameScene
	 */
	touchend: function(e) {
		for(var i = 0; i < e.changedTouches.length; i++) {
			var id = e.changedTouches[i].identifier;
			this.dropout(id);
		}
	},
	
	/**
	 * プレイヤーを脱落させる
	 * @function
	 * @memberOf GameScene
	 */
	 dropout: function(id) {
		this.removeChild(game.players[id]);
		game.players[id].alive = false;
		
		if(game.countLivings() <= 1) {
			game.popScene(); // login_sceneを削除
			game.changeScene(ResultScene, true);
		}
	 }
});
