<?php
class Testcontroller extends CI_Controller
{

  public function __construction()
  {
        parent::__construct();
        $this->load->model('Testmodel');
  }
  public function register()
  {
    echo $this->input->post("password");

  }
  public function getGoodInfo()
{
   $this->output->set_header('content-type: application/json; charset=utf-8');
   $info=array("a"=>"b");
   $j=json_encode($info);
  echo $j;
}

}
?>