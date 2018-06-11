<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Activity extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Activity_model');
        $this->load->model('award_model');
        $this->load->helper('url_helper');
    }


    public function index()
    {
        $data['activity'] = $this->Activity_model->get_activity();
        $data['ActivityName'] = '所有活动';

        //$this->load->view('templates/header', $data);
        $this->load->view('activity/index', $data);
       // $this->load->view('templates/footer');
    }



    public function view($ActivityID = NULL) //所有活动
    {
        $data['activity_item'] = $this->Activity_model->get_activity($ActivityID);
        if (empty($data['activity_item']))
        {
            show_404();
        }
        $data['ActivityName'] = $data['activity_item']['ActivityName'];
        $data['StartTime'] = $data['activity_item']['StartTime'];
        $data['ActivityID'] = $data['activity_item']['ActivityID'];
        //$this->load->view('templates/header', $data);
        $this->load->view('activity/view', $data);
        //$this->load->view('templates/footer');
    }


    public function get_activityid()
    {
        $acid = $this->Activity_model->get_acid();
        return $acid;
    }
    public function create()
    {
     $this->output->set_header('content-type:application/x-www-form-urlencoded;charset=utf-8');
       $Activityname=$this->input->post("ActivityName");
       $ActivityDate=$this->input->post("Date");
       $ActivityTime=$this->input->post("Time");
        $ress=$this->Activity_model->set_activity($Activityname,$ActivityDate, $ActivityTime);
       self::get_activityid();

    }



}