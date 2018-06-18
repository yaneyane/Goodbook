<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Recipient extends CI_Controller {
    public $openID;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Recipient_model');
        $this->load->helper('url_helper');
    }
    public function awardme()
    {
      $temp=$this->input->post("openID");
       $data = $this->Recipient_model->get_awardme($temp);
       echo json_encode($data);
    }
    public function index()
    {
        $data['recipient'] = $this->Recipient_model->get_recipient();
        $data['title'] = '填写中奖人信息';

        $this->load->view('templates/header', $data);
        $this->load->view('recipient/index', $data);
        $this->load->view('templates/footer');
    }

    public function view($UserID = NULL)
    {
        $data['recipient_item'] = $this->Recipient_model->get_recipient($UserID);

        if (empty($data['recipient_item']))
        {
            show_404();
        }

        $data['UserName'] = $data['recipient_item']['UserName'];
        $data['PhoneNo'] = $data['recipient_item']['PhoneNo'];
        $data['Address'] = $data['recipient_item']['Address'];
        $this->load->view('templates/header', $data);
        $this->load->view('recipient/view', $data);
        $this->load->view('templates/footer');
    }
    public function getID()
    {
      if($this->input->post("openID")!=NULL)
      {
        $this->openID=$this->input->post("openID");
        echo $this->openID;
      }
      
    }
    public function create()
    {
       $open=$this->input->post("openID");
       $UserName=$this->input->post("UserName");
       $PhoneNo=$this->input->post("PhoneNo");
       $Address=$this->input->post("Address");
      $ActivityID=$this->input->post("ActivityID");
      echo $open;
      echo $UserName;
      $this->Recipient_model->set_recipient($open,$UserName,$PhoneNo,$Address,$ActivityID);

    }
}