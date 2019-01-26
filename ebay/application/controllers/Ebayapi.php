<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ebayapi extends CI_Controller {

	public function __construct() {
	    parent::__construct();

	    ini_set('max_execution_time', 0); 
		ini_set('memory_limit','2048M');
		
	    $this->load->helper('url');
    }

	public function index(){
		$data['form'] = $this->load->view('ebay_api_form',array(), true);
		$this->load->view('default',$data);
	}

	public function readdata(){		
		/*$mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
		print_r($_FILES['keyword']['type']); die;
		if(!in_array($_FILES['keyword']['type'],$mimes)){
		  $data['msg'] = 'not valid file';
		  $data['status'] = 0;
		  echo json_encode($data);
		  die;
		} */

		$csv = array();
		$lines = file($_FILES['keyword']['tmp_name'], FILE_IGNORE_NEW_LINES);

		$i=0;

		foreach ($lines as $key => $value){
			if($i >= 1){
		    	$csv[$key] = str_getcsv($value);
			}
			$i++;
		}

		/*$main = [];
		$main['data'] = $csv;
		$main['status'] = 1;

	    echo json_encode($main);
		die;
        */
		//print_r($csv); die;

		// $a = "TEST's JOB APPLY";
		// $string = preg_replace("/[\s_]/", "+", $a);
		// echo $string;

		// return;
		$url1 = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Whatupb15-d225-40c4-a75d-21bb2c690c8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=";
		$url2 = "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=GLOBAL-ID&itemFilter(1).value=EBAY-US";
		
		$date_to = date("Y-m-d");
		
		$dt = date("Y-m-d");
		$bdate  = strtotime("-30 days", strtotime($dt));
		$data_from = date("Y-m-d", $bdate);
		
		$url3 = "&itemFilter(2).name=EndTimeFrom&itemFilter(2).value=".$data_from."T00:00:00.000Z&itemFilter(3).name=EndTimeTo&itemFilter(3).value=".$date_to."T00:00:00.000Z";
		
		//echo $main = $url1.'iphone+7'.$url2.$url3;
		//die;
		//  paginationInput.pageNumber=1&
		//  $main = $url1.'Mel+Fisher+Real+Pendant'.$url2;

		// 	$ch = curl_init();
		// 	curl_setopt($ch, CURLOPT_URL, $main);	
		// 	curl_setopt($ch, CURLOPT_HEADER, 0);
		// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// 	$edata = curl_exec($ch);

			
		// 	$total = json_decode($edata, true);
		// 	//print_r($total); die;

		//  	print_r($total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0]);

		//  	exit();
			

		$pkas =0;
	
		foreach ($csv as $key=>$value) {
			$keyword = $string = preg_replace("/[\s_]/", "+", $value[1]);
			$main = $url1.$keyword.$url2;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $main);	
			curl_setopt($ch, CURLOPT_HEADER, 0);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$edata = curl_exec($ch);

			$total = json_decode($edata, true);
			
			if($total['findCompletedItemsResponse'][0]['ack'][0] == 'Success'){
				if($total['findCompletedItemsResponse'][0]['searchResult'][0]['@count'] > 0){
					
				  if($total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0] < 100){	 
					$total_price = 0;
					foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
						$total_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
					}
					
					
					
					$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
					
					$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
					$total_found = $total_found_val == 0 ? '0' : $total_found_val;
					
					array_push($csv[$key], $total_found);
					array_push($csv[$key], $total_price);
					array_push($csv[$key], $category);
				  }else{
					  
					$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
					$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
					$total_pages = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalPages'][0];  
					
					
					$total_main_price = 0;
					
					foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
						$total_main_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
					}
					
					for($i=2;$i<=$total_pages;$i++){
						$main = $main.'&paginationInput.pageNumber='.$i;
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_URL, $main);	
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
						$edata = curl_exec($ch);

						$total = json_decode($edata, true);
						
						foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
							$total_main_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
						}

						//if($i==5){
						//    break;
						//}	
						
					} 
					  
					array_push($csv[$key], $total_found_val);
					array_push($csv[$key], $total_main_price);
					array_push($csv[$key], $category);  
				  }						
				}else{
					
					array_push($csv[$key], 0);
					array_push($csv[$key], 0);
					array_push($csv[$key], 0);
				}	
			}
		}

			$main = [];
			$main['data'] = $csv;
			$main['status'] = 1;

			echo json_encode($main);
			die;
		}
}
