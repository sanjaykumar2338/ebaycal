<?php
defined('BASEPATH') OR exit('Access Denied');/**
 * Description of Genlib
 * Class deals with functions needed in multiple controllers to avoid repetition in each of the controllers
 *
 * @author 
 */
class Loginlib {
    protected $CI;
    
    public function __construct() {
        $this->CI = &get_instance();
    }

    

    /**
     * 
     * @param type $sname
     * @param type $semail
     * @param type $rname
     * @param type $remail
     * @param type $subject
     * @param type $message
     * @param type $replyToEmail
     * @param type $files
     * @return type
     */
    public function send_email($sname, $semail, $rname, $remail, $subject, $message, $replyToEmail="", $files=""){
        $this->CI->email->from($semail, $sname);
        $this->CI->email->to($remail, $rname);
        $replyToEmail ? $this->CI->email->reply_to($replyToEmail, $sname) : "";
        $this->CI->email->subject($subject);
        $this->CI->email->message($message);
        
        //include attachment if $files is set
        if($files){
            foreach($files as $fileLink){
                $this->CI->email->attach($fileLink, 'inline');
            }
        }

        $send_email = $this->CI->email->send();
        
        
        return $send_email ? TRUE : FALSE;
    }
    
    
    
    
    /**
     * 
     */
    public function superOnly() {
        //prevent access if user is not logged in or role is not "Super"
		//echo $_SESSION['is_admin']; die;
        if(empty($_SESSION['is_admin'])){
            redirect(base_url().'ebayapi/index');
        }
    }


     /**
     * 
     * @return string
     */
    public function checkLoginWithRedirect() {
	
        if (empty($_SESSION['user_id'])) {            
            //redirects to login page
            redirect(base_url().'user/login');
        }else {
            return TRUE;
        }
    }

    public function checkLogin() {
        if (empty($_SESSION['user_id'])) {            
            //redirects to login page
            return false;
        }else {
            return true;
        }
    }
}