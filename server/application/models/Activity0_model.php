<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as db;
class Activity0_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }
    public function get_activity($ActivityID = NULL) //所有活动
    {
        if ($ActivityID == NULL)
        {
            $query = $this->db->get_where('Activity', array('status'=>0));
      $i=0;
      $res;
      $res["flag"]=1;
      if(is_null($query))
      {
        $res["flag"]=0;
      }
      foreach ($query->result_array() as $row)
      {
        $res[$i]=$row;
         $acidnow=$row['ActivityID'];
         $resnow=$this->db->get_where('User', array('ActivityID' => $acidnow));
         $acres=$resnow->result_array();
         $number=count($acres,0);
        $res[$i]['number']=$number;
        $i=$i+1;
      }
      return $res;
        }
        

        $query = $this->db->get_where('Activity', array('ActivityID' => $ActivityID, 'status'=>0));//正在进行的活动
        return $query->row_array();
        
    }
    public function get_number($ActivityID)
    {
        $query1 = $this->db->get_where('User', array('ActivityID'=>$ActivityID));
        $heihei=$query1->result_array();
        $number=count($heihei,0);
        return $number;
    }



}
?>