<?php
	require_once "./inc/Auth.php";
	$auth = new Auth();
	if(isset($_GET['number'])){
		if($_GET['number'] != null){
			echo $auth->check_number($_GET['number']);
		}
	}
?>