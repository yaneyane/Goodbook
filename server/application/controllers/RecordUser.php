<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class RecordUser extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('RecordUser_model');
        $this->load->helper('url_helper');
    }

    //添加参与用户
    public function addUsers()
    {
      $UserID=$this->input->post("openID");
      $activityID=$this->input->post("ActivityID");
      echo $UserID;
      echo $activityID;
      $this->RecordUser_model->add($UserID,$activityID);
    }

    //添加特等奖资格用户
    public function addQualiUsers()
    {
      $UserID=$this->input->post("openID");
      $activityID=$this->input->post("ActivityID");
      echo $UserID;
        $this->RecordUser_model->insertqual($UserID,$activityID);
    }
}
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/28
 * Time: 18:28
 */