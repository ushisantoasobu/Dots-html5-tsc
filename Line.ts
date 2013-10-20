class Line {


    /** x座標 */
    fromX   : number = 0;

    /**  */
    fromY   : number = 0;

    /**  */
    toX     : number = 0;

    /**  */
    toY     : number = 0;


    // メンバ関数
    /**  */
    update(ctx : any) : void　{
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.fromX, this.fromY);
        ctx.lineTo(this.toX, this.toY);
        ctx.stroke();
    }


    // コンストラクタ
    /**  */
    constructor(fromX : number, fromY : number, toX : number, toY : number)　{
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
    }

}