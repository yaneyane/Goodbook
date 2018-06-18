<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as db;
class Activity1_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }
    public function change1($ActivityID2)
    {
        $query = $this->db->get_where('Activity', array('ActivityID' => $ActivityID2));
        $result = $query->row_array();
        $data = array(
            'Status' => 2,
            'ActivityID' => $result['ActivityID'],
            'StartTime' => $result['StartTime'] ,
            'ActivityName' => $result['ActivityName'] ,
            'EndTime' => $result['EndTime'],
        );

        $this->db->delete('Activity',array('ActivityID' => $ActivityID2));
        $this->db->insert('Activity',$data);

    }
    public function get_activity($ActivityID = NULL) //所有活动
{
    if ($ActivityID === NULL)
    {
        $query = $this->db->get_where('Activity', array('status'=>1));
        if($query==NULL)
        {
          return json_encode("No valid Activity");
        }
      $i=0;
      $res;
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



}
?>