<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Recipient_model extends CI_Model {
    public static $temp;
    public function __construct()
    {
        $this->load->database();
    }

    public function get_recipient($RecipientID = FALSE)
    {
        if ($RecipientID === FALSE)
        {
            $query = $this->db->get('recipient');
            return $query->result_array();
        }

        $query = $this->db->get_where('recipient', array('RecipientID' => $RecipientID));
        return $query->row_array();
    }
    public function set_openid($openID2)
    {
      self::$temp=$openID2;
    }
    public function get_awardme($temp)
    {
      $query = $this->db->get_where('Recipient', array('UserID' => $temp,'UserName'=>"-1"));
      $i=0;
      $res;
      $res["flag"]=1;
      if(is_null($query))
      {
        $res["flag"]=0;
      }
      //row表示recipient表里面的每一行
      //row中的每一行表示该用户的一条中奖活动
      foreach ($query->result_array() as $row)
      {
         $acidnow=$row['ActivityID'];
         $typenow=$row['Type'];
         $AwardIDNOW=$acidnow.$typenow;
         $resnow=$this->db->get_where('Activity', array('ActivityID' => $acidnow));
         $acres=$resnow->row_array();

         $res[$i]=$acres;
         $myaward=$this->db->get_where('Award', array('AwardID' => $AwardIDNOW));
         $myawardinfo=$myaward->row_array();
         $res[$i]["AwardName"]=$myawardinfo['BookName'];
         $res[$i]["AwardInfo"]=$myawardinfo['BookInfo'];
         $res[$i]["BookPhoto"]=$myawardinfo['BookPhoto'];
         $res[$i]["QRCode"]=$myawardinfo['QRCode'];
         $res[$i]["AwardQuantity"]=$myawardinfo['AwardQuantity'];
         $res[$i]["Type"]=$typenow;
         $i=$i+1;
      }
      return $res;
    }
    public function set_recipient($open,$UserName,$PhoneNo,$Address,$ActivityID)
    {
      $sear=$open.$ActivityID;
      $query = $this->db->get_where('Recipient', array('RecipientID'=>$sear));
      $result=$query->row_array();
      $type=$result['Type'];
      $res1 = DB::delete('Recipient', ['RecipientID' => $sear,]);
      $res4=DB::insert('Recipient', [
            'UserID'=>$open,
            'UserName' => $UserName,
            'PhoneNo' => $PhoneNo,
            'Address' => $Address,
            'Type' => $type,
            'ActivityID' => $ActivityID,
            'RecipientID'=>$sear
   ]);
    /*
      if($open==NULL)
      {
       // $temp="test";
      $query = $this->db->get_where('Recipient', array('UserName' => "-2",'Type'=>-1));
      $data=$query->row_array();
      $temp=$data['UserID'];//temp为用户当前ID
      //此时数据库中有一行：UserID=TEMP UserName=-1
      //另有一行：UserID=TEMP,TYPE ACTIVITYID RECIPIENTID
      $reid=$temp.$ActivityID;
      $query1 = $this->db->get_where('Recipient', array('RecipientID'=>$reid));
      echo $reid;
      //取出UserID=TEMP,TYPE ACTIVITYID RECIPIENTID 这一行
      $data1=$query1->row_array();
      $temptype=$data1['Type'];
      $res1 = DB::delete('Recipient', ['UserName' => "-2",'UserID' => $temp]);
      //删除只有USERID 和 Username的一行
      $res2 = DB::delete('Recipient', ['RecipientID' => $reid]);
     //删除有recipientID的一行
    $res4=DB::insert('Recipient', [
            'UserID'=>$temp,
            'UserName' => $UserName,
            'PhoneNo' => $PhoneNo,
            'Address' => $Address,
            'Type' => $temptype,
            'ActivityID' => $ActivityID,
            'RecipientID'=>$reid
   ]);

    }
      else
      {
        $temp="test";
 $res=DB::insert('Recipient', [
            'UserID'=>$open,
            'UserName' => "-2",
            'Type'=>-1,
            'RecipientID'=>$temp.$open
   ]);
      }*/

    }
}
?>
