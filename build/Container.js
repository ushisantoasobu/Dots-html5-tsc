var Container = (function () {
    // コンストラクタ
    /**  */
    function Container() {
        /** x座標 */
        this.ｘ = 0;
        /**  */
        this.ｙ = 0;
        //
    }
    // メンバ関数
    /**  */
    Container.prototype.update = function (ctx) {
        for (var i = 0; i < this.children.length; i++) {
            var obj = this.children[i];
            obj.update(ctx, this.x, this.y);
        }
    };

    Container.prototype.addChild = function (obj) {
        if (obj === null) {
            return;
        }

        this.children.push(obj);
    };

    Container.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    Container.prototype.removeChildAt = function (index) {
        if (this.children.length === 0) {
            return;
        }

        if (index > this.children.length - 1) {
            return;
        }

        this.children.splice(index, 1);
    };

    Container.prototype.removeAllChildren = function () {
        this.children = [];
    };

    Container.prototype.getNumChildren = function () {
        return this.children.length;
    };

    Container.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Container;
})();
