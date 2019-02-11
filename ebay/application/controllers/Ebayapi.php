<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ebayapi extends CI_Controller {

	public function __construct() {
	    parent::__construct();

	    ini_set('max_execution_time', 0); 
		ini_set('memory_limit','2048M');
		
	    $this->load->helper('url');
	    $this->load->database();
			
		$this->loginlib->checkLoginWithRedirect();
    }

	public function index(){
		$data['form'] = $this->load->view('ebay_api_form',array(), true);
		$this->load->view('default',$data);
	}
	
	public function readdata(){	
		require_once APPPATH.'third_party/SimpleXLSX.php';		

		$allowed =  array('csv','xlsx');
		$filename = $_FILES['keyword']['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);

		//echo $ext; die;

		if(!in_array($ext,$allowed) ) {
			$data['status'] = 0;
			$data['msg'] = 'Please upload valid CSV or XLSX';    
			echo json_encode($data);
			exit();
		}
		
		$keyword_index = false;
		$quantity_index = false;		
		$msrp_index = false;
		$total_index = false;
		$cost_index = false;

		$file_name = $_FILES['keyword']['name'];
		
		if('xlsx' == $ext){			
			if ( $xlsx = SimpleXLSX::parse($_FILES['keyword']['tmp_name'])) {
				$xlsx_data = $xlsx->rows();
			}
        }


        if('csv' == $ext){        	
        	$xlsx_data = array();
			$lines = file($_FILES['keyword']['tmp_name'], FILE_IGNORE_NEW_LINES);
			foreach ($lines as $key => $value){			
	    		$xlsx_data[$key] = str_getcsv($value);
			}
        }

      
        //print_r($xlsx_data[0]); die;
        $keyword_val_index = '';
		$upc_val_index = '';
		$model_val_index = '';
		$description_val_index = '';
		$item_description_val_index = '';
		$title_val_index = '';

	    foreach($xlsx_data[0] as $key=>$row){	
	            $row = strtolower($row);          

				if($row == 'keyword' || $row == 'upc' || $row == 'model' || $row == 'item description' || $row == 'description' || $row == 'title'){
					if($row == 'keyword'){
						$keyword_val_index = $key;
					}	
					
					if($row == 'upc'){
						$upc_val_index = $key;
					}
					
					if($row == 'model'){
						$model_val_index = $key;
					}
					
					if($row == 'description'){
						$description_val_index = $key;
					}

					if($row == 'item description'){
						$item_description_val_index = $key;
					}
					
					if($row == 'title'){
						$title_val_index = $key;
					}				  
				}
				
				if($row == 'qty' || $row == 'quantity'){
				  if(empty($quantity_index)){		
					if($row == 'qty'){
						$quantity_index	= $key;	
					}
					
					if($row == 'quantity'){
						$quantity_index	= $key;	
					}
				  }
				}
				
				if($row == 'msrp' || $row == 'retail' || $row == 'retail price' || $row == 'retailprice'){				
					if($row == 'msrp'){
						$msrp_index = $key;
					}	
					
					if($row == 'retail'){
						$msrp_index = $key;
					}
					
					if($row == 'retail price'){
						$msrp_index = $key;
					}
					
					if($row == 'retailprice'){
						$msrp_index = $key;
					}				  
				}
				
				if($row == 'total' || $row == 'extended retailprice' || $row == 'extended retail price' || $row == 'extended retail' || $row == 'total retail price'){				   
					if($row =='total'){
						$total_index = $key;
					}

					if($row =='extended retailprice'){
						$total_index = $key;
					}

					if($row =='extended retail price'){
						$total_index = $key;
					}
					
					if($row =='extended retail'){
						$total_index = $key;
					}
					
					if($row =='total retail price'){
						$total_index = $key;
					}				   
				}
				
				if($row == 'cost' || $row == 'price'){
				   if(empty($cost_index)){		
					if($row == 'cost'){
						$cost_index = $key;	
					}
					
					if($row == 'price'){
						$cost_index = $key;	
					}						
				   }	
				}
			}			 			

		
		
		//print_r($xlsx_data); die;
		
		unset($xlsx_data[0]);
		
		//$main_data = array();
	
		
		foreach($xlsx_data as $row){
			
			$single_arr = array();		
			
			if($keyword_val_index != ''){
					$single_arr['keyword_index'] = $row[$keyword_val_index];
				}else if($upc_val_index != ''){
					$single_arr['keyword_index'] = $row[$upc_val_index];
				}else if($model_val_index != ''){
					$single_arr['keyword_index'] = $row[$model_val_index];
				}else if($description_val_index != ''){
					$single_arr['keyword_index'] = $row[$description_val_index];
				}else if($item_description_val_index !=''){
					$single_arr['keyword_index'] = $row[$item_description_val_index];
				}else{
					$single_arr['keyword_index'] = $row[$title_val_index];
				}
			
			
			if(!empty($quantity_index)){
				$single_arr['quantity_index'] = $row[$quantity_index];
			}
			
			if(!empty($msrp_index)){
				$single_arr['msrp_index'] = $row[$msrp_index];
			}
			
			if(!empty($total_index)){
				$single_arr['total_index'] = $row[$total_index];
			}
			
			if(!empty($cost_index)){
				$single_arr['cost_index'] = $row[$cost_index];
			}
			
			$main_data[] = $single_arr;
		}
		
		//print_r($main_data); die;


		if(count($main_data) == 0){
			$data['status'] = 0;
			$data['msg'] = 'Empty CSV!';    
			echo json_encode($data);
			exit();
		}
		
		foreach ($main_data as $key=>$value) {
			//print_r($value); die;
			if (!array_key_exists("keyword_index",$value)){
				$main_data[$key]['keyword_index'] = "";
			}

			if (!array_key_exists("quantity_index",$value)){
				$main_data[$key]['quantity_index'] = "";	
			}

			if (!array_key_exists("msrp_index",$value)){				
				$main_data[$key]['msrp_index'] = "";
			}

			if (!array_key_exists("total_index",$value)){
				$main_data[$key]['total_index'] = "";
			}

			if (!array_key_exists("cost_index",$value)){
				$main_data[$key]['cost_index'] = "";
			}
		}
		

		$url1 = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Whatupb15-d225-40c4-a75d-21bb2c690c8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=";
		$url2 = "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=GLOBAL-ID&itemFilter(1).value=EBAY-US";
		
		$date_to = date("Y-m-d");
		
		$dt = date("Y-m-d");
		$bdate  = strtotime("-30 days", strtotime($dt));
		$data_from = date("Y-m-d", $bdate);
		
		$url3 = "&itemFilter(2).name=EndTimeFrom&itemFilter(2).value=".$data_from."T00:00:00.000Z&itemFilter(3).name=EndTimeTo&itemFilter(3).value=".$date_to."T00:00:00.000Z";
		
		if(empty($main_data)){
			$data['status'] = 0;
			$data['msg'] = 'Empty CSV';    
			echo json_encode($data);
			exit();
		}
		
		//print_r($main_data); die;

		$pkas =0;	
		foreach ($main_data as $key=>$value) {
			//if($key==1){
			//	continue;
			//}
			if(is_numeric($value['keyword_index'])){				
				$keyword = $value['keyword_index'];				
			}else{
				$total_val = $_POST['csv_keywords'];	
				if($total_val){
					$keyword = implode(' ', array_slice(explode(' ', $value['keyword_index']), 0, $total_val));
					$keyword = preg_replace("/[\s_]/", "+", $keyword);
				}else{	 
					$keyword = preg_replace("/[\s_]/", "+", $value['keyword_index']);
				}				
			}
			
			//$keyword = preg_replace("/[\s_]/", "+", $value[1]);
			$main = $url1.$keyword.$url2;	
            //echo $main; die;
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
					$lowest_buy = [];
					foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
						$total_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
						$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
					}
					
					
					
					$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
					
					$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
					$total_found = $total_found_val == 0 ? '0' : $total_found_val;
					
					$main_data[$key]['total_found'] = $total_found;
					$main_data[$key]['total_price'] = $total_price;
					$main_data[$key]['category'] = $category;
					$main_data[$key]['lowest_buy'] = min($lowest_buy); 
				  }else{
					  
					$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
					$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
					$total_pages = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalPages'][0];  
					
					
					$total_main_price = 0;
					$lowest_buy = [];

					foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
						$total_main_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
						$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
					}
					
					for($i=2;$i<=$total_pages;$i++){
						$main = $main.'&paginationInput.pageNumber='.$i;
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_URL, $main);	
						curl_setopt($ch, CURLOPT_HEADER, 0);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
						$edata = curl_exec($ch);

						$total = json_decode($edata, true);
						
						if(isset($total['findCompletedItemsResponse'][0]['searchResult'])){
						  foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
							$total_main_price += (int) $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
							$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
						  }
						}
						
						if($i==3){
							break;
						}
					} 
					  
					$main_data[$key]['total_found'] = $total_found_val;
					$main_data[$key]['total_price'] = $total_main_price;
					$main_data[$key]['category'] = $category; 
					$main_data[$key]['lowest_buy'] = min($lowest_buy); 
				  }						
				}else{
					
					$main_data[$key]['total_found'] = 0;
					$main_data[$key]['total_price'] = 0;
					$main_data[$key]['category'] = 0;
					$main_data[$key]['lowest_buy'] = 0;
				}	
			}else{
					$main_data[$key]['total_found'] = 0;
					$main_data[$key]['total_price'] = 0;
					$main_data[$key]['category'] = 0;
					$main_data[$key]['lowest_buy'] = 0;
			}
			//print_r($csv); die;
		}

			$sv_data['csv'] = $file_name;
			$sv_data['data'] = serialize($main_data);

			$this->db->insert('recent_searches',$sv_data);

			$main = [];			
			$main['data'] = $main_data;
			$main['status'] = 1;
			echo json_encode($main);
			die;
		}

		public function readdatabyurl(){
			require_once APPPATH.'third_party/simple_html_dom.php';
			$url = $this->input->post('url', true);
			$html = file_get_html(trim($url));

			$table = $html->find('tr');
			$csv = [];

			$i=0;
			foreach($table as $element)
			{	
				if($i!=0){
					$td = array();
					$b=0;
					foreach( $element->find('td') as $row)  
				    {
				       if($b==0){
						    /*echo $row->plaintext; die;
				       		$arr = explode(' ',$row->plaintext);
				       		//echo $arr; die;
				       		$str = '';
				       		foreach ($arr as $value) {
				       			$t = '';
				       			$t = $value;//preg_replace("/\s|&nbsp;/",'',trim($value));
				       			$str .= $t.'+';	
				       		}*/				       		
				       		$td [] = $row->plaintext;
				    	}else{
				        	$td [] = preg_replace("/\s|&nbsp;/",' ',trim($row->plaintext));
				    	}
				    	$b++;	
				    }					
					$csv[] = $td;  
				}
				$i++;
			}
			
			
			if(empty($csv)){
				$data['status'] = 0;
				$data['msg'] = 'No data found!';    
				echo json_encode($data);
				exit();
			}
			
			$arrlen = count($csv[0]);
			if($arrlen == 7 || $arrlen == 5){
				array_shift($csv);
			}

			foreach ($csv as $key => $value) {
				if($value[0] == "+" || empty($value[0])){
					unset($csv[$key]);
				}
			}		
			
			//print_r($csv); die;

			

			$url1 = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Whatupb15-d225-40c4-a75d-21bb2c690c8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=";
			$url2 = "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=GLOBAL-ID&itemFilter(1).value=EBAY-US";
			
			$date_to = date("Y-m-d");
			
			$dt = date("Y-m-d");
			$bdate  = strtotime("-30 days", strtotime($dt));
			$data_from = date("Y-m-d", $bdate);
			
			$url3 = "&itemFilter(2).name=EndTimeFrom&itemFilter(2).value=".$data_from."T00:00:00.000Z&itemFilter(3).name=EndTimeTo&itemFilter(3).value=".$date_to."T00:00:00.000Z";
			
			//$csv[0][0] = 'iphne+7';

			//print_r($csv); 			
			//die;

			foreach ($csv as $key=>$value) {
				$arr_len = count($value);
				
				if($arr_len == 6){
					$keyword_val = $value[5] != "" ? $value[5] : $value[0];
					if(!$keyword_val){
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						continue;
					}
				}else if($arr_len == 5){
					$keyword_val = $value[4] != "" ? $value[4] : $value[0];
					if(!$keyword_val){
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						continue;
					}
				}else{
					$keyword_val = $value[0];
					if(!$keyword_val){
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						continue;
					}
				}
				
				//echo $keyword_val; die;
				
				$user_input = $_POST['keyword_num'];
				if (!is_numeric($keyword_val) && $user_input){	
				    //echo $user_input; die;
                   //echo "here"; die; 		
					
					$keyword_val = implode(' ', array_slice(explode(' ', $keyword_val), 0, $user_input));
					$keyword_val = preg_replace("/[\s_]/", "+", $keyword_val);
					//echo $keyword_val; die;
				}
				
				//echo $keyword_val; die;
				
				//$keyword = $string = preg_replace("/[\s_]/", "+", $value[0]);
				$main = $url1.$keyword_val.$url2;
				//echo $main; die;

				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $main);	
				curl_setopt($ch, CURLOPT_HEADER, 0);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$edata = curl_exec($ch);

				$total = json_decode($edata, true);

				if(empty($total)){
					array_push($csv[$key], 0);
					array_push($csv[$key], 0);
					array_push($csv[$key], 0);
					array_push($csv[$key], 0);

					continue;
				}

				//print_r($total); die;
				
				if(isset($total['findCompletedItemsResponse']) && $total['findCompletedItemsResponse'][0]['ack'][0] == 'Success'){
					if($total['findCompletedItemsResponse'][0]['searchResult'][0]['@count'] > 0){
						
					  if($total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0] < 100){	 
						$total_price = 0;
						$lowest_buy = [];
						foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
							$total_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
							$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
						}
						
						
						
						$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
						
						$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
						$total_found = $total_found_val == 0 ? '0' : $total_found_val;
						
						array_push($csv[$key], $total_found);
						array_push($csv[$key], $total_price);
						array_push($csv[$key], $category);
						array_push($csv[$key], min($lowest_buy)); 
					  }else{
						  
						$total_found_val = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalEntries'][0];
						$category = $total['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]['primaryCategory'][0]['categoryName'][0];
						$total_pages = $total['findCompletedItemsResponse'][0]['paginationOutput'][0]['totalPages'][0];  
						
						
						$total_main_price = 0;
						$lowest_buy = [];

						foreach($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'] as $row){
							$total_main_price += $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
							$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
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
								$total_main_price += (int) $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
								$lowest_buy[] = $row['sellingStatus'][0]['currentPrice'][0]['__value__'];
							}
							
							if($i==3){
								break;
							}
														
						} 
						  
						array_push($csv[$key], $total_found_val);
						array_push($csv[$key], $total_main_price);
						array_push($csv[$key], $category); 
						array_push($csv[$key], min($lowest_buy));  
					  }						
					}else{
						
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
					}	
				}else{
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
						array_push($csv[$key], 0);
				}
		}

			$sv_data['url'] = $url;
			$sv_data['total_column'] = count($csv[0]);
			$sv_data['data'] = serialize($csv);
			$this->db->insert('recent_searches',$sv_data);

			$main = [];
			$main['data'] = $csv;
			$main['main_arr_len'] = count($csv[0]);	
			$main['status'] = 1;

			echo json_encode($main);
			die;	
		}
}
