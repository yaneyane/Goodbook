<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Lottery extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Users1');
        //$this->load->model('');
        $this->load->helper('url_helper');
    }

    public function get_lottery()
    {
      $ActivityID2=$this->input->post("ActivityID");
      $this->Users1->change0($ActivityID2);
        $data = $this->Users1->get_userID($ActivityID2);
        $name_list = array_column($data, 'UserID');
        $data0 = $this->Users1->get_pri_userID($ActivityID2);
        $name_list0 = array_column($data0, 'UserID');



        $count0 = $ActivityID2*10;
        $count1 = $ActivityID2*10+1;
        $count2 = $ActivityID2*10+2;
        $count3 = $ActivityID2*10+3;
        $num0_1 = $this->Users1->get_count($ActivityID2,$count0);
        $num1_1 = $this->Users1->get_count($ActivityID2,$count1);
        $num2_1 = $this->Users1->get_count($ActivityID2,$count2);
        $num3_1 = $this->Users1->get_count($ActivityID2,$count3);
        $num0 = $num0_1['AwardQuantity'];
        $num1 = $num1_1['AwardQuantity'];
        $num2 = $num2_1[ 'AwardQuantity'];
        $num3 = $num3_1['AwardQuantity'];

        shuffle($name_list0);
        $user_count = count($name_list);//总人数
        $user_count0 = count($name_list0);//有特等奖资格人数

        $reci_count0 = 0;
        $reci_count1 = 0;
        $reci_count2 = 0;
        $reci_count3 = 0;
        $result0 = array();
        $result1 = array();
        $result2 = array();
        $result3 = array();


        $check = true;
        if($num0<$user_count0) {
            //选出特等奖
            $result0 = array_slice($name_list0, 0, $num0);
            $reci_count0 = $num0;        //reci_count0获奖人数

            for($x = 0;$x<$reci_count0;$x++)
            {

                $this->Users1->set_recipient($result0[$x],$ActivityID2,"0");
            }
        }
        else if($user_count0>0){
            $result0 = array_slice($name_list0,0,$user_count0);
            $reci_count0 = $user_count0;


            //将特等奖存入数据库表
            for($x = 0;$x<$reci_count0;$x++)
            {
                echo $x;
                $this->Users1->set_recipient($result0[$x],$ActivityID2,"0");
            }
        }


        //$remain剩余人数
        $remain = $user_count-$reci_count0;
        //选一等奖
        if($remain>0)
        {
            $name_list1 = array_diff($name_list,$result0);//参与抽奖人去重
            shuffle($name_list1);

            if($num1<$remain) {
                $result1 = array_slice($name_list1, 0, $num1);
                $reci_count1 = $num1;
            }
            else
            {
                $result1 = array_slice($name_list1,0,$remain);
                $reci_count1 = $remain;
            }

   

            //将一等奖存入数据库表
            for($x = 0;$x<$reci_count1;$x++)
            {
                $this->Users1->set_recipient($result1[$x],$ActivityID2,"1");
            }
        }
        else
            $check = false;

        $remain = $remain - $reci_count1;
        if($remain>0)
        {
            //二等奖
            $name_list2 = array_diff($name_list1,$result1);
            shuffle($name_list2);

            if($num2<$remain) {
                $result2 = array_slice($name_list2, 0, $num2);
                $reci_count2 = $num2;
            }
            else
            {
                $result2 = array_slice($name_list2,0,$remain);
                $reci_count2 = $remain;
            }


            //将二等奖存入数据库表
            for($x = 0;$x<$reci_count2;$x++)
            {
                $this->Users1->set_recipient($result2[$x],$ActivityID2,"2");
            }
        }

        $remain = $remain - $reci_count2;
        if($remain>0)
        {
            //三等奖
            $name_list3 = array_diff($name_list2,$result2);
            shuffle($name_list3);

            if($num3<$remain)
            {
                $result3 = array_slice($name_list3,0,$num3);
                $reci_count3 = $num3;
            }
            else
            {
                $result3 = array_slice($name_list3,0,$remain);
                $reci_count3 = $remain;
            }

            //将三等奖存入数据库表
            for($x = 0;$x<$reci_count3;$x++)
            {
                $this->Users1->set_recipient($result3[$x],$ActivityID2,"3");
            }
        }
    }
}