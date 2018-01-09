<?php
	require_once "./inc/academics.php";
	$academics = new Academics();
	if(isset($_GET['semester'])){
		if($_GET['number'] == null) {
			$res['status'] = "failed";
			$res['msg'] = "Specify a student number";
			echo json_encode($res,JSON_PRETTY_PRINT);
		}
		else if($_GET['token'] == null){
			$res['status'] = "failed";
			$res['msg'] = "Specify a token";
			echo json_encode($res,JSON_PRETTY_PRINT);
		}
		else if($_GET['semester'] == null){
			$res['status'] = "failed";
			$res['msg'] = "Specify a semester";
			echo json_encode($res,JSON_PRETTY_PRINT);
		}
		else{
			echo $academics->marks($_GET['number'],$_GET['token'],$_GET['semester']);
		}
	}
	else{
		echo $academics->total_sems($_GET['number'],$_GET['token']);
	}
?>