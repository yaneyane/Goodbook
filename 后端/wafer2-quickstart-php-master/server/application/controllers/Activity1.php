<?php
class Activity1 extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('activity1_model');
        $this->load->helper('url_helper');
    }


    public function index()
    {
        $data['activity'] = $this->activity1_model->get_activity();
        $data['ActivityName'] = '所有活动';

        $this->load->view('activity1/index', $data);
    }

    public function view($ActivityID = NULL) //所有活动
    {
        $data['activity_item'] = $this->activity1_model->get_activity($ActivityID);
        if (empty($data['activity_item']))
        {
            show_404();
        }
        if($data['activity_item']['status']==1)
        {
            $data['ActivityName'] = $data['activity_item']['ActivityName'];
            $data['StartTime'] = $data['activity_item']['StartTime'];
            $data['ActivityID'] = $data['activity_item']['ActivityID'];
        }

        $this->load->view('activity1/view', $data);
    }




}