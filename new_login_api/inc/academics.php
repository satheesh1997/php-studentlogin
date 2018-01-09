<?php
header("Content-Type:application/json");
require_once './inc/db_config.php';
header("Access-Control-Allow-Origin: *");

class Academics
{
    private $db;
    private $key = "This_Is_Joker_Idiot";
    
    public function __construct()
    {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if (mysqli_connect_errno()) {
            $reply['success'] = "false";
            $res['isexists'] = "no";
            $reply['msg'] = "connection to database failed";
            echo json_encode($reply, JSON_PRETTY_PRINT);
            exit();
        }
    }

    public function verify_number($number,$token)
    {
    	$smt = $this->db->prepare("SELECT student_status FROM students_password WHERE student_id = ? AND new_token = ?");
    	$smt->bind_param("ss",$number,$token);
    	$smt->execute();
    	$smt->store_result();
    	if($smt->num_rows > 0){
    		return true;
    	}
    	else{
    		return false;
    	}
    }

    public function marks($number,$token,$semester){
    	$res = array('request' => 'student_marks' );
    	if($this->verify_number($number,$token)){
    		$res['status'] = "success";
    		$res['token_status'] = "token matched";
    		$smt = $this->db->prepare("SELECT * FROM academics WHERE s_id = ? AND sem_id = ?");
    		$smt->bind_param('ss',$number,$semester);
    		$smt->execute();
    		$result = $smt->get_result();
            $res += $result->fetch_assoc();
    	}
    	else{
    		$res['status'] = "failed";
    		$res['token_status'] = "token mismatch";
    		$res['msg'] = "token mismatch";
    	}
    	return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function total_sems($number,$token){
        $res = array('request' => 'total_sems' );
        if($this->verify_number($number,$token)){
            $res['status'] = "success";
            $res['token_status'] = "token matched";
            $smt = $this->db->prepare("SELECT * FROM academics WHERE s_id = ?");
            $smt->bind_param('s',$number);
            $smt->execute();
            $smt->store_result();
            $res['total_sems'] = $smt->num_rows();
        }
        else{
            $res['status'] = "failed";
            $res['token_status'] = "token mismatch";
            $res['msg'] = "token mismatch";
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function __destruct()
    {
    	mysqli_close($this->db);
    }
}
