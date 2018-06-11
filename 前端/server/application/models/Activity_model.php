<?php

ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
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



    public function set_activity($ActivityName,$ActivityDate,$ActivityTime)
    {
      $temp=$ActivityDate;
      $temp2=" ";
      $result=$ActivityTime;
      $temp.=$temp2;
      $temp.=$result;
      $new_date = datetime('Y-m-d H:i', strtotime($temp));
    $res=DB::insert('Activity', [
    'ActivityName' => $ActivityName,
  	'EndTime' => $new_date,
    'StartTime' => datetime('Y-m-d h:i:s', time()),
    'status'=> 0
   ]);
    $this->acname=$ActivityName;
}

    public function get_acid()
    {
        $query = $this->db->get('Activity');
        $number = $query->num_rows();
        $query1 = $this->db->get_where('Activity', array('ActivityID' => $number));
        $data1['activity_item']= $query1->row_array();
        if(empty($data1['activity_item']))
        {
            echo 'no here';
        }
        $data1['ActivityName'] = $data1['activity_item']['ActivityName'];
        $data1['StartTime'] = $data1['activity_item']['StartTime'];
        $data1['ActivityID'] = $data1['activity_item']['ActivityID'];
     //   echo $data1['ActivityName'];
    //    echo $data1['ActivityID'];
        $this->acid=$data1['ActivityID'];
        return $this->acid;
    }
}
?>