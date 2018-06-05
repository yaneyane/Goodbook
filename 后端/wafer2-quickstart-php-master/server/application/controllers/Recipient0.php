<?php
class Recipient0 extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('recipient0_model');
        $this->load->model('activity_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $temp=0;//数组下标，用来标识这是用户中的第几个奖
        //data数组用来存储用户所有的获奖ActivityID
        $data = $this->recipient0_model->getacid_recipient(1); //这个UserID应该在用户进入系统的时候就取得，此处使用 1 作为测试数据

        foreach($data as $tempacid)//对于数组中存储的全部ACID，将它作为参数调用activity_model中的get函数，得到相应活动信息
        {
            //从recipient中获取信息
            $query = $this->db->get_where('recipient', array('UserID' => 1,'ActivityID'=>$tempacid));//在recipient表中，根据用户ID和当前活动ID，来查找奖品信息
            $jiangpinxinxi=$query->row_array();
            //echo 'test jiangpiinxinxi';
            //echo '<br>';
            //print_r($jiangpinxinxi);
            //echo '<br />';
            //echo 'end test jiangpiinxinxi';

            $cong['result']['Type'][$temp]=$jiangpinxinxi['Type'];//存储奖品等级
            $degree=0;
            if($jiangpinxinxi['Type']=='特等奖')
            {
                $degree=0;
            }
            if($jiangpinxinxi['Type']=='一等奖')
            {
                $degree=1;
            }
            if($jiangpinxinxi['Type']=='二等奖')
            {
                $degree=2;
            }
            if($jiangpinxinxi['Type']=='三等奖')
            {
                $degree=3;
            }
            $query1 = $this->db->get_where('award', array('AwardID' =>$tempacid*10+$degree ,'ActivityID'=>$tempacid));//在recipient表中，根据用户ID和当前活动ID，来查找奖品信息
            $jiangpinxinxi1=$query1->row_array();
            $cong['result']['AwardName'][$temp]=$jiangpinxinxi1['BookName'];
            $cong['result']['BookPhoto'][$temp]=$jiangpinxinxi1['BookPhoto'];
            $cong['result']['QRCode'][$temp]=$jiangpinxinxi1['QRCode'];



            $cong['result']['ActivityID'][$temp]=$tempacid;

            //从activity表中获取信息
            $change['activity_item']=$this->activity_model->get_activity($tempacid);//change作为临时变量，保存当前取出的活动信息
            $cong['result']['ActivityName'][$temp] = $change['activity_item']['ActivityName'];
            $cong['result']['StartTime'][$temp] = $change['activity_item']['StartTime'];
            $cong['result']['EndTime'][$temp] = $change['activity_item']['EndTime'];
            $cong['result']['ActivityID'][$temp] = $change['activity_item']['ActivityID'];
            $temp=$temp+1;
        }
        //echo'test cong';


        $cong['number']=$temp;
        $cong['title'] = '该人全部中奖结果';
        //echo 'test index';
        //print_r($cong);
        $this->load->view('templates/header', $cong);
        $this->load->view('recipient0/index', $cong);
        $this->load->view('templates/footer');
    }

    public function view($UserID = NULL)
    {
        $data= $this->recipient0_model->get_recipient($UserID);

        if (empty($data))
        {
            show_404();
        }
        $this->load->view('templates/header', $data);
        $this->load->view('recipient0/view', $data);
        $this->load->view('templates/footer');
    }

}