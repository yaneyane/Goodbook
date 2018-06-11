<?php
class Recipient0_model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function getacid_recipient($UserID = FALSE)//在recipient表中，通过UserID查询得到该用户所有获奖的ActivityID
    {
        if ($UserID === FALSE)
        {
            echo '未获取用户openID，不能正常操作';
        }
        $temp=0;
        $query = $this->db->get_where('recipient', array('UserID' => $UserID));
        echo $query->num_rows();
        foreach ($query->result_array() as $recACID) //该用户所有中奖的ActivityID
        {
            $result[$temp]=$recACID['ActivityID'];//result数组存储所有用户中奖的ActivityID
            $temp=$temp+1;
        }
        print_r($result);//打印用户获奖的所有ActivityID（测试）
        return $result;
    }
}
