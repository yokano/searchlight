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
 * @param {オブジェクト} players ユーザ一覧 idで引ける
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
		this.changeScene(TitleScene);
	},
	
	/**
	 * シーンを切り替える
	 * @function
	 * @memberOf Game
	 * @param {クラス} 切り替え先のシーンクラス
	 */
	changeScene: function(scene) {
		this.popScene();
		this.pushScene(scene());
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