function benchCanvas(callback){
	function benchOneCanvas(nImages, nSeconds, callback){
		var canvas	= createCanvas(800, 300);
		//document.body.appendChild(canvas);
		var ctx		= canvas.getContext("2d");
		var url		= "../assets/images/logo128.png";			
		var image	= loadImage(url, function(image){
			start();
		});
		var spriteW	= 128;
		var spriteH	= 128;
		
		var timeStart, nFrame;

		function start(){
			timeStart	= Date.now();
			nFrame		= 0;
			setTimeout(anim, 0);
		}
		function anim(){
			var deltaSeconds= (Date.now() - timeStart)/1000
			if( deltaSeconds > nSeconds && timeStart ){
				var imagesRate	= (nFrame*nImages)/deltaSeconds;
				canvas.parentNode && canvas.parentNode.removeChild(canvas);
				callback && callback(imagesRate, nFrame, nImages);
				return;
			}

			setTimeout(anim, 0);

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			var width	= ctx.canvas.width - spriteW;
			var height	= ctx.canvas.height - spriteH;
			
			var speed	= Date.now()/10;
			for(var i = 0; i < nImages; i++){
				var x	= Math.floor(speed+i)*3	% width;
				var y	= Math.floor(speed+i)	% height;
				ctx.drawImage(image, x, y)
			}
			nFrame++;
		}			
	}

	var flow	= Flow();
	var delay	= 2;
	var results	= [];
	var imgPerFrame	= [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
	//var imgPerFrame	= [500, 1000];
	imgPerFrame.forEach(function(nImages){
		flow.seq(function(next){
			benchOneCanvas(nImages, delay,function(imagesRate, nFrame, nImages){
				console.log("Results: imageRate", imagesRate, imagesRate/30, nImages)
				results.push({
					nImages		: nImages,
					imagesRate	: imagesRate	
				});
				next();
			});				
		});
	});
	flow.seq(function(){
		callback(results)
	})
}
