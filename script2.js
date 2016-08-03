/* Can create houses, move the user w/ keypad houses as boundaries

Need to fix boundaries to work for all player movements
Need to make zombie a general class and make zdir and zjump internal variables to each object

*/

//move user distance
var moved = 5

//zombie step length
var zspeed = 20;

//miliseconds until zombie moves
var zstep = 300;

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

//Player & zombie starting position
// Now has to be synced with css in start or will change after first key
var posx = 300;
var posy = 200;

var zposx = 10
var zposy = 10;

//Zombie

var zombie = new housetype(".zombie");

console.log("this iz zombie:",zombie);

//Changes the zombie position to a changeable variable @ set start pos
zombie.posx = zposx
zombie.posy = zposy


//updates position for any object
var updatezpos = function(){
	this.width = $('.zombie').width();
	this.height = $('.zombie').height();
	
	//this.posx = $('.player').offset().left;
	//this.posy = $('.player').offset().top;
	//this.pwidth = $('.player').offset().left + $('.player').width();
	//this.pheight =  $('.player').offset().top + $('.player').height();
	this.cssx = this.posx + 'px'
	this.cssy = this.posy + 'px'
	};

//updates zombie position
zombie.update = updatezpos;

//zombie direction selector (sees player);

//direction
var zdir = 'down'
//distance
var zjump = zspeed;

var zomdirection = function(){
	var tarx = $('.player').offset().left - user.width
	var tary = $('.player').offset().top - user.height
	var ld = zombie.posx - tarx;
	var ud = zombie.posy - tary;
	console.log(ld,ud);
	//decides which direction is best
	if (Math.abs(ld) > Math.abs(ud)){
		//console.log('move horizantally')
		if (ld < 0){
			//console.log("move right");
			zdir = 'right'
			};
		if (ld > 0){
			//console.log("move left");
			zdir = 'left'
			
			};
		};
	if (Math.abs(ld) == Math.abs(ud)){
		console.log("can't decide");
		var ran = Math.random()
		if (ran >= 0.5){
			if (ud > 0){
				zdir = 'up'
				}
			if (ud < 0 ){
				zdir = 'down'
				}
				};
		if (ran < 0.5){
			if (ld > 0 ){
				zdir = 'left';
				};
			if (ld < 0){
				zdir = 'right';
				};
				};
		console.log(zdir);
		};
	if (Math.abs(ld)< Math.abs(ud)){
		//console.log("move vertically");
		if (ud < 0){
		//	console.log("move down");
			zdir = 'down'
			};
		if (ud > 0){
		//	console.log("move up");
			zdir = 'up'
			};
		};
	console.log(zdir);
	//Zombie decides how far to move
	if (zdir === 'up'| zdir === 'down'){
		if (Math.abs(ud) >= zspeed){
			zjump = zspeed;
			};
		if (Math.abs(ud) < zspeed){
			zjump = Math.abs(ud)+1;
			};
		};
	if (zdir === 'left'| zdir === 'right'){
		if (Math.abs(ld) >= zspeed){
			zjump = zspeed;
			};
		if (Math.abs(ld) < zspeed){
			zjump = Math.abs(ld)+ 1;
			};
		};
	console.log("this is zjump:",zjump);
	
	};


//zombie moves


console.log(zombie.posx + 5 ,zombie.posy + 5);
console.log("these pos");



var zombiemove = function(){
	if (zdir == 'right'){
		mvright('.zombie',zombie, zjump);
		};
	if (zdir == 'left'){
		mvleft('.zombie',zombie, zjump);
		};
	if (zdir == 'up'){
		movup('.zombie',zombie, zjump);
		};
	if (zdir == 'down'){
		mvdown('.zombie',zombie, zjump);
		};
	console.log("zombie moves:", zombie.posx, zombie.posy);
	};
	
	





//updates only posx and posy with keystroke
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
/*	
crtehouse("house1",350,200);
crtehouse("house2",200,400);
crtehouse("house3",100,100);

crtehouse("ho5",100,120);
crtehouse("ho6",100,140);
crtehouse("ho7",100,160);
crtehouse("ho8",100,180);
crtehouse("ho9",100,200);
crtehouse("ho10",100,220);
crtehouse("ho11",100,240);
crtehouse("ho12",100,260);
crtehouse("ho13",100,280);

crtehouse("ho15",240,120);
crtehouse("ho16",260,140);
crtehouse("ho17",280,160);
crtehouse("ho81",300,180);
crtehouse("ho19",320,200);
crtehouse("ho110",340,220);
crtehouse("ho111",360,240);
crtehouse("ho112",380,260);
crtehouse("ho113",400,280);

*/


	
//ability to move

//Now general to all objects**


//moving functions w/boundaries
var mvleft = function(div,object,mvd){
	var mvlft = true;
	var offp = $(div).offset();
	for (i=0; i in housecontainer; i++){
		if (offp.left >= housecontainer[i].pwidth & offp.left <= housecontainer[i].pwidth){
		if (offp.top < housecontainer[i].pheight & offp.top >= housecontainer[i].posy - mvd){
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
		object.posx -= mvd;
		};
	//resets move
	mvlft = true;
	object.update();
	$(div).css("left",object.cssx)
	};

// example: '.player', user, 20	
var mvright = function(div,object,mvd){
	var mvrht = true;
	var offp = $(div).offset();
	for (i=0; i in housecontainer; i++){
		if (offp.left <= housecontainer[i].posx - 10 & offp.left >= housecontainer[i].posx - 10){
		if (offp.top < housecontainer[i].pheight & offp.top >= housecontainer[i].posy - mvd){
			console.log("contact")
			mvrht = false;
			};
		};
	};
	if (offp.left >= mapb[1] - 5){
		mvrht = false;
		};
	if (mvrht == true){
		object.posx += mvd;
		};
	//resets move
	mvrht = true;
	object.update();
	$(div).css("left",object.cssx)
	};

	
var movup = function(div,object,mvd){
	var mvup = true;
	var offp = $(div).offset();
	for (i=0; i in housecontainer; i++){
		if (offp.top >= housecontainer[i].posy + 10 & offp.top <= housecontainer[i].posy + 10){
			if (offp.left >= housecontainer[i].posx - mvd & offp.left <= housecontainer[i].posx + mvd){
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
		object.posy -= mvd;
		};
	//resets move
	mvup = true;
	object.update();
	$(div).css("top",object.cssy);
	};

var mvdown = function(div,object,mvd){
	var mvdwn = true;
	var offp = $(div).offset();
	for (i=0; i in housecontainer; i++){
		if (offp.top >= housecontainer[i].posy - 10 & offp.top <= housecontainer[i].posy){
			if (offp.left >= housecontainer[i].posx - mvd & offp.left <= housecontainer[i].posx + mvd){
			console.log("contact")
			mvdwn = false;
			};
		};
	};
	if (offp.top >= mapb[1]-5){
		mvdwn = false;
		};
		
	if (mvdwn == true){
		object.posy += mvd;
		};
	//resets move
	mvdwn = true;
	object.update();
	$(div).css("top",object.cssy);
	};
	
	

	

	
	




var keylogger = function(){
	if (game_state == true){
		console.log(current_key);
		switch(current_key) {
       		case 37: 
       		console.log("left");
       		mvleft('.player',user, moved);
        	break;

        	case 38:
        	console.log("up");
       		movup('.player',user, moved);
        	break;

        	case 39:
        	console.log("right");
        	mvright('.player',user, moved);
        	break;

        	case 40:
        	console.log("down");
        	mvdown('.player',user, moved);

        	break;
        	
        	case 32:
        	moved = 10;
        	setTimeout(function(){
				moved = 5;
				},2000);
			break;
        	
        	

        	default: return;
        	};
       
        score += 0.5;
        };
    if (game_state == false){
    	};
    	
		

    };

var zfunction = function(){
	if (game_state == true){
		zomdirection();
		zombiemove();
		setTimeout(function(){
				gameover();
				},1100);
		};
	if(game_state == false){
	};
	};




var score_over = false; 
var game_state = true;      

var gameover = function(){
	var xdif = Math.abs(zombie.posx - user.posx);
	var ydif = Math.abs(zombie.posy - user.posy);
	if (xdif <= 10 & ydif <= 10){
		var endscreen = '<div id=end ><a href="javascript:location.reload(true)">Game Over?</a></div>'
		$(endscreen).appendTo('.map');
		$('#end').css("background-color", "Black");
		$('#end').css("position", "absolute");
		$('#end').css("color", "red");
		$('#end').css("font-size", "46px");
		$('#end').css("z-index", "100");
		$('#end').css("width", "500px");
		$('#end').css("height", "500px");
		$('#end').css("left", "0px");
		$('#end').css("text-align", "center");
		$('#end').css("top", "0px");
		$('#end').css("line-height", "450px");
		score_over = true;
		game_state = false;
		};
};


var score = 0;


var updatescore = function(){
	var scoretxt = "Score: " + String(score);
	var instructions = "<p id= 'inst' > Space: boost....   lft,rht,up,dwn: to move</p>"
	if (score_over == false){
		if (score % 1 == 0){
			document.getElementById('score').innerHTML = scoretxt + instructions;
			};
		};
	if (score_over == true){
		};
	
	};

//sets initial score
updatescore();




$(document).ready(function(){
		if (game_state == true){
			setInterval(function(){
				zfunction();
				},zstep);
				};
		$(document).keydown(function(e){
		current_key = e.which;
		keylogger();
		updatescore();
		});
});
	
	
	

		
		

	