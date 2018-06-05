<?php
class Lottery extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('users1');
        //$this->load->model('');
        $this->load->helper('url_helper');
        $this->load->model('award_model');
    }

    public function get_lottery($ActivityID2)
    {
        //将取出的满足ActivityID2的所有信息存入data数组
        $data = $this->users1->get_userID($ActivityID2);
        //将取出的userID存入name_list数组
        $name_list = array_column($data, 'UserID');


        //将取出的满足ActivityID2 有特等奖资格 的所有信息存入data1数组
        $data0 = $this->users1->get_pri_userID($ActivityID2);
        //将取出的特等奖资格userID存入name_list0数组
        $name_list0 = array_column($data0, 'UserID');



        //获取一二三等奖奖品数量
        //count:：奖品ID
        //num0_1~num3_1：一等奖到特等奖奖品全部信息
        //num0~num3：一等奖到特等奖奖品数量
        $count0 = $ActivityID2*10;
        $count1 = $ActivityID2*10+1;
        $count2 = $ActivityID2*10+2;
        $count3 = $ActivityID2*10+3;
        $num0_1 = $this->award_model->get_count($ActivityID2,$count0);
        $num1_1 = $this->users1->get_count($ActivityID2,$count1);
        $num2_1 = $this->users1->get_count($ActivityID2,$count2);
        $num3_1 = $this->users1->get_count($ActivityID2,$count3);
        //$num0 = array_column($num0_1, 'AwardQuantity');
        //$num1 = array_column($num1_1, 'AwardQuantity');
        //$num2 = array_column($num2_1, 'AwardQuantity');
        //$num3 = array_column($num3_1, 'AwardQuantity');
        $num0=$num0_1['AwardQuantity'];
        $num1=$num1_1['AwardQuantity'];
        $num2=$num2_1['AwardQuantity'];
        $num3=$num3_1['AwardQuantity'];
        //测试输出特等奖奖品数量
        echo 'test tedengjiang';
        echo $num0;
        echo "<br>";

        //抽特等奖
        //随机打乱UserID  取出前几个存进result  result0中为获特等奖人ID  name_list0为特等奖资格人
        shuffle($name_list0);
        $result0 = array_slice($name_list0,0,$num0);

        //将选出的获奖者插入recipient表中
        //reci_count0获奖人数
        $reci_count0 = $num0[0];

        //将特等奖存入数据库表

        for($x = 0;$x<$reci_count0;$x++)
        {
            $this->users1->set_recipient($result0[$x],$ActivityID2,"0");
        }


        //抽一二三等奖：
        //一等奖
        $name_list1 = array_diff($name_list,$result0);//参与抽奖人去重
        shuffle($name_list1);
        echo "一等奖资格人：";
        echo "<br>";
        print_r($name_list1);
        echo "<br>";
        $result1 = array_slice($name_list1,0,$num1[0]);
        echo "一等奖获得人：";
        echo "<br>";
        print_r($result1);
        echo "<br>";

        /*测试
        print_r($name_list);
        echo "<br>";
        print_r($result);
        echo "<br>";
        print_r($name_list2);
        echo "<br>";
        */

        //result1中为获一等奖人ID  result2中为获二等奖人ID  result3中为获三等奖人ID
        $reci_count1 = $num1[0];

        //将一等奖存入数据库表
        for($x = 0;$x<$reci_count1;$x++)
        {
            $this->users1->set_recipient($result1[$x],$ActivityID2,"1");
        }

        //二等奖
        $name_list2 = array_diff($name_list1,$result1);
        shuffle($name_list2);
        echo "二等奖资格人：";
        echo "<br>";
        print_r($name_list2);
        echo "<br>";
        $result2 = array_slice($name_list2,0,$num2[0]);
        //result1中为获一等奖人ID  result2中为获二等奖人ID  result3中为获三等奖人ID
        echo "二等奖获得人：";
        echo "<br>";
        print_r($result2);
        echo "<br>";
        $reci_count2 = $num2[0];

        //将特等奖存入数据库表
        for($x = 0;$x<$reci_count2;$x++)
        {
            $this->users1->set_recipient($result2[$x],$ActivityID2,"2");
        }

        //三等奖
        $name_list3 = array_diff($name_list2,$result2);
        shuffle($name_list3);
        echo "三等奖资格人：";
        echo "<br>";
        print_r($name_list3);
        echo "<br>";
        $result3 = array_slice($name_list3,0,$num3[0]);
        echo "三等奖获得人：";
        echo "<br>";
        print_r($result3);
        echo "<br>";
        //result1中为获一等奖人ID  result2中为获二等奖人ID  result3中为获三等奖人ID
        $reci_count3 = $num3[0];

        //将三等奖存入数据库表
        for($x = 0;$x<$reci_count3;$x++)
        {
            $this->users1->set_recipient($result3[$x],$ActivityID2,"3");
        }

    }

    //测试函数
    public function test1()
    {
        $this->users1->test();
    }

}