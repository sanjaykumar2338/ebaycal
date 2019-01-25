<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$csv = array();
$lines = file('../keywords.csv', FILE_IGNORE_NEW_LINES);

$i=0;

foreach ($lines as $key => $value){
	if($i >= 1){
    	$csv[$key] = str_getcsv($value);
	}
	$i++;
}

//print_r($csv); die;

// $a = "TEST's JOB APPLY";
// $string = preg_replace("/[\s_]/", "+", $a);
// echo $string;

// return;
$url1 = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Whatupb15-d225-40c4-a75d-21bb2c690c8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=";
$url2 = "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=GLOBAL-ID&itemFilter(1).value=EBAY-US&paginationInput.entriesPerPage=100";

// $main = $url1.'Mel+Fisher+Real+Pendant'.$url2;

// 	$ch = curl_init();
// 	curl_setopt($ch, CURLOPT_URL, $main);	
// 	curl_setopt($ch, CURLOPT_HEADER, 0);
// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// 	$edata = curl_exec($ch);

	
// 	$total = json_decode($edata, true);
// 	print_r($total); die;

// 	echo $total['findCompletedItemsResponse'][0]['searchResult'][0]['@count'];
	

$pkas =0;
foreach ($csv as $value) {
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
			$pkas++;
		}	
	}
}

echo $pkas;

?>