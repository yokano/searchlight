/**
 * メイン
 * モデルの作成とシーンの切り替え
 * @author yuta.okano@gmail.com
 */
enchant();

// エントリポイント
var game;
window.onload = function() {
	game = new Game();
	game.start();
};

/**
 * ゲーム管理クラス
 * @class
 * @extends Core
 * @param {オブジェクト} players ユーザ一覧 TouchEventのidで引ける
 */
var Game = Class.create(Core, {
	players: null,
	
	/**
	 * コンストラクタ
	 * @memberOf Game
	 * @function
	 */
	initialize: function() {
		Core.call(this, config.width, config.height);
		this.players = {};
		
		// タイトルを表示
		this.changeScene(TitleScene);
		
		// タッチイベントをシーンへ渡す
		window.addEventListener('touchstart', function(e) {
			game.currentScene.touchstart(e);
		}, true);
		window.addEventListener('touchend', function(e) {
			game.currentScene.touchend(e);
		}, true);
	},
	
	/**
	 * シーンを切り替える
	 * @function
	 * @memberOf Game
	 * @param {Scene} scene 切り替え先のシーンクラス
	 * @param {真理値} pop イベントを継続させるならtrue イベントをリセットするならfalse 省略するとfalseになる
	 */
	changeScene: function(scene, pop) {
		pop = (pop == undefined) ? false : pop;
		if(pop) {
			this.popScene();
		}
		this.pushScene(scene());
	},
	
	/**
	 * 生きているプレイヤーの数を取得する
	 * @function
	 * @memberOf Game
	 * @returns {数値} 生きているプレイヤーの数
	 */
	countLivings: function() {
		var count = 0;
		for(var id in this.players) {
			var player = this.players[id];
			if(player.alive) {
				count++;
			}
		}
		return count;
	}
});

/**
 * 円形のサーフェイスを作成する汎用関数
 * @function
 * @param {数値} r 半径
 * @param {文字列} color 円の色
 * @returns {Surface} 円のSurfaceオブジェクト
 */
var getCircle = function(r, color) {
	var surface = new Surface(r * 2, r * 2);
	surface.context.fillStyle = color;
	surface.context.beginPath();
	surface.context.arc(r, r, r, 0, Math.PI * 2);
	surface.context.fill();
	surface.context.closePath();
	return surface;
};