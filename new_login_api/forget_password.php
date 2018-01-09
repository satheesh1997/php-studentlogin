<?php
	require_once "./inc/Auth.php";
	$auth = new Auth();
	if(isset($_GET['number'])){
		if($_GET['number'] != null){
			echo $auth->forget_password($_GET['number']);
		}
	}
?>