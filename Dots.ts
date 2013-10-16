class Dots extends Circle {

    // クラス変数
    /** 色ID */
    colorId : number = 0;

    /** 選択状態かどうか */
    selected : boolean = false;

    /** 位置インデックス */
    positionIndex : number = 1;

    /** 現在アニメーション中かどうか */
    isAnimation : boolean = false;

    /**  */
    rippleCount : number = 0;

    /**  */
    isRipple : boolean = false;

    COLORLIST : string[] = [    'rgb(128, 100, 162)', 
                                'rgb(255, 200,  62)', 
                                'rgb( 48, 230,  92)'] ;


    // メンバ関数
    /**  */
    update(ctx : any, addX : number, addY : number) : void　{
        ctx.beginPath();
        ctx.arc(this.x + addX, this.y + addY, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.COLORLIST[this.colorId];
        ctx.fill();

        this.drawRipple(ctx, addX, addY);
    }

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
    startAnimation = function(  fromX    : number, 
                                fromY    : number, 
                                toX      : number, 
                                toY      : number, 
                                fps      : number, 
                                duration : number, 
                                callback : any      ) : void {

        var that = this;

        if(duration === 0){
            that.x = toX;
            that.y = toY;
            if(callback){
                callback();
            }
            return;
        }

        this.isAnimation = true;
        var totalCount = fps * duration / 1000;
        var count = 0;
        var interval = setInterval(function(){
            
            that.x = fromX + (toX - fromX) * count / totalCount;
            that.y = fromY + (toY - fromY) * count / totalCount;

            count++;

            if(count === totalCount){
                clearInterval(interval);
                that.isAnimation = false;
                that.x = toX;
                that.y = toY;
                if(callback){
                    callback();
                }
            }
        }, 1000 / fps);
    }

    /**
     * 波紋アニメーションをする 
     * 
     * @param 
     * @return 
     */
    rippleAnimation = function() : void {
        this.isRipple = true;
    }

    drawRipple = function(ctx : any, addX : number, addY : number) : void{
        if(this.isRipple === true){
            if(this.rippleCount === 30){
                this.isRipple = false;
            } else {
                ctx.beginPath();
                ctx.arc(this.x + addX, this.y + addY, this.radius + this.radius * 2 / this.rippleCount, 0, Math.PI*2, false);
                ctx.strokeStyle = this.COLORLIST[this.colorId];
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            this.rippleCount++;
        }
    }


    // コンストラクタ
    /**  */
    constructor(x : number, y : number, radius : number, colorId : number)　{
        super(x, y, radius, "");
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colorId = colorId;
    }

    // get アクセサ
    /**
    get getAccessorName() : returnType　{
        ...
    }
    */

    // set アクセサ
    /**
    set setAccessorName(arg : argType) {
        ...
    }
    */

    // 静的クラス変数
    /**  
    static COLORLIST : string[] = [ 'rgb(128, 100, 162)', 
                                    'rgb(255, 200,  62)', 
                                    'rgb( 48, 230,  92)'] ;
                                    */

    // 静的メンバ関数
    /**  */
    /*
    static funcName(arg1 : arg1Type, arg2 : arg2Type, ...) : returnType　{
        //
    }
    */
}