<?php
class RecordUser extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('AddUser');
        $this->load->helper('url_helper');
    }

    //添加参与用户
    public function addUsers($userID,$activityID)
    {
        $this->addUser->add($userID,$activityID);
    }

    //添加特等奖资格用户
    public function addQualiUsers($userID,$activityID)
    {
        $this->addUser->addQualification($userID,$activityID);
    }
}
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/28
 * Time: 18:28
 */