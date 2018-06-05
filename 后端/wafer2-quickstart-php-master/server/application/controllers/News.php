<?php
class News extends CI_Controller {

    public function __construct()
    {
      echo 'tst';
        parent::__construct();
        $this->load->model('news_model');
        $this->load->helper('url_helper');
    }

    public function index()
    {
        //echo 'test';
        //$temp=this->input->get('test'),
       // echo $test;
       // $data['news'] = $this->news_model->get_news();
       // $data['title'] = 'News archive';
       // return 
        //$this->load->view('news/index', $data);
        echo $_GET['name'];
        $arr = array
       (
          'Name'=>'希亚',
          'Age'=>20
       );

$jsonencode = json_encode($arr);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
return $jsonencode;
    }

    public function view($slug = NULL)
    {
      echo $_GET['name'];
        $data['news_item'] = $this->news_model->get_news($slug);

        if (empty($data['news_item']))
        {
            show_404();
        }
        $data['title'] = $data['news_item']['title'];

        $this->load->view('news/view', $data);

    }

    public function create()
    {
      echo $_GET['name'];
        $this->load->helper('form');
        $this->load->library('form_validation');

        $data['title'] = 'Create a news item';

        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('text', 'Text', 'required');

        if ($this->form_validation->run() === FALSE)
        {
            $this->load->view('news/create');


        }
        else
        {
            $this->news_model->set_news();
            $this->load->view('news/success');
        }
    }
}