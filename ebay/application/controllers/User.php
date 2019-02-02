<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct() {
	    parent::__construct();
	    ini_set('max_execution_time', 0); 
		ini_set('memory_limit','2048M');
		
	 	$this->load->helper(array('form', 'url'));
        $this->load->library('form_validation'); 
        $this->load->library('session');
    	$this->load->database();
		$this->load->library('encryption');
    }

	public function index(){
		$users = $this->db->get('user')->result_array();
        $pass_data['users'] = $users;

		$data['form'] = $this->load->view('userform',$pass_data, true);
		$this->load->view('default',$data);
	}

	public function register(){
        $this->form_validation->set_rules('name', 'Name', 'required|min_length[5]');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|callback_username_check');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[5]');
        $this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|min_length[5]|matches[password]');

        $users = $this->db->get('user')->result_array();
        $pass_data['users'] = $users;

        if($this->form_validation->run() == FALSE){                
            $data['form'] = $this->load->view('userform',$pass_data, true);
			$this->load->view('default',$data);
        }else{         	
            $data['name'] = $this->input->post('name', true);
	        $data['email'] = $this->input->post('email', true);
	        $pass = $this->encryption->encrypt($this->input->post('password', true));
	        $data['password'] = $pass;	        	        
	        $status = $this->db->insert('user', $data);

	        if($status){
            	$this->session->set_flashdata('msg', 'User Added Successfully!');       	
        	}else{
        		$this->session->set_flashdata('msg', 'Error occur please try again.');       	
        	}

            $data['form'] = $this->load->view('userform',$pass_data, true);
			$this->load->view('default',$data);
        }
	}

	public function username_check($str){
	 		$this->db->where('email', $str);
			$num_rows = $this->db->count_all_results('user');

            if ($num_rows){
                $this->form_validation->set_message('username_check', 'The email already in use!');
                return FALSE;
            }else{
                return TRUE;
            }
    }

    public function delete($id){
    	$this->db->where('id',$id);
    	$this->db->delete('user');

    	$this->session->set_flashdata('tablemsg', 'User Deleted Successfully!.');  
    
    	$users = $this->db->get('user')->result_array();
        $pass_data['users'] = $users;

        $data['form'] = $this->load->view('userform',$pass_data, true);
		$this->load->view('default',$data);
    }

    public function edit(){
    	$this->db->where('id',$this->input->get('id',true));
    	$user = $this->db->get('user')->row_array();    
    	
		$users = $this->db->get('user')->result_array();
        $pass_data['users'] = $users;

        $pass_data['user'] = $user;

        $data['form'] = $this->load->view('userformedit',$pass_data, true);
		$this->load->view('default',$data);
    }

    public function edituser(){
        $this->form_validation->set_rules('name', 'Name', 'required|min_length[5]');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|callback_username_check_edit');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[5]');
        $this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|min_length[5]|matches[password]');

        $this->db->where('id',$this->input->get('id',true));
    	$user = $this->db->get('user')->row_array();  

        $users = $this->db->get('user')->result_array();
        $pass_data['users'] = $users;
        $pass_data['user'] = $user;

        if($this->form_validation->run() == FALSE){                
            $data['form'] = $this->load->view('userformedit',$pass_data, true);
			$this->load->view('default',$data);
        }else{         	
            $data['name'] = $this->input->post('name', true);
	        $data['email'] = $this->input->post('email', true);
	        $pass = $this->encryption->encrypt($this->input->post('password', true));
	        $data['password'] = $pass;	   
	        $this->db->where('id',$id);     	        
	        $status = $this->db->update('user', $data);

	        if($status){
            	$this->session->set_flashdata('msg', 'User Updated Successfully!');       	
        	}else{
        		$this->session->set_flashdata('msg', 'Error occur please try again.');       	
        	}

            redirect('./user/index');
        }
	}

	public function username_check_edit($str){
		    $this->db->where('id!=', $this->input->get('id',true));	 		
	 		$this->db->where('email', $str);	 		
			$num_rows = $this->db->count_all_results('user');

            if ($num_rows){
                $this->form_validation->set_message('username_check_edit', 'The email already in use!');
                return FALSE;
            }else{
                return TRUE;
            }
    }
}	
	