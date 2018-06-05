<?php
class Recipient_model extends CI_Model {

    public function __construct()
    {
        $this->load->database();
    }

    public function get_recipient($RecipientID = FALSE)
    {
        if ($RecipientID === FALSE)
        {
            $query = $this->db->get('recipient');
            return $query->result_array();
        }

        $query = $this->db->get_where('recipient', array('RecipientID' => $RecipientID));
        return $query->row_array();
    }

    public function set_recipient()
    {
        $this->load->helper('url');

        $data = array(
            //'UserID'=从User表取得
            //'ActivityID=从activity表取得
            'UserName' => $this->input->post('UserName'),
            'PhoneNo' => $this->input->post('PhoneNo'),
            'Address' => $this->input->post('Address'),
        );

        return $this->db->insert('recipient', $data);
    }
}
