<?php
class Recipient extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('recipient_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        $data['recipient'] = $this->recipient_model->get_recipient();
        $data['title'] = '填写中奖人信息';

        $this->load->view('templates/header', $data);
        $this->load->view('recipient/index', $data);
        $this->load->view('templates/footer');
    }

    public function view($UserID = NULL)
    {
        $data['recipient_item'] = $this->recipient_model->get_recipient($UserID);

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

    public function create()
    {
        $this->load->helper('form');
        $this->load->library('form_validation');

        $data['title'] = '中奖人填写信息';

        $this->form_validation->set_rules('UserName', 'UserName1', 'required');
        $this->form_validation->set_rules('PhoneNo', 'PhoneNo1', 'required');
        $this->form_validation->set_rules('Address', 'Address1', 'required');


        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('templates/header', $data);
            $this->load->view('recipient/create');
            $this->load->view('templates/footer');

        }
        else
        {
            $this->recipient_model->set_recipient();
            $this->load->view('recipient/success');
        }
    }
}