<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Activity00_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }
    public function get_activity($ActivityID = NULL) //所有活动
    {
        if ($ActivityID === NULL)
        {
            $query = $this->db->get_where('Activity', array('status'=>0));
            return $query->result_array();
        }

        $query = $this->db->get_where('Activity', array('ActivityID' => $ActivityID, 'status'=>0));//正在进行的活动
        return $query->row_array();
    }



}
?>