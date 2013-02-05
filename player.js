/**
 * プレイヤークラス
 * @class
 * @param {文字列} id 識別子
 * @property {文字列} id 識別子 タッチイベントのidを使用する
 * @property {文字列} color アニメーションの色　CSSのcolor表記
 * @property {論理値} alive 生きていればtrue　死んでいればfalse
 * @property {Touch} touch タッチイベントオブジェクト
 * @property {数値} _r アニメーションの半径
 * @property {論理値} ready 開始準備完了ならtrue それ以外はfalse
 * @extends Sprite
 */
var Player = Class.create(Sprite, {
	id: '',
	alive: true,
	color: '',
	ready: false,
	_touch: null,
	_r: 75,
	
	/**
	 * コンストラクタ
	 * @function
	 * @memberOf Player
	 * @param {Touch} touch タッチイベントオブジェクト
	 * @param {文字列} color アニメーションの色
	 */
	initialize: function(touch, color) {
		Sprite.call(this, this._r * 2, this._r * 2);
		this._touch = touch;
		this.color = color;
		var circle = getCircle(this._r, color);
		this.image = circle;
		
		// アニメーション
		var easing = CIRC_EASEOUT;
		var time = config.fps / 3;
		var self = this;
		var f = function() {
			this.x = this._touch.clientX - this._r;
			this.y = this._touch.clientY - this._r;
			self.tl.scaleTo(0, 0, 0).show().scaleTo(1.2, 1.2, time, easing).and().fadeTo(0, time, easing).then(f);
		};
		this.tl.scaleTo(1.2, 1.2, time, easing).and().fadeTo(0, time, easing).then(f);
		
		this.scaleX = 0;
		this.scaleY = 0;
		this.x = touch.clientX - this._r;
		this.y = touch.clientY - this._r;
		game.currentScene.addChild(this);
	}
});