var Line = (function () {
    // コンストラクタ
    /**  */
    function Line(fromX, fromY, toX, toY) {
        /** x座標 */
        this.fromX = 0;
        /**  */
        this.fromY = 0;
        /**  */
        this.toX = 0;
        /**  */
        this.toY = 0;
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
    }
    // メンバ関数
    /**  */
    Line.prototype.update = function (ctx) {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.fromX, this.fromY);
        ctx.lineTo(this.toX, this.toY);
        ctx.stroke();
    };
    return Line;
})();
