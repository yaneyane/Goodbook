<?php
class AddUser extends CI_Model
{
    public function __construct()
    {
        $this->load->database();//加载数据库类
    }

    //添加参与用户
    public function add($userID=NULL,$activityID)
    {
        if()
        $qualif = 0;

        $data = array(
            'UserID' => $userID ,
            'ActivityID' => $activityID ,
            'Qualification' => $qualif
        );

        $this->db->insert('user1', $data);

        echo "successful";
    }

    //添加特等奖资格用户
    public function addQualification($userID,$activityID)
    {
        $query = $this->db->get_where('user1', array('ActivityID' => $activityID,'UserID' => $userID));
        if(is_null($query))
        {
            $qualif = 1;
            $data = array(
                'UserID' => $userID ,
                'ActivityID' => $activityID ,
                'Qualification' => $qualif
            );

            $this->db->insert('user1', $data);

            echo "successful";
        }
        else{
            $this->db->delete('user1',array('ActivityID' => $activityID,'UserID' => $userID));
            $qualif = 1;
            $data = array(
                'UserID' => $userID ,
                'ActivityID' => $activityID ,
                'Qualification' => $qualif
            );

            $this->db->insert('user1', $data);

            echo "successful";
        }

    }
}