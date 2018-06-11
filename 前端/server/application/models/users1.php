/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/26
 * Time: 20:27
 */

<?php
class Users1 extends CI_Model {

    public function __construct()
    {
        $this->load->database();//加载数据库类
    }

    //从user1表中取出UserID  并保存在数组里
    /**
     * @param $ActivityID2
     * @return mixed
     */

    //取出所有UserID为$ActivityID的行信息
    public function get_userID($ActivityID2)
    {
        $query = $this->db->get_where('User1', array('ActivityID' => $ActivityID2));
        return $query->result_array();
    }

    //取出所有UserID为$ActivityID 且具有特等奖资格的的行信息
    public function get_pri_userID($ActivityID2)
    {
        $query = $this->db->get_where('User1', array('ActivityID' => $ActivityID2,'Qualification' => 1));
        return $query->result_array();
    }

    //将获奖信息插入获奖人表 Recipient
    public function set_recipient($userID1,$ActivityID1,$Type1)
    {
        $this->load->helper('url');

        $data = array(

            'RecipientID' => $userID1.$ActivityID1,
            'UserID' => $userID1,
            'ActivityID' => $ActivityID1,
            'Type' => $Type1
        );
        $this->db->insert('Recipient', $data);
        echo "successful";
        echo "<br>";
    }

    //取出奖品数量 第一步 取出'ActivityID' => $ActivityID1,'AwardID'=>$AwardID1的所有奖品信息
    public function get_count($ActivityID1,$AwardID1)
    {
        $query = $this->db->get_where('Award', array('ActivityID' => $ActivityID1,'AwardID'=>$AwardID1));
        return $query->row_array();
    }

    /*
     *测试函数
    public function test()
    {
    $db_server = "localhost";
    $db_user = "root";
    $db_pwd = "wjqwjq12";
    $db_name = "test";

    $sql = "select * from user1 where UserID=23";
    $conn = mysqli_connect($db_server, $db_user, $db_pwd);
    //$my_db = mysqli_select_db($db_name, $conn);
    $result = mysqli_query($sql, $conn);
    $userInfo = mysqli_fetch_array($result);
    mysqli_close($conn);

    echo "帐户：" .$userInfo["UserID"];
    }
    */
}


