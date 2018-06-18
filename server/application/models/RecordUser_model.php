<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class RecordUser_model extends CI_Model
{
  public static $tempnow;
    public function __construct()
    {
        $this->load->database();//加载数据库类
    }

    //添加参与用户
    public function add($userID,$activityID)
    {
      $quaf=0;
       $query111 = $this->db->get_where('User', array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>1));
   if(!is_null($query111))
   {
     $this->db->delete('User',array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>1));
     $quaf=1;
    // exit("You already have Qualification 1");
   }
   $query112 = $this->db->get_where('User', array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>0));
   if(!is_null($query112))
   {
     $this->db->delete('User',array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>0));
    // exit("You already have Qualification 0");
  }

      $res=DB::insert('User', [
            'UserID'=>$userID,
            'ActivityID' => $activityID,
            'Qualification' => $quaf,
   ]);


  /*
      if($activityID==NULL)
      {
      $query = $this->db->get_where('User', array('Qualification' => 6));
      $data=$query->row_array();
      $temp=$data['ActivityID'];

      $query22 = $this->db->get_where('User', array('ActivityID' => $temp,'UserID' => $userID,'Qualification'=>0));
   if(!is_null($query22))
   {
     $this->db->delete('User',array('ActivityID' => $temp,'UserID' => $userID,'Qualification'=>0));
   }

      $res=DB::insert('User', [
            'UserID'=>$userID,
            'ActivityID' =>$temp,
            'Qualification' => 0,
   ]);
   $res11 = DB::delete('User', ['Qualification' => 6]);
      }
      else
      {
        $res=DB::insert('User', [
            'UserID'=>"0",
            'ActivityID' => $activityID,
            'Qualification' => 6,
   ]);
      }
        
*/
    }

    public function insertqual($userID,$activityID)
    {
      $query11 = $this->db->get_where('User', array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>0));
   if(!is_null($query11))
   {
     $this->db->delete('User',array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>0));
   }
   $query113 = $this->db->get_where('User', array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>1));
   if(!is_null($query113))
   {

     $this->db->delete('User',array('ActivityID' => $activityID,'UserID' => $userID,'Qualification'=>1));
   }

      $res=DB::insert('User', [
            'UserID'=>$userID,
            'ActivityID' => $activityID,
            'Qualification' => 1,
   ]);
    

    }
}