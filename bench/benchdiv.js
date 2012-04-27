function benchDiv(nImages, nSeconds, callback){
	var generateSprite	= function(callback){
		var image	= new Image();
		image.onload	= function(){
			image.style.position	= "absolute";
			document.body.appendChild(image);
			callback && callback(image);
		};
		image.crossOrigin= '';
		image.src	= "logo128.png";			
	};

	var images	= [];
	for(var i = 0; i < nImages; i++){
		generateSprite(function(image){
			images.push(image);
		});
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
			var imageSecond	= (nFrame*nImages)/deltaSeconds;
			images.forEach(function(image){
				image.parentNode.removeChild(image);
			})
			callback && callback(imageSecond, nFrame, nImages);
			return;
		}

		requestAnimationFrame(anim);

		var speed	= Date.now()/10;
		for(var i = 0; i < nImages; i++){
			var image	= images[i];
			if(!image)	return;
			image.style.left= Math.floor(speed+i)*3	% 900;
			image.style.top	= Math.floor(speed+i)	% 500;
		}
		nFrame++;
	}			
}
