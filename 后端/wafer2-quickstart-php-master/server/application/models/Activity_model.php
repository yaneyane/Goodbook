<?php
class Activity_model extends CI_Model {
public  $acname;
public  $acid;
    public function __construct()
    {
        $this->load->database();
    }
    public function get_activity($ActivityID = NULL) //所有活动
    {
        if ($ActivityID === NULL)
        {
            $query = $this->db->get('activity');
            return $query->result_array();
        }

        $query = $this->db->get_where('activity', array('ActivityID' => $ActivityID));//正在进行的活动
        return $query->row_array();
    }



    public function set_activity()
    {
/*
      $mysql_server_name="localhost"; //数据库服务器名称
    $mysql_username="root"; // 连接数据库用户名
    $mysql_password="wxd15f6d9d7d38610e"; // 连接数据库密码
    $mysql_database="cAuth"; // 数据库的名字

     // 连接到数据库
     $conn=mysqli_connect($mysql_server_name, $mysql_username,$mysql_password,$mysql_database);
    if($conn){
        echo"成功连接数据库";
    }
    if(!$conn) {
       echo "数据库连接失败！". mysqli_connect_error();
    }
  $name=$_POST["ActivityName"]; 
  $psp=$_POST["ActivityID"]; 

  $sql = "INSERT INTO Activity VALUES ('$name','$psp')";

if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
*/
    }
}
?>