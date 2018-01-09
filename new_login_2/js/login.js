//var api_url = "http://192.168.43.195/new_login_api/";
var api_url = "http://localhost/new_login_api/";
$("#login_submit").attr("disabled","disabled");
$("#login_submit").click(function(){
	var register_number = $("#rollnumber").val();
	var password = $("#password").val();
	if(register_number.length < 7 || password.length < 8){
		$("#login_error").removeClass("text-success");
		$("#login_error").addClass("text-danger");
		$("#login_error").html("Register Number must have min 7 chars.<br>Password must have min 8 chars.");
	}
	else{
		var data = {
			"number": register_number,
			"password": password,
		};
		var headers = {
			'Content-Type':'application/json'
		};
		var request = $.post(api_url+'login.php',data,headers);
		request.done(function(data){
			if(data.success == "true"){
				setCookie("SKCT:Auth-User", data.UID, 30);
				setCookie("SKCT:Auth-Token", data.token, 30);
				$("#login_error").html(data.success);
				$("#login_error").removeClass("text-danger");
				$("#login_error").addClass("text-success");
				$("#login_error").html("Login Successfull");
				window.location="./profile.html";
			}
			else{
				$("#login_error").removeClass("text-success");
				$("#login_error").addClass("text-danger");
				$("#login_error").html(data.msg);
			}
		});
		request.fail(function(data){
			$("#login_error").removeClass("text-success");
			$("#login_error").addClass("text-danger");
			$("#login_error").html("Server refusing your request "+data.responseText);
			console.log(data);
			console.log(data.responseText);
		});
	}
	$("#login_submit").children("i").removeClass("fa-spinner fa-spin");
	$("#login_submit").children("i").addClass("fa-sign-in");
});

//showning image in login while entering data
$("#rollnumber").on("blur", function(){
	var register_number = $("#rollnumber").val(); //getting register number
	// write function to check if register number is in server
	if(register_number.length < 7){
		$("#rollnumber").parent("div").removeClass("has-success");
		$("#rollnumber").parent("div").addClass("has-error");
		$("#rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#login_error").removeClass("text-success");
		$("#login_error").addClass("text-danger");
		$("#login_error").html("Register Number must have min 7 chars");
		$("#login_submit").attr("disabled","disabled");
	}
	else{
		$.ajax({
			url: api_url+'check_username.php?number='+register_number,
			headers: {
				'Content-Type':'application/json'
			},
			type: 'get',
			dataType: 'json',
			success: function(data){
				if(data.isexists == "yes"){
					var img_url = "http://app1.skct.edu.in:808/tutor/photo/"+register_number.toUpperCase()+".jpg";
					$("#login_img").fadeIn(1000);
					$("#login_img").attr("src",img_url);
					$("#rollnumber").parent("div").removeClass("has-error");
					$("#rollnumber").parent("div").addClass("has-success");
					$("#login_error").html("");
					$("#rollnumber").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
					$("#login_submit").removeAttr("disabled");
				}
				else{
					$("#rollnumber").parent("div").removeClass("has-success");
					$("#rollnumber").parent("div").addClass("has-error");
					$("#login_img").fadeOut(1000);
					$("#rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
					$("#login_error").removeClass("text-success");
					$("#login_error").addClass("text-danger");
					$("#login_error").html(data.msg);
					$("#login_submit").attr("disabled","disabled");
				}
			},
			error: function(data){
				$("#login_error").removeClass("text-success");
				$("#login_error").addClass("text-danger");
				$("#login_error").html("Server refusing your request "+responseText);
				console.log(data);
				console.log(data.responseText);
				$("#login_submit").removeAttr("disabled");
			}
		});
	}
});

//validating password on blur
$("#password").on("blur", function(){
	var password = $("#password").val();
	if(password.length < 8){
		$("#password").parent("div").removeClass("has-success");
		$("#password").parent("div").addClass("has-error");
		$("#password").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#login_error").removeClass("text-success");
		$("#login_error").addClass("text-danger");
		$("#login_error").html("Password must have min 8 chars");
		$("#login_submit").attr("disabled","disabled");
	}
	else{
		$("#password").parent("div").removeClass("has-error");
		$("#password").parent("div").addClass("has-success");
		$("#login_error").html("");
		$("#password").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
		$("#login_submit").removeAttr("disabled");
	}
});