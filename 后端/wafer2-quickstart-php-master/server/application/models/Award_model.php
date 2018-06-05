<?php

class Award_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }
    public function get_count($ActivityID1,$AwardID1)
    {
        $query = $this->db->get_where('Award', array('ActivityID' => $ActivityID1,'AwardID'=>$AwardID1));
        return $query->row_array();
    }

    public function get_acid()
    {
        $query = $this->db->get_where('activity', array('ActivityName' => $this->acname));
        $data1['activity_item'] = $query->row_array();
        if (empty($data1['activity_item'])) {
            echo 'no here';
        }
       // $data1['ActivityName'] = $data1['activity_item']['ActivityName'];
       // $data1['StartTime'] = $data1['activity_item']['StartTime'];
        $data1['ActivityID'] = $data1['activity_item']['ActivityID'];
        // echo $data1['ActivityName'];
        //  echo $data1['ActivityID'];
        $this->acid = $data1['ActivityID'];
        return $this->acid;
    }

    public function get_award($AwardID = NULL)
    {
        if ($AwardID === NULL) {
            $query = $this->db->get('award');
            return $query->result_array();
        }

        $query = $this->db->get_where('award', array('AwardID' => $AwardID));
        if(empty($query))
        {
            echo '对应的奖项还没有被输入';
            return;
        }
        return $query->row_array();
    }


    public function set1_award($acid)
    {
        $this->load->helper('url');
        $data = array(
            'ActivityID' => $acid,
            'AwardID' => $acid * 10,
            'BookName' => $this->input->post('BookName11'),
            'BookInfo' => $this->input->post('BookInfo11'),
            'BookPhoto' => $this->input->post('BookPhoto11'),
            'QRCode' => $this->input->post('QRCode11'),
            'AwardQuantity' => $this->input->post('AwardQuantity11')
        );
        self::set2_award($acid);
        return $this->db->insert('award', $data);
    }

    public function set2_award($acid)
    {
        $this->load->helper('url');
        $data = array(
            'ActivityID' => $acid,
            'AwardID' => $acid * 10 + 1,
            'BookName' => $this->input->post('BookName22'),
            'BookInfo' => $this->input->post('BookInfo22'),
            'BookPhoto' => $this->input->post('BookPhoto22'),
            'QRCode' => $this->input->post('QRCode22'),
            'AwardQuantity' => $this->input->post('AwardQuantity22')
        );
        self::set3_award($acid);
        return $this->db->insert('award', $data);
    }

    public function set3_award($acid)
    {
        $this->load->helper('url');
        $data = array(
            'ActivityID' => $acid,
            'AwardID' => $acid * 10 + 2,
            'BookName' => $this->input->post('BookName33'),
            'BookInfo' => $this->input->post('BookInfo33'),
            'BookPhoto' => $this->input->post('BookPhoto33'),
            'QRCode' => $this->input->post('QRCode33'),
            'AwardQuantity' => $this->input->post('AwardQuantity33')
        );
        self::set4_award($acid);
        return $this->db->insert('award', $data);
    }

    public function set4_award($acid)
    {
        $this->load->helper('url');
        $data = array(
            'ActivityID' => $acid,
            'AwardID' => $acid * 10 + 3,
            'BookName' => $this->input->post('BookName44'),
            'BookInfo' => $this->input->post('BookInfo44'),
            'BookPhoto' => $this->input->post('BookPhoto44'),
            'QRCode' => $this->input->post('QRCode44'),
            'AwardQuantity' => $this->input->post('AwardQuantity44')
        );
        return $this->db->insert('award', $data);
    }
}
