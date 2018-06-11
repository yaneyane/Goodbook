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

    public function set_recipient($open=NULL,$UserName,$PhoneNo,$Address)
    {
      if($open==NULL)
      {
        $query = $this->db->get_where('Recipient', array('UserName' => NULL));
      $data=$query->row_array();
      $temp=$data['UserID'];
      $res=DB::insert('Recipient', [
  //UserID是通过登录态实现
  //ActivityID是以UserID为关键字在Activity表中查询得到
  //recipientID要通过上述两者合成
  //此表现在无法测试，请务必在实现登录态后实现并测试
            'UserID'=>$temp,
            'UserName' => $UserName,
            'PhoneNo' => $PhoneNo,
            'Address' => $Address,
   ]);
   $res = DB::delete('Recipient', ['UserName' => NULL]);
    }
      else
      {
 $res=DB::insert('Recipient', [
            'UserID'=>$open,
            'UserName' => $UserName,
            'PhoneNo' => $PhoneNo,
            'Address' => $Address,
   ]);
      }

    }
}
?>
