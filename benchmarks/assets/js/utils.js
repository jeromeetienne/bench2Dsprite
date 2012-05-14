function createCanvas(width, height){
	width	= width	|| 900;
	height	= height|| 400;
	var canvas = document.createElement("canvas");  
	canvas.width	= width;
	canvas.height	= height;
	return canvas;
}
function loadImage(url, callback){
	var image	= new Image();
	image.onload	= function(){
		callback && callback();
	};
	image.crossOrigin= '';
	image.src	= url;
	return image
}