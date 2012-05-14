function benchDiv(callback){
	function benchOneDiv(nImages, nSeconds, callback){
		var images	= [];
		for(var i = 0; i < nImages; i++){
			var element	= document.createElement('div');
			element.classList.add("sprite-logo128");
			element.style.position	= "absolute";
			document.body.appendChild(element);
			images.push(element);
		};

		var timeStart	= Date.now();
		var nFrame	= 0;
		requestAnimationFrame(anim);
		function anim(){
			var deltaSeconds= (Date.now() - timeStart)/1000
			if( deltaSeconds > nSeconds && timeStart ){
				console.log("nFrame", nFrame);
				console.log("nImages", nImages);
				console.log("deltaSeconds", deltaSeconds);
				images.forEach(function(image){
					image.parentNode && image.parentNode.removeChild(image);
				})
				var imageSecond	= (nFrame*nImages)/deltaSeconds;
				callback && callback(imageSecond, nFrame, nImages);
				return;
			}

			requestAnimationFrame(anim);

			var speed	= Date.now()/10;
			for(var i = 0; i < nImages; i++){
				var image	= images[i];
				image.style.left= Math.floor(speed+i)*3	% 900;
				image.style.top	= Math.floor(speed+i)	% 400;
			}
			nFrame++;
		}			
	}

	var flow	= Flow();
	var delay	= 2;
	var results	= [];
	var imgPerFrame	= [2000];
	var imgPerFrame	= [500, 800, 1300, 2000];
	imgPerFrame.forEach(function(nImages){
		flow.seq(function(next){
			benchOneDiv(nImages, delay,function(imagesRate, nFrame, nImages){
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
	});
}
