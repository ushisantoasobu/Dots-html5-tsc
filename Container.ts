class Container {


    /** x座標 */
    ｘ : number = 0;

    /**  */
    ｙ : number = 0;

    /**  */
    children : any[];


    // メンバ関数
    /**  */
    update(ctx : any) : void　{
        for (var i = 0; i < this.children.length; i++) {
            var obj = this.children[i];
            obj.update(ctx, this.x, this.y);
        }
    }

    addChild(obj : any) : void {
    	if(obj === null){
            return;
        }

        this.children.push(obj);
    }

    getChildAt(index : number) : any {
    	return this.children[index];
    }

    removeChildAt (index : number) : void {
    	if(this.children.length === 0){
            return;
        }

        if(index > this.children.length - 1){
            return;
        }

        this.children.splice(index, 1);
    }

    removeAllChildren() : void {
    	this.children = [];
    }

    getNumChildren() : number {
    	return this.children.length;
    }

    setPosition(x:number, y:number) : void {
    	this.x = x;
    	this.y = y;
    }

    // コンストラクタ
    /**  */
    constructor()　{
    	//
    }

}