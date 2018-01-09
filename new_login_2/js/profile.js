$(document).ready(function(){
	Materialize.updateTextFields();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 // Creates a dropdown of 15 years to control year
	});
	var register_number = getCookie("SKCT:Auth-User");
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
				//$("#p_img").fadeIn(1000);
				$("#p_img").attr("src",img_url);
				$("#pro_img").attr("src",img_url);
				$("#p_name").html(data.name);
				$("#pro_name").val(data.name);
				$("#pro_email").val(data.mail);
				$("#pro_date").val(data.dob);
				$("#pro_course").val(data.course);
				if(data.gender == "Male"){
					$("#pro_male").attr("checked","");
				}
				else{
					$("#pro_fe_male").attr("checked","");
				}
				$("#pro_blood").val(data.blood_group);
				$("#pro_ph_num").val(data.student_num);
				$("#pro_ph_f_num").val(data.parent_num);
				$("#pro_address").val(data.address);
				if(data.quota == "Management"){
					$("#pro_mq").attr("checked","");
				}
				else{
					$("#pro_gq").attr("checked","");
				}
			}
			else{
				alert("You are not logged in.");
				window.location = "./index.html";
			}
		},
		error: function(data){
			alert("Server is refusing your request.");
			window.location = "./index.html";
		}
	});
});