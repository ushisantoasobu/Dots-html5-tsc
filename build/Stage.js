var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Stage = (function (_super) {
    __extends(Stage, _super);
    // コンストラクタ
    /**  */
    function Stage(canvas) {
        this.canvas = canvas;
        // クラス変数
        /**  */
        this.canvas = null;
        /** コンテクスト */
        this.ctx = null;
        this.ctx = canvas.getContext('2d');
    }
    // メンバ関数
    /**  */
    Stage.prototype.update = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.children.length; i++) {
            var obj = this.children[i];
            if (obj.update !== undefined) {
                obj.update(this.ctx, 0, 0); //bad??
            }
        }
    };

    Object.defineProperty(Stage.prototype, "getCanvas", {
        // get アクセサ
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    return Stage;
})(Container);

/////
/////
/////
/////
/////
/////
this.dots = this.dots || {};

(function () {
    var Stage = function (canvas) {
        this.initialize(canvas);
    };

    var p = Stage.prototype = new dots.Container();

    /** キャンバス */
    p._canvas;

    /** コンテクスト */
    p._ctx;

    /**
    * 初期処理
    *
    * @param canvas
    */
    p.initialize = function (canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    };

    /**
    * 更新処理
    *
    */
    p.update = function () {
        //
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        for (var i = 0; i < this._children.length; i++) {
            var obj = this._children[i];
            if (obj.update !== undefined) {
                obj.update(this._ctx, 0, 0); //bad??
            }
        }
    };

    /**
    * キャンバスを取得する
    *
    */
    p.getCanvas = function () {
        return this._canvas;
    };

    dots.Stage = Stage;
})();
