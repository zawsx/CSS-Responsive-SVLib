/**
 * SVLib
 * @version 0.1
 * @author Nick Chapman
 * email: nick@servervoodoo.com
 */


/**
 * Initiates the library object
 */

var SVLib = {};

/**
 * Loads different sized images based on screen width
 * 		- Use the window object to control resize events
 * 
 * Leave <img>'s src attribute as ""
 * 
 * Screen size descriptors:
 *  	small: 500< px
 *  	mid  : 501-1000 px
 *  	avg  : 1001-1500 px
 *  	big  : 1501 - 2000 px
 *  	huge : 2001> px
 * 
 * The smallest defined image will default to all smaller sizes and the largest will be default for larger sizes
 *  	Ex: var img = {"avg":"http://example.com/pictures/average.jpeg" , "big":"/pictures/big.jpeg"}
 *  	400 px screen would load avg
 *  	3000px screen would load big
 * 
 * WARNING: YOU CANNOT SKIP SIZES
 *  	Ex: var img = {"avg":"http://example.com/pictures/average.jpeg" , "huge":"/pictures/huge.jpeg"}
 * 
 * Usage example:
 *  	var img = {"small":"http://example.com/pictures/small.jpeg" , "mid":"/pictures/medium.jpeg"};
 *  	window.onload = function(){
 * 	 		document.getElementById('example').src = SVLib.scaleImg(img);
 * 			document.getElementById('example').setAttribute('style' , 'background-image:'.SVLib.scaleImg(img));
 *  	}
 * 
 * @param {object} img - An object that holds the links to the different image sizes
 * 
 * Future features:
 *  	- Allow gaps in sizing
 */
SVLib.scaleImg = function(img){
	var width = window.innerWidth;
	var size = ""; //Image size that will be used
	var min  = 5; //Smallest available size
	var max = 0;  //Largest available size
	var sizes = ['small','mid','avg','big','huge'];
	//determine current screen size
	switch (true){
		case (width <= 500):
			size = "small";
			break;
		case (width <=1000):
			size = "mid";
			break;
		case (width <= 1500):
			size = "avg";
			break;
		case (width <= 2000):
			size = "big";
			break;
		case (width > 2000):
			size = "huge";
			break;
	}
	//Finding smallest and largest images provided
	for(var propt in img){
    	var index = sizes.indexOf(propt);
    	if(index != -1){
        	if(index < min){
            	min = index;
        	}
        	if(index > max){
            	max = index;
    		}
		}
	};
	//Chceking to ensure best available image is used
	if(sizes.indexOf(size) < min){
		size = sizes[min];
	}
	if(sizes.indexOf(size) > max){
		size = sizes[max];
	}
	return img[size];
};

/**
 * Applies the SVLib.scaleImg() function to the <img> with the provided id
 * 
 * See SVLib.scaleImg for image params
 * 
 * Parameter example:
 *  	var img = {"id":"myPicture" , "small":"http://example.com/pictures/small.jpeg" , "mid":"/pictures/medium.jpeg"};
 * 		var img = {"class":"myPictures" , "small":"http://example.com/pictures/small.jpeg" , "mid":"/pictures/medium.jpeg"};
 * 
 * NOTE: Scaling by class will apply to all elements of that class
 * 
 * @param {object} img
 *
 */
SVLib.scaleBySelector = function(img){
	if(img.id){
		document.getElementById(img.id).src = SVLib.scaleImg(img);
	}
	if(img.class){
		var pictures = document.getElementsByClassName(img.class);
		for(var zxc = 0; zxc < pictures.length; zxc++){
			pictures[zxc].src = SVLib.scaleImg(img);
		}
	}
	
};
