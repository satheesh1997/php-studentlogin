<?php
header("Content-Type:application/json");
require_once './db_config.php';
header("Access-Control-Allow-Origin: *");

class student
{
    private $db;
    
    public function __construct()
    {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if (mysqli_connect_errno()) {
            $reply['error'] = "connection to database failed";
            echo json_encode($reply, JSON_PRETTY_PRINT);
            exit();
        }
    }
    
    public function login($num, $pass)
    {
        $roll   = trim($num);
        $pass   = trim($pass);
        $sql    = "SELECT password FROM passwords WHERE uid = '$roll'";
        $result = mysqli_query($this->db, $sql);
        if (!$result) {
            $res['request']    = "login";
            $res['student_id'] = $roll;
            $res['status']     = "failure";
            $res['msg']     = "Mysql Error! Contact Webmaster or System Admin";
        } else {
            $student  = mysqli_fetch_assoc($result);
            $password = $student['password'];
            if ($pass == $password) {
                $res['request']    = "login";
                $res['student_id'] = $roll;
                $res['status']     = "success";
            } else {
                $res['request']    = "login";
                $res['student_id'] = $roll;
                $res['status']     = "failure";
                $res['msg']     = "Invalid Register Number / Password";
            }
        }
        if ($roll == null || $pass == null) {
            $res['status'] = "failure";
            $res['msg']     = "Input fields are empty!";
        }
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
    public function __destruct()
    {
        mysqli_close($this->db);
    }
}

if (isset($_GET['roll']) && isset($_GET['pass'])) {
    $student = new student();
    $student->login($_GET['roll'], $_GET['pass']);
}
?>