/**
 * ユーザクラス
 * @class
 * @param {文字列} id ユーザの識別子
 * @property {文字列} id ユーザの識別子 タッチイベントのidを使用する
 * @property {Sprite} _animation 指を置いている座標に発生するアニメーション
 * @property {文字列} color アニメーションの色　CSSのcolor表記
 * @property {論理値} alive プレイヤーが生きていればtrue　死んでいればfalse
 * @property {Touch} touch タッチイベントオブジェクト
 */
var User = Class.create({
	id: '',
	alive: true,
	color: '',
	_animation: null,
	_touch: null,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf User
	 * @param {Touch} touch タッチイベントオブジェクト
	 * @param {文字列} color アニメーションの色
	 */
	initialize: function(touch, color) {
		this._touch = touch;
		this.color = color;
	}
});