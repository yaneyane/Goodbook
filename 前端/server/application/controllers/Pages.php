<?php
class Pages extends CI_Controller {

    public function view($page = 'home')
    {
        /*if ( ! file_exists(APPPATH.'pages/'.$page.'.php'))
        {
            // Whoops, we don't have a page for that!
            show_404();
        }

        $data['title'] = ucfirst($page); // Capitalize the first letter

        $this->load->view('pages/'.$page, $data);*/
        echo 'test page';
    }
}