<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function __construct() {
	    parent::__construct();

	    
	    $this->load->helper('url');
		$this->load->database();
		$this->loginlib->checkLoginWithRedirect();
    }

	public function index(){
		$rs = $this->db->get('user');
		$num_results = $rs->num_rows();
		
		$data['total'] = $num_results;
		$this->load->view('main',$data);
	}
}
