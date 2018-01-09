<?php
	require_once "./inc/Auth.php";
	$auth = new Auth();
	if(isset($_GET['number'])){
		if($_GET['number'] != null){
			echo $auth->student_details($_GET['number']);
		}
	}
?>