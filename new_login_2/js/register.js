//var api_url = "http://192.168.43.195/new_register_api/";
var api_url = "http://localhost/new_login_api/";
$("#register_submit").attr("disabled","disabled");
$("#agree_register").attr("disabled","disabled");
$("#register_rollnumber").on("blur", function(){
	var register_number = $("#register_rollnumber").val(); //getting register number
	// write function to check if register number is in server
	if(register_number.length < 7){
		$("#register_rollnumber").parent("div").removeClass("has-success");
		$("#register_rollnumber").parent("div").addClass("has-error");
		$("#register_rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#register_error").removeClass("text-success");
		$("#register_error").addClass("text-danger");
		$("#register_error").html("Register Number must have min 7 chars");
		$("#register_submit").attr("disabled","disabled");
	}
	else{
		$(".preloader").fadeIn('slow');
		$.ajax({
			url: api_url+'details.php?number='+register_number,
			headers: {
				'Content-Type':'application/json'
			},
			type: 'get',
			dataType: 'json',
			success: function(data){
				if(data.isexists == "yes"){
					var img_url = "http://app1.skct.edu.in:808/tutor/photo/"+register_number.toUpperCase()+".jpg";
					$("#register_img").fadeIn(1000);
					$("#register_img").attr("src",img_url);
					$("#register_rollnumber").parent("div").removeClass("has-error");
					$("#register_rollnumber").parent("div").addClass("has-success");
					$("#register_error").html("");
					$("#register_rollnumber").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
					//$("#register_submit").removeAttr("disabled");
					$("#register_details").fadeIn(500);
					$("#register_details_number").html(data.rollnumber);
					$("#register_details_name").html(data.name);
					$("#register_details_course").html(data.course);
					$("#register_details_gender").html(data.gender);
					$("#register_details_dob").html(data.dob);
				}
				else{
					$("#register_rollnumber").parent("div").removeClass("has-success");
					$("#register_rollnumber").parent("div").addClass("has-error");
					$("#register_img").fadeOut(1000);
					$("#register_rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
					$("#register_error").removeClass("text-success");
					$("#register_error").addClass("text-danger");
					$("#register_error").html(data.msg);
					$("#register_submit").attr("disabled","disabled");
					$("#register_details").fadeOut(500);
				}
			},
			error: function(data){
				$("#register_error").removeClass("text-success");
				$("#register_error").addClass("text-danger");
				$("#register_error").html("Server refusing your validation request");
				console.log(data);
				console.log(data.responseText);
				$("#register_submit").attr("disabled","disabled");
			}
		});
		$(".preloader").fadeOut('slow');
	}
});

$("#register_pass_1").on("blur", function(){
	var password = $("#register_pass_1").val();
	if(password.length < 8){
		$("#register_pass_1").parent("div").removeClass("has-success");
		$("#register_pass_1").parent("div").addClass("has-error");
		$("#register_pass_1").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#register_error").removeClass("text-success");
		$("#register_error").addClass("text-danger");
		$("#register_error").html("Password must have min 8 chars");
		$("#register_submit").attr("disabled","disabled");
	}
	else{
		$("#register_pass_1").parent("div").removeClass("has-error");
		$("#register_pass_1").parent("div").addClass("has-success");
		$("#register_pass_1").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
		$("#register_error").removeClass("text-danger");
		$("#register_error").addClass("text-success");
		$("#register_error").html("");
	}
});

$("#register_pass_2").on("blur", function(){
	var cpassword = $("#register_pass_2").val();
	var password = $("#register_pass_1").val();
	if(cpassword.length < 8 || password != cpassword){
		$("#register_pass_2").parent("div").removeClass("has-success");
		$("#register_pass_2").parent("div").addClass("has-error");
		$("#register_pass_2").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#register_error").removeClass("text-success");
		$("#register_error").addClass("text-danger");
		$("#register_error").html("Passwords donot match");
		$("#register_submit").attr("disabled","disabled");
	}
	else{
		$("#register_pass_2").parent("div").removeClass("has-error");
		$("#register_pass_2").parent("div").addClass("has-success");
		$("#register_pass_2").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
		$("#register_error").removeClass("text-danger");
		$("#register_error").addClass("text-success");
		$("#register_error").html("");
		$("#register_submit").removeAttr("disabled");
		$("#agree_register").removeAttr("disabled");
	}
});

$("#register_submit").click(function(){
	$("#register_rules").modal("show");
	$("#register_submit").attr("disabled","disabled");
});

$("#agree_register").click(function(){
	$(this).html('Registering &nbsp;<i class="fa fa-spinner fa-pulse"></i>');
	$("#register_rules_close").attr("disabled","disabled");
	$(this).attr("disabled","disabled");
	var register_number = $("#register_rollnumber").val();
	var password = $("#register_pass_2").val();
	if(register_number.length < 7 || password.length < 8){
		$("#register_error").removeClass("text-success");
		$("#register_error").addClass("text-danger");
		$("#register_error").html("Register Number must have min 7 chars.<br>Password must have min 8 chars.");
	}
	else{
		console.log("Register Request Sent....");
		var data = {
			"number": register_number,
			"password": password,
		};
		var headers = {
			'Content-Type':'application/json'
		};
		var request = $.post(api_url+'register.php',data,headers);
		request.done(function(data){
			if(data.status == "success"){
				$("#register_error").removeClass("text-danger");
				$("#register_error").addClass("text-success");
				$("#register_error").html("Register Successfull");
				window.location="./index.html";
			}
			else{
				$("#register_error").removeClass("text-success");
				$("#register_error").addClass("text-danger");
				$("#register_error").html(data.msg);
			}
		});
		request.fail(function(data){
			$("#register_error").removeClass("text-success");
			$("#register_error").addClass("text-danger");
			$("#register_error").html("Server refusing your request");
			console.log(data);
			console.log(data.responseText);
		});
	}
	$(this).html('I agree');
});