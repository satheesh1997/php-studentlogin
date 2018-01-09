<?php
header("Content-Type:application/json");
require_once './db_config.php';
header("Access-Control-Allow-Origin: *");

class academics
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
    public function total_sems($roll){
        $sql = "SELECT id FROM academics WHERE s_id = '$roll'";
        $result = mysqli_query($this->db, $sql);
        $row['total_sems'] = $result->num_rows;
        return json_encode($row);
    }

    public function marks($roll,$sem){
        $sql = "SELECT * FROM academics WHERE s_id = '$roll' AND sem_id = '$sem'";
        $result = mysqli_query($this->db, $sql);
        $student  = mysqli_fetch_assoc($result);
        echo json_encode($student,JSON_PRETTY_PRINT);
    }
        
    public function __destruct()
    {
        mysqli_close($this->db);
    }
}
$academics = new academics();
if(isset($_GET['sems'])){
    echo $academics->total_sems($_GET['roll']);
}
if(isset($_GET['sem'])){
    echo $academics->marks($_GET['roll'],$_GET['sem']);
}
?>