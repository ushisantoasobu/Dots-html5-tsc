class Circle {

    // クラス変数
    /** 色ID */
    colorId : number = 0;

    /** x座標 */
    x : number = 0;

    /** y座標 */
    y : number = 0;

    /** 半径 */
    radius : number = 0;

    /** 色 */
    color : string = "";


    // メンバ関数
    /**  */
    update(ctx : any, addX : number, addY : number) : void　{
        ctx.beginPath();
        ctx.arc(this.x + addX, this.y + addY, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }


    // コンストラクタ
    /**  */
    constructor(x : number, y : number, radius : number, color : string)　{
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

}