var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dots = (function (_super) {
    __extends(Dots, _super);
    // コンストラクタ
    /**  */
    function Dots(x, y, radius, colorId) {
        _super.call(this, x, y, radius, "");
        // クラス変数
        /** 色ID */
        this.colorId = 0;
        /** 選択状態かどうか */
        this.selected = false;
        /** 位置インデックス */
        this.positionIndex = 1;
        /** 現在アニメーション中かどうか */
        this.isAnimation = false;
        /**  */
        this.rippleCount = 0;
        /**  */
        this.isRipple = false;
        this.COLORLIST = [
            'rgb(128, 100, 162)',
            'rgb(255, 200,  62)',
            'rgb( 48, 230,  92)'];
        /**
        * 移動アニメーション開始
        *
        * @param fromX
        * @param fromY
        * @param toX
        * @param toY
        * @param fps
        * @param duration
        * @param callback
        */
        this.startAnimation = function (fromX, fromY, toX, toY, fps, duration, callback) {
            var that = this;

            if (duration === 0) {
                that.x = toX;
                that.y = toY;
                if (callback) {
                    callback();
                }
                return;
            }

            this.isAnimation = true;
            var totalCount = fps * duration / 1000;
            var count = 0;
            var interval = setInterval(function () {
                that.x = fromX + (toX - fromX) * count / totalCount;
                that.y = fromY + (toY - fromY) * count / totalCount;

                count++;

                if (count === totalCount) {
                    clearInterval(interval);
                    that.isAnimation = false;
                    that.x = toX;
                    that.y = toY;
                    if (callback) {
                        callback();
                    }
                }
            }, 1000 / fps);
        };
        /**
        * 波紋アニメーションをする
        *
        * @param
        * @return
        */
        this.rippleAnimation = function () {
            this.isRipple = true;
        };
        this.drawRipple = function (ctx, addX, addY) {
            if (this.isRipple === true) {
                if (this.rippleCount === 30) {
                    this.isRipple = false;
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x + addX, this.y + addY, this.radius + this.radius * 2 / this.rippleCount, 0, Math.PI * 2, false);
                    ctx.strokeStyle = this.COLORLIST[this.colorId];
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                this.rippleCount++;
            }
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colorId = colorId;
    }
    // メンバ関数
    /**  */
    Dots.prototype.update = function (ctx, addX, addY) {
        ctx.beginPath();
        ctx.arc(this.x + addX, this.y + addY, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.COLORLIST[this.colorId];
        ctx.fill();

        this.drawRipple(ctx, addX, addY);
    };
    return Dots;
})(Circle);
