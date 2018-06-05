<?php
class Award extends CI_Controller {
    public $myacid;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('award_model');
        $this->load->model('activity_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $data['award'] = $this->award_model->get_award();
        $data['BookName'] = '奖品信息展示';

        //$this->load->view('templates/header', $data);
        $this->load->view('award/index', $data);
      //  $this->load->view('templates/footer');
    }

    public function view($AwardID = NULL)
    {

        $data2['award_item'] = $this->award_model->get_award($AwardID);

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
        $this->myacid = $this->activity_model->get_acid();
        echo 'test myacid';
        echo $this->myacid;

    }
    public function create()
    {
        $this->load->helper('form');
        $this->load->library('form_validation');

        $data['title'] = '填写奖品信息';

        $this->form_validation->set_rules('BookName11', 'BookName1', 'required');
        $this->form_validation->set_rules('BookInfo11', 'BookInfo1', 'required');
        $this->form_validation->set_rules('BookPhoto11', 'BookPhoto1', 'required');
        $this->form_validation->set_rules('QRCode11', 'QRCode1', 'required');
        $this->form_validation->set_rules('AwardQuantity11', 'AwardQuantity1', 'required');

        $this->form_validation->set_rules('BookName22', 'BookName2', 'required');
        $this->form_validation->set_rules('BookInfo22', 'BookInfo2', 'required');
        $this->form_validation->set_rules('BookPhoto22', 'BookPhoto2', 'required');
        $this->form_validation->set_rules('QRCode22', 'QRCode2', 'required');
        $this->form_validation->set_rules('AwardQuantity22', 'AwardQuantity2', 'required');

        $this->form_validation->set_rules('BookName33', 'BookName3', 'required');
        $this->form_validation->set_rules('BookInfo33', 'BookInfo3', 'required');
        $this->form_validation->set_rules('BookPhoto33', 'BookPhoto3', 'required');
        $this->form_validation->set_rules('QRCode33', 'QRCode3', 'required');
        $this->form_validation->set_rules('AwardQuantity33', 'AwardQuantity3', 'required');

        $this->form_validation->set_rules('BookName44', 'BookName4', 'required');
        $this->form_validation->set_rules('BookInfo44', 'BookInfo4', 'required');
        $this->form_validation->set_rules('BookPhoto44', 'BookPhoto4', 'required');
        $this->form_validation->set_rules('QRCode44', 'QRCode4', 'required');
        $this->form_validation->set_rules('AwardQuantity44', 'AwardQuantity4', 'required');

        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('award/create');

        }
        else
        {
            self::set_acid();
            $this->award_model->set1_award($this->myacid);
            $this->load->view('award/success');
        }
    }
}