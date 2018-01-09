<?php 
	require_once("./inc/Auth.php");
	$auth = new Auth();
	if(isset($_POST['number']) && isset($_POST['password'])){
		$number = $_POST['number'];
		$password = $_POST['password'];
		if($number != null && $password != null){
			echo $auth->register($number, $password);
		}
	}
?>