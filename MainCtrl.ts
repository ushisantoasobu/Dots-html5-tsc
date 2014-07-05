module Greeting{
    export class Hello{
        constructor(private text : string){
        }
        say() : void{
            console.log(this.text);
        }
    }
}
var hello : Greeting.Hello = new Greeting.Hello("Hello, World!");
hello.say();


var Greeting;
(function (Greeting) {
    var Hello = (function () {
        function Hello(text) {
            this.text = text;
        }
        Hello.prototype.say = function () {
            console.log(this.text);
        };
        return Hello;
    })();
    Greeting.Hello = Hello;    
})(Greeting || (Greeting = {}));
var hello = new Greeting.Hello("Hello, World!");
hello.say();






this.dots = this.dots || {};


(function(){

	var MainCtrl = {};


	//-----------------------------------
	// constant variables
	//-----------------------------------

	/** fps */
	MainCtrl.FPS = 60;

	/** row count */
	MainCtrl.ROW_COUNT = 4;

	/** colomun count */
	MainCtrl.COLUMN_COUNT = 4;

	/** explanation */
	MainCtrl.DOTS_DISTANCE = 50;

	/** touch range(radius) */
	MainCtrl.TOUCH_RANGE = 25;


	//-----------------------------------
	// variables
	//-----------------------------------

	//display
	/** canvas */
	MainCtrl.stage;

	/** explanation */
	MainCtrl.lineContainer;

	/** explanation */
	MainCtrl.dotContainer;

	//data
	/** 現在選択中のdotの配列 */
	MainCtrl.selectedDotsArray = [];

	/** タッチ開始座標 */
	MainCtrl.touchStartPoint = {x:0, y:0};
	
	/** 現在選択中の色 */
	MainCtrl.currentTargetColor = -1;

	/** プレイ可能かどうか */
	MainCtrl.playFlg = true;

	//game-data
	/** count of delete total dots */
	MainCtrl._deleteDotsCount = 0;

	/** count of delete action */
	MainCtrl._deleteCount = 0;

	//event
	/** スコア更新イベント */
 	MainCtrl.scoreUpdateEvent;


	//-----------------------------------
	// function
	//-----------------------------------

	/**
	 * 初期状態セット
	 * 
	 * @param canvas
	 */
	MainCtrl.setInitialSetting = function(canvas){

		MainCtrl.stage = new dots.Stage(canvas);

		MainCtrl.lineContainer = new dots.Container();
		MainCtrl.dotContainer = new dots.Container();
		MainCtrl.stage.addChild(MainCtrl.dotContainer);
		MainCtrl.stage.addChild(MainCtrl.lineContainer);

		//setup listeners
		canvas.addEventListener('touchstart', MainCtrl._canvasTouchStartHandler, false);
		canvas.addEventListener('touchmove', MainCtrl._canvasTouchMoveHandler, false);
		canvas.addEventListener('touchend', MainCtrl._canvasTouchEndHandler, false);

		//setup dots
		var color = 0;
		for (var i = 0; i < MainCtrl.ROW_COUNT; i++) {
			for (var j = 0; j < MainCtrl.COLUMN_COUNT; j++) {

				color = parseInt(Math.random() * dots.Dot.COLORLIST.length);
				var dot = new dots.Dot(	MainCtrl.DOTS_DISTANCE * (j + 1), 
										MainCtrl.DOTS_DISTANCE * (i + 1), 
										20, 
										color);
				dot.positionIndex = j + MainCtrl.ROW_COUNT * i;
				MainCtrl.dotContainer.addChild(dot);
			}
		}

		//set up events
		MainCtrl.scoreUpdateEvent = document.createEvent('Events');
		MainCtrl.scoreUpdateEvent.initEvent('dot_score_update_event', true, true);

		setInterval(function(){
			MainCtrl.stage.update();
		}, 1000 / 60);
	};

	/**
	 * データを初期化
	 */
	MainCtrl._resetData = function(){
		MainCtrl.currentTargetColor = -1;
		MainCtrl.selectedDotsArray = [];
		MainCtrl.touchStartPoint = {x:0, y:0};
	}

	/**
	 * キャンバスタッチ開始イベント
	 * 
	 * @param e
	 */
	MainCtrl._canvasTouchStartHandler = function(e){

		if(!MainCtrl.playFlg){return;}

		MainCtrl.touchStartPoint.x = e.changedTouches[0].screenX - MainCtrl.stage.getCanvas().offsetLeft;
		MainCtrl.touchStartPoint.y = e.changedTouches[0].screenY - MainCtrl.stage.getCanvas().offsetTop;

		var len = MainCtrl.dotContainer.getNumChildren();
		for (var i = len - 1; i >= 0; i--) {
			var dot = MainCtrl.dotContainer.getChildAt(i);
			if (MainCtrl.touchStartPoint.x > dot.x - MainCtrl.TOUCH_RANGE && 
				MainCtrl.touchStartPoint.x < dot.x + MainCtrl.TOUCH_RANGE && 
				MainCtrl.touchStartPoint.y > dot.y - MainCtrl.TOUCH_RANGE &&
				MainCtrl.touchStartPoint.y < dot.y + MainCtrl.TOUCH_RANGE ) {

				MainCtrl.touchStartPoint.x = dot.x;
				MainCtrl.touchStartPoint.y = dot.y;
				MainCtrl.currentTargetColor = dot.colorId;
				dot.selected = true;
				dot.rippleAnimation();
				selectedDotsArray.push(dot);
				break;
			}
		}

		event.preventDefault();
	};

	/**
	 * キャンバスタッチ時イベント
	 * 
	 * @param e
	 */
	MainCtrl._canvasTouchMoveHandler = function(e){

		if(!MainCtrl.playFlg){return;}

		//線の描画は一旦削除
		var lineCount = MainCtrl.lineContainer.getNumChildren();
		if(lineCount > 0){
			MainCtrl.lineContainer.removeChildAt(lineCount - 1);
		}

		var len = MainCtrl.dotContainer.getNumChildren();
		for (var i = len - 1; i >= 0; i--) {
			var x = parseInt(e.changedTouches[0].screenX - MainCtrl.stage.getCanvas().offsetLeft);	
			var y = parseInt(e.changedTouches[0].screenY - MainCtrl.stage.getCanvas().offsetTop);
			var dot = MainCtrl.dotContainer.getChildAt(i);

			//いずれかのドットに触れたとき
			if (x > dot.x - MainCtrl.TOUCH_RANGE && 
				x < dot.x + MainCtrl.TOUCH_RANGE && 
				y > dot.y - MainCtrl.TOUCH_RANGE &&
				y < dot.y + MainCtrl.TOUCH_RANGE ) {

				var selectedDotsCount = MainCtrl.selectedDotsArray.length;
				if (selectedDotsCount === 0) {
					//まだいずれのドットも選択状態にないとき

					MainCtrl.touchStartPoint.x = dot.x;
					MainCtrl.touchStartPoint.y = dot.y;
					MainCtrl.currentTargetColor = dot.colorId;
					dot.selected = true;
					dot.rippleAnimation();
					MainCtrl.selectedDotsArray.push(dot);	
					break;

				} else {
					//すでにいずれかのドットが選択状態にあるとき

					if (MainCtrl.currentTargetColor === dot.colorId){

						//まだ選択されたものでないとき
						if (dot.selected === false) {

							var lastDot = MainCtrl.selectedDotsArray[selectedDotsCount - 1];
							var lastIndex = lastDot.positionIndex;

							if(dot.positionIndex === lastIndex - 1 && MainCtrl._checkExistDotLeft(lastIndex)) {

								MainCtrl.touchStartPoint.x = dot.x;
								MainCtrl.touchStartPoint.y = dot.y;
								dot.selected = true;
								dot.rippleAnimation();
								MainCtrl.selectedDotsArray.push(dot);

								//線の描画
								var lineCount = MainCtrl.lineContainer.getNumChildren();
								var line = MainCtrl.lineContainer.getChildAt(lineCount - 1);
								var line = new dots.Line(
									lastDot.x,
							 		lastDot.y,
							 		dot.x,
							 		dot.y
							 	);
							 	MainCtrl.lineContainer.addChild(line);

								break;
							} else if (dot.positionIndex === lastIndex + 1 && MainCtrl._checkExistDotRight(lastIndex)) {

								MainCtrl.touchStartPoint.x = dot.x;
								MainCtrl.touchStartPoint.y = dot.y;
								dot.selected = true;
								dot.rippleAnimation();
								MainCtrl.selectedDotsArray.push(dot);

								//線の描画
								var lineCount = MainCtrl.lineContainer.getNumChildren();
								var line = MainCtrl.lineContainer.getChildAt(lineCount - 1);
								var line = new dots.Line(
									lastDot.x,
							 		lastDot.y,
							 		dot.x,
							 		dot.y
							 	);
							 	MainCtrl.lineContainer.addChild(line);

								break;
							} else if (dot.positionIndex === lastIndex - 4 && MainCtrl._checkExistDotTop(lastIndex)) {

								MainCtrl.touchStartPoint.x = dot.x;
								MainCtrl.touchStartPoint.y = dot.y;
								dot.selected = true;
								dot.rippleAnimation();
								MainCtrl.selectedDotsArray.push(dot);

								//線の描画
								var lineCount = MainCtrl.lineContainer.getNumChildren();
								var line = MainCtrl.lineContainer.getChildAt(lineCount - 1);
								var line = new dots.Line(
									lastDot.x,
							 		lastDot.y,
							 		dot.x,
							 		dot.y
							 	);
							 	MainCtrl.lineContainer.addChild(line);

								break;
							} else if (dot.positionIndex === lastIndex + 4 && MainCtrl._checkExistDotBottom(lastIndex)) {

								MainCtrl.touchStartPoint.x = dot.x;
								MainCtrl.touchStartPoint.y = dot.y;
								dot.selected = true;
								dot.rippleAnimation();
								MainCtrl.selectedDotsArray.push(dot);

								//線の描画
								var lineCount = MainCtrl.lineContainer.getNumChildren();
								var line = MainCtrl.lineContainer.getChildAt(lineCount - 1);
								var line = new dots.Line(
									lastDot.x,
							 		lastDot.y,
							 		dot.x,
							 		dot.y
							 	);
							 	MainCtrl.lineContainer.addChild(line);

								break;		
							}
						}
					}
				}
			}
		}


		var line = new dots.Line(
									MainCtrl.touchStartPoint.x,
							 		MainCtrl.touchStartPoint.y,
							 		e.changedTouches[0].screenX - MainCtrl.stage.getCanvas().offsetLeft,
							 		e.changedTouches[0].screenY - MainCtrl.stage.getCanvas().offsetTop
							 	);

		MainCtrl.lineContainer.addChild(line);


		//１つでも選択してある状態であれば線を描画する

		//もしdotの上にきたら
		//すでに選択したものであれば無視
		//もしそのdotが最初に選択したdotと同じ色のものだったら

		event.preventDefault();
	};


	/**
	 * キャンバスタッチ終了イベント
	 * 
	 * @param e
	 */
	MainCtrl._canvasTouchEndHandler = function(e){

		if(!MainCtrl.playFlg){return;}


		MainCtrl.lineContainer.removeAllChildren();

		event.preventDefault();

		if(MainCtrl.selectedDotsArray.length > 1){

			//クリアするdotがあるとき

			// MainCtrl._setPlayDisable();

			// var columunIndex;
			//更新するまえに位置インデックス
			var previousIndex;

			var removedIndexArray = [];
			// for (var i = 0; i < MainCtrl.COLUMN_COUNT; i++) {
			// 	removedIndexArray[i] = 0;
			// }

			//選択したものは削除する
			for (var i = MainCtrl.dotContainer.getNumChildren() - 1; i >= 0; i--) {
				var dot = MainCtrl.dotContainer.getChildAt(i);
				if(dot.selected === true){
					removedIndexArray.push(dot.positionIndex);
					MainCtrl.dotContainer.removeChildAt(i);
				}
			}

			//削除されなかったものについて、位置インデックスの更新と位置移動アニメーション
			for (var i = MainCtrl.dotContainer.getNumChildren() - 1; i >= 0; i--) {
				var dot = MainCtrl.dotContainer.getChildAt(i);
				// columunIndex = dot.positionIndex % MainCtrl.COLUMN_COUNT;
				previousIndex = dot.positionIndex;
				dot.positionIndex = MainCtrl._updateIndex(dot.positionIndex, removedIndexArray);
				dot.startAnimation(	dot.x, 
									dot.y, 
									dot.x, 
									dot.y + (dot.positionIndex - previousIndex) / MainCtrl.COLUMN_COUNT * MainCtrl.DOTS_DISTANCE,
									MainCtrl.FPS,
									200 * ((dot.positionIndex - previousIndex) / MainCtrl.COLUMN_COUNT),
									function(){console.log("test");});
			}

			//新しく生成の必要なdotの位置インデックスを決定する
			var existFlg;
			var newIndexArray = [];
			for (var i = 0; i < MainCtrl.ROW_COUNT * MainCtrl.COLUMN_COUNT; i++) {
				existFlg = false;
				for (var j = 0; j < MainCtrl.dotContainer.getNumChildren(); j++) {
					if(i === MainCtrl.dotContainer.getChildAt(j).positionIndex){
						existFlg = true;
						break;
					}
				}
				if(existFlg === false){
					newIndexArray.push(i);
				}
			}

			//新しくdotを生成する
			for (var i = 0; i < newIndexArray.length; i++) {
				color = parseInt(Math.random() * dots.Dot.COLORLIST.length);
				var dot = new dots.Dot(	MainCtrl.DOTS_DISTANCE * (newIndexArray[i] % MainCtrl.COLUMN_COUNT + 1), 
										MainCtrl.DOTS_DISTANCE * (Math.floor(newIndexArray[i] / MainCtrl.COLUMN_COUNT) + 1), 
										20, 
										color);
				dot.positionIndex = newIndexArray[i];
				// columunIndex = dot.positionIndex % MainCtrl.COLUMN_COUNT;
				MainCtrl.dotContainer.addChild(dot);
				dot.startAnimation(	dot.x, 
									dot.y - MainCtrl._getDeletedCountForColumn(dot.positionIndex, removedIndexArray) *  MainCtrl.DOTS_DISTANCE,
									dot.x, 
									dot.y,
									MainCtrl.FPS,
									200 * MainCtrl._getDeletedCountForColumn(dot.positionIndex, removedIndexArray),
									function(){console.log("test");});
			}

			//点数の更新
			MainCtrl._deleteCount++;
			MainCtrl._deleteDotsCount += MainCtrl.selectedDotsArray.length;

			document.dispatchEvent(MainCtrl.scoreUpdateEvent);
			
			MainCtrl._resetData();

		} else {
			//クリアするdotがないとき

			MainCtrl._resetData();
		}
	};

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl._checkExistDotLeft = function(index){
		var flg = true;
		if (index % 4 === 0) {
			flg = false;
		}
		return flg;
	};

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl._checkExistDotRight = function(index){
		var flg = true;
		if (index % 4 === 3) {
			flg = false;
		}
		return flg;
	};

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl._checkExistDotTop = function(index){
		var flg = true;
		if (index < 4) {
			flg = false;
		}
		return flg;
	};

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl._checkExistDotBottom = function(index){
		var flg = true;
		if (index > 4 * (4 - 1)) {
			flg = false;
		}
		return flg;
	};

	//このメソッドださいorz
	MainCtrl._updateIndex = function(index, removedIndexArray){
		var count = 0;	
		for (var i = 0; i < removedIndexArray.length; i++) {
			//同じ列で　かつ自分よりも低いインデックスのもの
			if((index % MainCtrl.COLUMN_COUNT === removedIndexArray[i] % MainCtrl.COLUMN_COUNT) &&
				index < removedIndexArray[i] ){
				count++;
			}
		}

		return index + count * MainCtrl.COLUMN_COUNT;
	};

	//このメソッドださいorz
	MainCtrl._getDeletedCountForColumn = function(index, removedIndexArray){
		var count = 0;	
		for (var i = 0; i < removedIndexArray.length; i++) {
			//同じ列で　かつ自分よりも低いインデックスのもの
			if(index % MainCtrl.COLUMN_COUNT === removedIndexArray[i] % MainCtrl.COLUMN_COUNT){
				count++;
			}
		}

		return count;
	};

	/**
	 * プレイ可能状態にする
	 */
	MainCtrl._setPlayEnable = function(){
		MainCtrl.playFlg = true;
	};

	/**
	 * プレイ不可能状態にする
	 */
	MainCtrl._setPlayDisable = function(){
		MainCtrl.playFlg = false;
	};


	//-------------------------------------
	// public
	//-------------------------------------

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl.getDeleteCount = function(){
		return MainCtrl._deleteCount;
	};

	/**
	 * explanation
	 * 
	 * @param explanation
	 * @return explanation
	 */
	MainCtrl.getDeleteDotsCount = function(){
		return MainCtrl._deleteDotsCount;
	}


	dots.MainCtrl = MainCtrl;
})();