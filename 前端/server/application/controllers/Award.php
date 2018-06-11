<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Award extends CI_Controller {
    public $myacid;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Award_model');
        $this->load->model('Activity_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $data['award'] = $this->Award_model->get_award();
        $data['BookName'] = '奖品信息展示';

        //$this->load->view('templates/header', $data);
        $this->load->view('award/index', $data);
      //  $this->load->view('templates/footer');
    }

    public function view($AwardID = NULL)
    {

        $data2['award_item'] = $this->Award_model->get_award($AwardID);

        if (empty($data2['award_item']))
        {
            show_404();
        }
        //echo 'test';
        $data2['BookName'] = $data2['award_item']['BookName'];
        $data2['BookInfo'] = $data2['award_item']['BookInfo'];
        $data2['AwardID'] = $data2['award_item']['AwardID'];
       // $this->load->view('templates/header', $data);
        $this->load->view('award/view', $data2);
      //  $this->load->view('templates/footer');
    }
    public function set_acid()
    {
        $this->myacid = $this->Activity_model->get_acid();
        echo 'test myacid';
        echo $this->myacid;

    }
    public function create()
    {
      $this->output->set_header('content-type: application/json; charset=utf-8');
      self::set_acid();
      $BookName11=$this->input->post("BookName11");
      $BookInfo11=$this->input->post("BookInfo11");
      $BookPhoto11=$this->input->post("BookPhoto11");
      $QRCode11=$this->input->post("QRCode11");
      $AwardQuantity11=$this->input->post("AwardQuantity11");
      $BookName22=$this->input->post("BookName22");
      $BookInfo22=$this->input->post("BookInfo22");
      $BookPhoto22=$this->input->post("BookPhoto22");
      $QRCode22=$this->input->post("QRCode22");
      $AwardQuantity22=$this->input->post("AwardQuantity22");
      $BookName33=$this->input->post("BookName33");
      $BookInfo33=$this->input->post("BookInfo33");
      $BookPhoto33=$this->input->post("BookPhoto33");
      $QRCode33=$this->input->post("QRCode33");
      $AwardQuantity33=$this->input->post("AwardQuantity33");
      $BookName44=$this->input->post("BookName44");
      $BookInfo44=$this->input->post("BookInfo44");
      $BookPhoto44=$this->input->post("BookPhoto44");
      $QRCode44=$this->input->post("QRCode44");
      $AwardQuantity44=$this->input->post("AwardQuantity44");
          $this->Award_model->set1_award($this->myacid,$BookName11,$BookInfo11,$BookPhoto11,$QRCode11,$AwardQuantity11,$BookName22,$BookInfo22,$BookPhoto22,$QRCode22,$AwardQuantity22,$BookName33,$BookInfo33,$BookPhoto33,$QRCode33,$AwardQuantity33,$BookName44,$BookInfo44,$BookPhoto44,$QRCode44,$AwardQuantity44);
        }
}
