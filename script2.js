/* Can create houses, move the user w/ keypad houses as boundaries
*/

//move distance
var moved = 5

var mapb = [0, 500, 500, 0];

var current_key = "dummy"


// contains all houses
var housecontainer = [];


// template for house info
function housetype(ele){
	this.width = $(ele).width();
	this.height = $(ele).height();
	this.posx = $(ele).offset().left;
	this.posy = $(ele).offset().top;
	this.pwidth = $(ele).offset().left + $(ele).width();
	this.pheight = $(ele).offset().top + $(ele).height()
	};

//adds house to housecontainer
var houseadd = function(ele){
	housecontainer.push(new housetype(ele));
	};

//Player starting position
var posx = 300;
var posy = 200;

//doesn't update in realtime
var user = {
	width: $('.player').width(),
	height: $('.player').height(),
	posx:  posx,
	posy: posy,
	pwidth: $('.player').offset().left + $('.player').width(),
	pheight:  $('.player').offset().top + $('.player').height(),
	cssx: $('.player').offset().left + 'px',
	cssy: $('.player').offset().top + 'px'
};

//updates users css position
var updatepos = function(){
	this.width = $('.player').width();
	this.height = $('.player').height();
	
	//this.posx = $('.player').offset().left;
	//this.posy = $('.player').offset().top;
	//this.pwidth = $('.player').offset().left + $('.player').width();
	//this.pheight =  $('.player').offset().top + $('.player').height();
	this.cssx = user.posx + 'px'
	this.cssy = user.posy + 'px'
	};
//updates player position
user.update = updatepos;


//Players starting position
var posx = 300;
var posy = 200;


var posxcss = posx + 'px';
var posycss = posy + 'py';


	


	

//creates house at location
var crtehouse = function(id1,x,y){
	var namediv = '<div id=' + id1 + " class = 'house' ></div>"
	$(namediv).appendTo('.map');
	var newid = '#' + id1
	//console.log(newid);
	var xpos = String(x + "px");
	var ypos = String(y + "px");
	//console.log(xpos);
	$(newid).css({"backgroundColor":"blue"});
	$(newid).css("left", xpos);
	$(newid).css("top",ypos);
	houseadd(newid);
	};
	
	

	
// Create some boundaries/house 
	
crtehouse("house1",350,200);
crtehouse("house2",200,400);
crtehouse("house3",100,100);	



	
//ability to move
mvlft = true;
mvrht = true;
mvup = true;
mvdwn = true;

//moving functions w/boundaries
var mvleft = function(){
	var offp = $('.player').offset();
	for (i=0; i in housecontainer; i++){
		if (offp.left >= housecontainer[i].pwidth & offp.left <= housecontainer[i].pwidth){
		if (offp.top < housecontainer[i].pheight & offp.top >= housecontainer[i].posy - 5){
			console.log("contact")
			mvlft = false;
			};
		};
	};
	//Map boundary
	if (offp.left <= mapb[3] + 10){
		mvlft = false;
		console.log('edge');
		};
	console.log(mvlft);
	if (mvlft == true){
		user.posx -= 5;
		};
	//resets move
	mvlft = true;
	user.update();
	$('.player').css("left",user.cssx)
	};
	
var mvright = function(){
	var offp = $('.player').offset();
	for (i=0; i in housecontainer; i++){
		if (offp.left <= housecontainer[i].posx - 10 & offp.left >= housecontainer[i].posx - 10){
		if (offp.top < housecontainer[i].pheight & offp.top >= housecontainer[i].posy - 5){
			console.log("contact")
			mvrht = false;
			};
		};
	};
	if (offp.left >= mapb[1] - 5){
		mvrht = false;
		};
	if (mvrht == true){
		user.posx += 5;
		};
	//resets move
	mvrht = true;
	user.update();
	$('.player').css("left",user.cssx)
	};

	
var movup = function(){
	var offp = $('.player').offset();
	for (i=0; i in housecontainer; i++){
		if (offp.top >= housecontainer[i].posy + 10 & offp.top <= housecontainer[i].posy + 10){
			if (offp.left >= housecontainer[i].posx - moved & offp.left <= housecontainer[i].posx + moved){
			console.log("contact")
			mvup = false;
			};
		};
	};
	if (offp.top <= mapb[0] + 10){
		mvup = false;
		console.log('boundary');
		};
	if (mvup == true){
		user.posy -= 5;
		};
	//resets move
	mvup = true;
	user.update();
	$('.player').css("top",user.cssy);
	};

var mvdown = function(){
	var offp = $('.player').offset();
	for (i=0; i in housecontainer; i++){
		if (offp.top >= housecontainer[i].posy - moved - moved & offp.top <= housecontainer[i].posy){
			if (offp.left >= housecontainer[i].posx - moved & offp.left <= housecontainer[i].posx + moved){
			console.log("contact")
			mvdwn = false;
			};
		};
	};
	if (offp.top >= mapb[1]-5){
		mvdwn = false;
		};
		
	if (mvdwn == true){
		user.posy += 5;
		};
	//resets move
	mvdwn = true;
	user.update();
	$('.player').css("top",user.cssy);
	};
	
	


	
	




var keylogger = function(){
	console.log(current_key);
	switch(current_key) {
        case 37: 
        console.log("left");
        mvleft();
        break;

        case 38:
        console.log("up");
        movup();
        break;

        case 39:
        console.log("right");
        mvright();
        break;

        case 40:
        console.log("down");
        mvdown();
        break;

        default: return;
        };
        console.log(posxcss,posycss);
    	posxcss = String(posx) + 'px';
		posycss = String(posy) + 'px';
		
    };
       

//animation
$(document).ready(function(){

	$(document).keydown(function(e){
	current_key = e.which;
	keylogger();
	});
});
	
	
	

		
		

	