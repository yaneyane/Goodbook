<?php
class Activity00 extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('activity0_model');
        $this->load->model('activity00_model');
        $this->load->model('award_model');
        $this->load->helper('url_helper');
    }


    public function index()
    {
        $data['activity'] = $this->activity0_model->get_activity();
        $data['ActivityName'] = '所有活动';

        $this->load->view('activity00/index', $data);
    }

    public function view($ActivityID = NULL) //所有活动
    {
        $data['activity_item'] = $this->activity0_model->get_activity($ActivityID);

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

        //$this->load->view('templates/header', $data);
        $this->load->view('activity00/view', $data);
        //$this->load->view('templates/footer');
    }




}