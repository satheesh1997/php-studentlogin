//var api_url = "http://192.168.43.195/new_login_api/";
var api_url = "http://localhost/new_login_api/";
$("#forget_submit").attr("disabled","disabled");
$("#forget_rollnumber").on("blur", function(){
	var register_number = $("#forget_rollnumber").val(); //getting register number
	// write function to check if register number is in server
	if(register_number.length < 7){
		$("#forget_rollnumber").parent("div").removeClass("has-success");
		$("#forget_rollnumber").parent("div").addClass("has-error");
		$("#forget_rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#forget_error").removeClass("text-success");
		$("#forget_error").addClass("text-danger");
		$("#forget_error").html("Register Number must have min 7 chars");
		$("#forget_submit").attr("disabled","disabled");
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
					$("#forget_img").fadeIn(1000);
					$("#forget_img").attr("src",img_url);
					$("#forget_rollnumber").parent("div").removeClass("has-error");
					$("#forget_rollnumber").parent("div").addClass("has-success");
					$("#forget_error").html("");
					$("#forget_rollnumber").prev('.input-group-addon').html('<i class="fa fa-check"></i>');
					$("#forget_submit").removeAttr("disabled");
				}
				else{
					$("#forget_rollnumber").parent("div").removeClass("has-success");
					$("#forget_rollnumber").parent("div").addClass("has-error");
					$("#forget_img").fadeOut(1000);
					$("#forget_rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
					$("#forget_error").removeClass("text-success");
					$("#forget_error").addClass("text-danger");
					$("#forget_error").html(data.msg);
					$("#forget_submit").attr("disabled","disabled");
				}
			},
			error: function(data){
				$("#forget_error").removeClass("text-success");
				$("#forget_error").addClass("text-danger");
				$("#forget_error").html("Server refusing your validation request");
				console.log(data);
				console.log(data.responseText);
				$("#forget_submit").attr("disabled","disabled");
			}
		});
	}
});

$("#forget_submit").click(function(){
	var register_number = $("#forget_rollnumber").val(); //getting register number
	// write function to check if register number is in server
	if(register_number.length < 7){
		$("#forget_rollnumber").parent("div").removeClass("has-success");
		$("#forget_rollnumber").parent("div").addClass("has-error");
		$("#forget_rollnumber").prev('.input-group-addon').html('<i class="fa fa-close"></i>');
		$("#forget_error").removeClass("text-success");
		$("#forget_error").addClass("text-danger");
		$("#forget_error").html("Register Number must have min 7 chars");
		$("#forget_submit").attr("disabled","disabled");
	}
	else{
		$.ajax({
			url: api_url+'forget_password.php?number='+register_number,
			headers: {
				'Content-Type':'application/json'
			},
			type: 'get',
			dataType: 'json',
			success: function(data){
				if(data.done == "true"){
					$("#forget_error").removeClass("text-danger");
					$("#forget_error").addClass("text-success");
					$("#forget_error").html(data.msg);
					$("#forget_submit").attr("disabled","disabled");
				}
				else{
					$("#forget_error").removeClass("text-success");
					$("#forget_error").addClass("text-danger");
					$("#forget_error").html(data.msg);
					$("#forget_submit").removeAttr("disabled");
				}
			},
			error: function(data){
				$("#forget_error").removeClass("text-success");
				$("#forget_error").addClass("text-danger");
				$("#forget_error").html("Server refusing your request");
				console.log(data);
				console.log(data.responseText);
				$("#forget_submit").removeAttr("disabled");
			}
		});
	}
	$("#forget_submit").children("i").removeClass("fa-spinner fa-spin");
	$("#forget_submit").children("i").addClass("fa-send");
});