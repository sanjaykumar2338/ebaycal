<?php
$url1="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Whatupb15-d225-40c4-a75d-21bb2c690c8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=";
$url2 = "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&itemFilter(1).name=GLOBAL-ID&itemFilter(1).value=EBAY-US&paginationInput.entriesPerPage=100";
//paginationInput.pageNumber=1&
$main = $url1.'Mel+Fisher+Real+Pendant'.$url2;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $main);	
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$edata = curl_exec($ch);

	
$total = json_decode($edata, true);
//print_r($total); die;

$value = array_column($total['findCompletedItemsResponse'][0]['searchResult'],'item');
$value = array_column($value[0],'sellingStatus');

if (!function_exists('array_column')) {
    function array_column($array, $columnKey, $indexKey = null)
    {
        $result = array();
        foreach ($array as $subArray) {
            if (is_null($indexKey) && array_key_exists($columnKey, $subArray)) {
                $result[] = is_object($subArray)?$subArray->$columnKey: $subArray[$columnKey];
            } elseif (array_key_exists($indexKey, $subArray)) {
                if (is_null($columnKey)) {
                    $index = is_object($subArray)?$subArray->$indexKey: $subArray[$indexKey];
                    $result[$index] = $subArray;
                } elseif (array_key_exists($columnKey, $subArray)) {
                    $index = is_object($subArray)?$subArray->$indexKey: $subArray[$indexKey];
                    $result[$index] = is_object($subArray)?$subArray->$columnKey: $subArray[$columnKey];
                }
            }
        }
        return $result;
    }
}
//$value = array_sum($value);
print_r($value); die;

$eBayResponse = $total;
$sum = 0;
foreach ( $eBayResponse['findCompletedItemsResponse'] as $completedItemsResponse ) {
    foreach ( $completedItemsResponse['searchResult'] as $searchResults ) {
        foreach ( $searchResults['item'] as $items ) {
            foreach ( $items['shippingInfo'] as $shippingInfos ) {
                foreach ( $shippingInfos as $shippingInfo ) {
                    $sum += array_sum(array_column($shippingInfo['shippingServiceCost'], '__value__'));
                }
            }
        }
    }
}
echo $sum;
die;
//$value = array_sum(array_column($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'],'__value__'));
$names = array_column($total['findCompletedItemsResponse'][0]['searchResult'][0]['item'], 'sellingStatus');

$names2 = array_column($names, '__value__');
print_r($names2); die;

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