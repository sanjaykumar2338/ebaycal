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
		$main['main_arr_len'] = $rs['total_column'];	
		$main['status'] = 1;

		echo json_encode($main);
		die;
	}
}