<?php
header("Content-Type:application/json");
require_once './inc/db_config.php';
header("Access-Control-Allow-Origin: *");

class Auth
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

    public function check_number($register_number){
        $res = array('request' => 'check_username');
        if(strlen($register_number) < 7){
            $res['isexists'] = "no";
            $res['msg'] = "Register Number Not Valid";
            //$res['date'] = date("M:D:Y");
        }else{
            $smt = $this->db->prepare("SELECT student_status FROM students_password WHERE student_id = ?");
            $smt->bind_param('s',$register_number);
            $smt->execute();
            $smt->store_result();
            if($smt->num_rows > 0){
                $res['isexists'] = "yes";
                $res['msg'] = "Register Number Exists On Server";
            }
            else{
                $res['isexists'] = "no";
                $res['msg'] = "Not yet registered for password";
            }
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function authenticate_student($number,$password){
        $res = array('request' => 'login');
        if(strlen($number) < 7){
            $res['success'] = "false";
            $res['msg'] = "Register number must have min 7 chars";
            //$res['date'] = date("M:D:Y");
        }
        else if(strlen($password) < 8){
            $res['success'] = "false";
            $res['msg'] = "password must have min 8 chars";
            //$res['date'] = date("M:D:Y");
        }
        else{
            $smt = $this->db->prepare("SELECT student_status FROM students_password WHERE student_id = ? AND password = ?");
            $hased_pass = md5($password);
            $token = md5(time().$password.$this->key);
            $smt->bind_param('ss', $number, $hased_pass);
            $smt->execute();
            $smt->store_result();
            if($smt->num_rows > 0){
                $smt->free_result();
                $res['success'] = "true";
                $res['msg'] = "Login Successfull";
                $res['UID'] = strtoupper($number);
                $set_token = $this->db->prepare("UPDATE students_password SET new_token = ?,  last_login = now() WHERE student_id = ?");
                $set_token->bind_param('ss',$token,$number);
                $set_token->execute();
                $res['token'] = $token;
            }
            else{
                $res['success'] = "false";
                $res['msg'] = "Number & Password donot match";
                $res['mysqli_error'] = mysqli_error($this->db);
            }
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function forget_password($register_number){
        $res = array('request' => 'forget_password');
        if(strlen($register_number) < 7){
            $res['done'] = "false";
            $res['msg'] = "Register number must have min 7 chars";
        }
        else{
            $smt = $this->db->prepare("SELECT student_status FROM students_password WHERE student_id = ?");
            $smt->bind_param('s',$register_number);
            $smt->execute();
            $smt->store_result();
            if($smt->num_rows > 0){
                $token = md5(time().$register_number.$this->key);
                $add_reset_token = $this->db->prepare("INSERT INTO passwords_reset (student_id, reset_token) VALUES (?, ?)");
                $add_reset_token->bind_param('ss',$register_number, $token);
                $add_reset_token->execute();
                if($add_reset_token->affected_rows > 0){
                    $res['done'] = "true";
                    $res['msg'] = "Reset link successfully mailed to registered email address.";
                    $res['timestamp'] = time();
                }
                else{
                    $res['done'] = "true";
                    $res['msg'] = mysqli_error($this->db);
                }
            }
            else{
                $res['done'] = "false";
                $res['msg'] = "Not yet registered for password";
            }
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function student_details($register_number){
        if(strlen($register_number) < 7){
            $res['status'] = "failed";
            $res['msg'] = "Register number must have min 7 chars";
        }
        else{
            $smt = $this->db->prepare("SELECT A as rollnumber, B as name, C as course, D as gender, E as dob, F as blood_group, J as address, K as parent_num, L as student_num, M as mail, N as quota, O as mode FROM details WHERE A = ?");
            $smt->bind_param('s',$register_number);
            $smt->execute();
            $result = $smt->get_result();
            $res = $result->fetch_assoc();
            if($result->num_rows > 0){
                $res['isexists'] = "yes";
            }
            else{
                $res['isexists'] = "no";
                $res['msg'] = "Your academic details not found on server";
            }
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function register($number, $password){
        $res = array('request' => 'register');
        $check = $this->db->prepare("SELECT UID FROM details WHERE A = ?");
        $check->bind_param('s',$number);
        $check->execute();
        $check->store_result();
        if($check->num_rows <= 0){
            $res['status'] = "failed";
            $res['msg'] = "Academic details not found on server";
        }
        else{
            $smt = $this->db->prepare("INSERT INTO students_password (student_id, password) VALUES (?, ?)");
            $smt->bind_param('ss',$number, md5($password));
            $smt->execute();
            if($smt->affected_rows > 0){
                // affetcted rows
                $res['status'] = "success";
            }
            else{
                // not registered
                $res['status'] = "failed";
                $res['msg'] = mysqli_error($this->db);
            }
        }
        return json_encode($res,JSON_PRETTY_PRINT);
    }

    public function verify_user($number,$token){
        $smt = $this->db->prepare("SELECT student_status FROM students_password WHERE student_id = ? AND new_token = ?");
        $smt->bind_param('ss',$number,$token);
        $smt->execute();
        $result = $smt->get_result();
        if($result->num_rows > 0){
            $key = $result->fetch_assoc();
            $key['key'] = "verified";
            $key['msg'] = "User Verification Successfull";
            if($key['student_status'] == 1){
                $key['status'] = "Banned";
            }
            else if($key['student_status'] == 2){
                $key['status'] = "Removed";
            }
            else{
                $key['status'] = "Access Granted";
            }
        }
        else{
            $key['key'] = "unverified";
            $key['msg'] = "User Verification Failed";
        }
        $key['error'] = mysqli_error($this->db);
        return json_encode($key,JSON_PRETTY_PRINT);
    }
    
    public function __destruct()
    {
        mysqli_close($this->db);
    }
}
?>