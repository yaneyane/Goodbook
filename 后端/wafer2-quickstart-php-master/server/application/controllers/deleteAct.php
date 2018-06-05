<?php
class deleteAct extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('deleteUser');
        $this->load->helper('url_helper');
    }

    public function delete($activityID)
    {
        $this->deleteUser->deleteUser($activityID);
        $this->deleteUser->deleteAct($activityID);
    }

}