var Circle = (function () {
    // コンストラクタ
    /**  */
    function Circle(x, y, radius, color) {
        // クラス変数
        /** 色ID */
        this.colorId = 0;
        /** x座標 */
        this.x = 0;
        /** y座標 */
        this.y = 0;
        /** 半径 */
        this.radius = 0;
        /** 色 */
        this.color = "";
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    // メンバ関数
    /**  */
    Circle.prototype.update = function (ctx, addX, addY) {
        ctx.beginPath();
        ctx.arc(this.x + addX, this.y + addY, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Circle;
})();
