var api_url = "http://localhost/new_login_api/";
//var api_url = "http://192.168.43.195/new_login_api/";
var user = getCookie("SKCT:Auth-User");
var token = getCookie("SKCT:Auth-Token");
if(user.length < 7){
	window.location = "./index.html";
}
else{
	$.ajax({
		url: api_url+'verify_user.php?number='+user+'&token='+token,
		headers: {
			'Content-Type':'application/json'
		},
		type: 'get',
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.key != "verified"){
				if(data.student_status == 1){
					alert("You Are Banned From Using This Server");
				}
				else if(data.student_status == 2){
					alert("You Are not allowed from using this Server");
				}
				window.location="./index.html";
			}
			else{
				if(data.student_status == 1){
					alert("You Are Banned From Using This Server");
				}
				else if(data.student_status == 2){
					alert("You Are not allowed from using this Server");
				}
			}
		},
		error: function(data){
			alert("Server is refusing your verification request");
		}
	});
}
