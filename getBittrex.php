<?php

header('Content-Type: application/json');

$json = file_get_contents('https://bittrex.com/api/v1/public/getticker?market=BTC-RZR');

if(empty($json)){
	$json = '{"Last":"No trades","Bid":"No orders","Ask":"No orders"}';
}

$data = json_decode($json, true);
$encoded_price = json_encode($data['result'], JSON_HEX_QUOT | JSON_HEX_TAG);

echo $encoded_price;

?>