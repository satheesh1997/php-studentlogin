//preloader functions
$(document).load(function(){
	$(".preloader").fadeIn('slow');
});
$(document).ready(function(){
	$(".preloader").fadeOut('slow');
});

//input group functions
$(".form-control").on("focus", function(){
	$(this).prev('.input-group-addon').fadeOut();
	$(this).next('.input-group-addon').fadeIn();
});

$(".form-control").on("blur", function(){
	$(this).prev('.input-group-addon').fadeIn();
	$(this).next('.input-group-addon').fadeOut();
});

// login button loader on submit function
$("#login_submit").click(function(){
	//spinner loading in login button
	$(this).children("i").removeClass("fa-sign-in");
	$(this).children("i").addClass("fa-spinner fa-spin");
});

// forget pass submit button loader on submit function
$("#forget_submit").click(function(){
	//spinner loading in login button
	$(this).children("i").removeClass("fa-send");
	$(this).children("i").addClass("fa-spinner fa-spin");
});

$("#forget_login").click(function(){
	window.location="./index.html";
});

$("#load_forget_password").click(function(){
	window.location="./forget_password.html";
});

$("#login_register").click(function(){
	window.location="./register.html";
});

var user = getCookie("SKCT:Auth-User");
var token = getCookie("SKCT:Auth-Token");
console.log(user+"----"+token);


