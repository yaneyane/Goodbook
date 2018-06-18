<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Users1 extends CI_Model {

    public function __construct()
    {
        $this->load->database();//加载数据库类
    }
    public function change0($ActivityID2)
    {
        $query = $this->db->get_where('Activity', array('ActivityID' => $ActivityID2));
        $result = $query->row_array();
        $data = array(
            'Status' => 1,
            'ActivityID' => $result['ActivityID'],
            'StartTime' => $result['StartTime'] ,
            'ActivityName' => $result['ActivityName'] ,
            'EndTime' => $result['EndTime'],
        );

        $this->db->delete('Activity',array('ActivityID' => $ActivityID2));
        $this->db->insert('Activity',$data);

    }

    //从user1表中取出UserID  并保存在数组里
    /**
     * @param $ActivityID2
     * @return mixed
     */

    //取出所有UserID为$ActivityID的行信息
    public function get_userID($ActivityID2)
    {
        $query = $this->db->get_where('User', array('ActivityID' => $ActivityID2));
        return $query->result_array();
    }

    //取出所有UserID为$ActivityID 且具有特等奖资格的的行信息
    public function get_pri_userID($ActivityID2)
    {
        $query = $this->db->get_where('User', array('ActivityID' => $ActivityID2,'Qualification' => 1));
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
}


