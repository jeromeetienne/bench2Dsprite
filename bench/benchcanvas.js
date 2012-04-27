function benchCanvas(nImages, nSeconds, callback){
	var canvas = document.createElement("canvas");  
	canvas.width	= 640;
	canvas.height	= 480;
	document.body.appendChild(canvas);

	var ctx		= canvas.getContext("2d");
	
	var image	= new Image();
	image.onload	= function(){
		start();
	};
	image.crossOrigin= '';
	image.src	= "logo128.png";			


	var timeStart, nFrame;

	function start(){
		timeStart	= Date.now();
		nFrame		= 0;
		requestAnimationFrame(anim);
	}
	function anim(){
		var deltaSeconds= (Date.now() - timeStart)/1000
		if( deltaSeconds > nSeconds && timeStart ){
			//console.log("nFrame", nFrame);
			//console.log("nImages", nImages);
			//console.log("deltaSeconds", deltaSeconds);
			var imagesRate	= (nFrame*nImages)/deltaSeconds;
			canvas.parentNode.removeChild(canvas);
			callback && callback(imagesRate, nFrame, nImages);
			return;
		}

		requestAnimationFrame(anim);

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		var width	= ctx.canvas.width;
		var height	= ctx.canvas.height;
		
		var speed	= Date.now()/10;
		for(var i = 0; i < nImages; i++){
			var x	= Math.floor(speed+i)	% 640;
			var y	= Math.floor(speed+i)*3	% 480;
			ctx.drawImage(image, x, y)
		}
		nFrame++;
	}			
}
