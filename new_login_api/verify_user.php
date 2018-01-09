<?php
	require_once "./inc/Auth.php";
	$auth = new Auth();
	if(isset($_GET['number']) && isset($_GET['token'])){
		if($_GET['number'] != null && $_GET['token'] != null){
			echo $auth->verify_user($_GET['number'],$_GET['token']);
		}
	}
?>