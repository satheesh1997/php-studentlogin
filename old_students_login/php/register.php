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
    
    public function register($num, $pass)
    {
        //Check If The Student Is Registered Or Not On The Server
        $sql = "SELECT password FROM passwords WHERE uid = '$num'";
        $result = mysqli_query($this->db,$sql);
        $count = $result->num_rows;
        if($count > 0){
            $res['msg'] = "Account already registered on the server, Try login :)";
            $res['can_login'] = true;
            $res['can_register'] = false;
            $res['has_details'] = true;
        }
        else{
            //Check If The Student Details Already Exists On The Database
            $sql_I = "SELECT L from details WHERE A = '$num'";
            $result_I = mysqli_query($this->db,$sql_I);
            $count_I = $result_I->num_rows;
            if($count_I > 0){
                $res['msg'] = "Account details found on the server :)";
                $res['can_login'] = false;
                $res['can_register'] = true;
                $res['has_details'] = true;
            }
            else{
                $res['msg'] = "Account details not found on the server :)";
                $res['can_login'] = false;
                $res['can_register'] = true;
                $res['has_details'] = false;
            }
        }
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    public function register_new($number,$password){
        $sql = "INSERT INTO passwords (uid, password) VALUES ('$number','$password')";
        $result = mysqli_query($this->db, $sql);
        if($result){
            $res['status'] = 'success';
        }
        else{
            $res['status'] = mysqli_error($this->db);
        }
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    public function __destruct()
    {
        mysqli_close($this->db);
    }
}

class html{
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

    public function details($num){
        $sql = "SELECT * FROM details WHERE A = '$num'";
        $result = mysqli_query($this->db,$sql);
        $student  = mysqli_fetch_assoc($result);
        echo json_encode($student,JSON_PRETTY_PRINT);
    }

    public function __destruct()
    {
        mysqli_close($this->db);
    }
}
if (isset($_GET['roll']) && isset($_GET['pass'])) {
    $student = new student();
    $student->register($_GET['roll'], $_GET['pass']);
}
else if (isset($_POST['number']) && isset($_POST['password'])) {
    $student = new student();
    $student->register_new($_POST['number'], $_POST['password']);
}
else if(isset($_GET['details'])){
    $html = new html();
    $html->details($_GET['details']);
}
?>