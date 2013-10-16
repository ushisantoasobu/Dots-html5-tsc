class Circle extends Container{

    // クラス変数
    /**  */
    canvas : any = null;

    /** コンテクスト */
    ctx : any = null;


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
    constructor(canvas : any ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    // get アクセサ
    get getCanvas() : any {
        return this.canvas;
    }

}

/////
/////
/////
/////
/////
/////


this.dots = this.dots || {};


(function(){


    /**
     * 初期処理
     * 
     * @param canvas
     */
    p.initialize = function(canvas){
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    };

    /**
     * 更新処理
     * 
     */
    p.update = function(){
        //
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);

        //
        for (var i = 0; i < this._children.length; i++) {
            var obj = this._children[i];
            if(obj.update !== undefined){
                obj.update(this._ctx, 0, 0);//bad??
            }   
        }

    };

    /**
     * キャンバスを取得する
     * 
     */
    p.getCanvas = function(){
        return this._canvas;
    };


    dots.Stage = Stage;
})();