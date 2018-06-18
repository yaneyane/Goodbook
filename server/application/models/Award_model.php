<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Award_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
    public function get_count($ActivityID1,$AwardID1)
    {
        $query = $this->db->get_where('Award', array('ActivityID' => $ActivityID1,'AwardID'=>$AwardID1));
        return $query->result_array();
    }

    public function get_acid()
    {
        $query = $this->db->get_where('activity', array('ActivityName' => $this->acname));
        $data1['activity_item'] = $query->row_array();
        if (empty($data1['activity_item'])) {
            echo 'no here';
        }
       // $data1['ActivityName'] = $data1['activity_item']['ActivityName'];
       // $data1['StartTime'] = $data1['activity_item']['StartTime'];
        $data1['ActivityID'] = $data1['activity_item']['ActivityID'];
        // echo $data1['ActivityName'];
        //  echo $data1['ActivityID'];
        $this->acid = $data1['ActivityID'];
        return $this->acid;
    }

    public function get_award($A = NULL)
    {
        if ($A === NULL) {
            $query = $this->db->get('Award');
            return $query->result_array();
        }

        $query = $this->db->get_where('Award', array('ActivityID' => $A));
        if(empty($query))
        {
            echo '对应的奖项还没有被输入';
            return;
        }
        return $query->result_array();
    }


    public function set1_award($acid,$BookName11,$BookInfo11,$BookPhoto11,$QRCode11,$AwardQuantity11,$BookName22,$BookInfo22,$BookPhoto22,$QRCode22,$AwardQuantity22,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44)
    {
        $res=DB::insert('Award', [
   'ActivityID' => $acid,
            'AwardID' => $acid * 10,
            'BookName' => $BookName11,
            'BookInfo' => $BookInfo11,
            'BookPhoto' => $BookPhoto11,
            'QRCode' => $QRCode11,
            'AwardQuantity' => $AwardQuantity11
   ]);

        self::set2_award($acid,$BookName22,$BookInfo22,$BookPhoto22,$QRCode22,$AwardQuantity22,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44);
    }

    public function set2_award($acid,$BookName22,$BookInfo22,$BookPhoto22,$QRCode22,$AwardQuantity22,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44)
    {
                $res=DB::insert('Award', [
           'ActivityID' => $acid,
            'AwardID' => $acid * 10+1,
            'BookName' => $BookName22,
            'BookInfo' => $BookInfo22,
            'BookPhoto' => $BookPhoto22,
            'QRCode' => $QRCode22,
            'AwardQuantity' => $AwardQuantity22
   ]);
        self::set3_award($acid,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44);
    }

    public function set3_award($acid,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44)
    {
                $res=DB::insert('Award', [
   'ActivityID' => $acid,
            'AwardID' => $acid * 10+2,
            'BookName' => $BookName33,
            'BookInfo' => $BookInfo33,
            'BookPhoto' => $BookPhoto33,
            'QRCode' => $QRCode33,
            'AwardQuantity' => $AwardQuantity33
   ]);
        
        self::set4_award($acid,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44);
    }

    public function set4_award($acid,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44)
    {
        $res=DB::insert('Award', [
            'ActivityID' => $acid,
            'AwardID' => $acid * 10+3,
            'BookName' => $BookName44,
            'BookInfo' => $BookInfo44,
            'BookPhoto' => $BookPhoto44,
            'QRCode' => $QRCode44,
            'AwardQuantity' => $AwardQuantity44
   ]);
    }
}
