<?php
class DeleteUser extends CI_Model
{
    public function __construct()
    {
        $this->load->database();//加载数据库类
    }

    //删除User
    public function deleteUser($activityID)
    {
        $this->db->delete('user1',array('ActivityID' => $activityID));
    }

    //删除activity
    public function deleteAct($activityID)
    {
        $this->db->delete('activity',array('ActivityID' => $activityID));
    }
}