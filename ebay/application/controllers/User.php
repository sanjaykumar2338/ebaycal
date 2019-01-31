<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct() {
	    parent::__construct();

	    ini_set('max_execution_time', 0); 
		ini_set('memory_limit','2048M');
		
	    $this->load->helper('url');
    }

	public function index(){
		$data['form'] = $this->load->view('userform',array(), true);
		$this->load->view('default',$data);
	}
}	
	