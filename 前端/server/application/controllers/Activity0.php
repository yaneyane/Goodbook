<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Activity0 extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Activity0_model');
        $this->load->model('Award_model');
        $this->load->helper('url_helper');
    }


    public function index()
    {
        $data['activity'] = $this->Activity0_model->get_activity();
        $data['ActivityName'] = '所有活动';
        echo json_encode($data);
       // $this->load->view('activity0/index', $data);
    }

    public function view($ActivityID = NULL) //所有活动
    {
        $data['activity_item'] = $this->Activity0_model->get_activity($ActivityID);

        if (empty($data['activity_item']))
        {
            show_404();
        }
        if($data['activity_item']['status']==0)
        {
            $data['ActivityName'] = $data['activity_item']['ActivityName'];
            $data['StartTime'] = $data['activity_item']['StartTime'];
            $data['ActivityID'] = $data['activity_item']['ActivityID'];
        }
        $this->load->view('activity0/view', $data);
    }
}