<?php
	require_once "./inc/Auth.php";
	$auth = new Auth();
	if(isset($_POST['number']) && isset($_POST['password'])){
		$res['inside post'];
		if($_POST['number'] != null && $_POST['password'] != null){
			echo $auth->authenticate_student($_POST['number'], $_POST['password']);
		}
		else{
			$res['success'] = "false";
			$res['msg'] = "Invalid Query Strings Found";
			echo json_encode($res);
		}
	}
	else{
		$res['success'] = "false";
		$res['msg'] = "Query strings not found";
		echo json_encode($res);
	}
?>