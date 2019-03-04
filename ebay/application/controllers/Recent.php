<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Recent extends CI_Controller {

	public function __construct() {
	    parent::__construct();

	    ini_set('max_execution_time', 0); 
		ini_set('memory_limit','2048M');
		$this->load->database();
	    $this->load->helper('url');
    }

	public function index(){
		if(is_null($this->session->userdata('is_admin')) || empty($this->session->userdata('is_admin'))) {	
			$this->db->where('user_id',$this->session->userdata('user_id'));
		}		
		
		$this->db->order_by('searched_on','DESC');	
		$rs = $this->db->get('recent_searches')->result_array();
		
		$csv = array();
		foreach ($rs as $value) {
			if($value['csv']){
				$csv[] = $value;
			}	
		}

		$url = array();
		foreach ($rs as $value) {
			if($value['url']){
				$url[] = $value;
			}	
		}

		$main_data['url'] = $url;
		$main_data['csv'] = $csv;

		$data['form'] = $this->load->view('recent',$main_data, true);
		$this->load->view('default',$data);
	}

	public function readcsv(){
		$id = $this->input->post('id', true);

		$this->db->where('id', $id);
		$rs = $this->db->get('recent_searches')->row_array();

		$main = [];			
		$main['data'] = unserialize($rs['data']);
		$main['filters'] = unserialize($rs['filters']);
		$main['status'] = 1;
		echo json_encode($main);
		die;
	}

	public function readurl(){
		$id = $this->input->post('url', true);

		$this->db->where('id', $id);
		$rs = $this->db->get('recent_searches')->row_array();

		$main = [];
		$main['data'] = unserialize($rs['data']);
		$main['filters'] = unserialize($rs['filters']);
		$main['main_arr_len'] = $rs['total_column'];	
		$main['status'] = 1;

		echo json_encode($main);
		die;
	}
}