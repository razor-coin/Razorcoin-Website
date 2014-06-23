<?php

header('Content-Type: application/json');

$json = file_get_contents('https://api.mintpal.com/v1/market/stats/RZR/BTC');

if(empty($json)){
	$json = '{"Last":"No trades","Bid":"No orders","Ask":"No orders"}';
}

$data = json_decode($json, true);

$summary = array(
        'Last' => $data[0]['last_price'] > .00001 ? $data[0]['last_price'] : 'No trades',
        'Bid' => $data[0]['top_bid'] > .00001 ? $data[0]['top_bid'] : 'No orders',
        'Ask' => $data[0]['top_ask'] > .00001 ? $data[0]['top_ask'] : 'No orders'
);

$encoded_price = json_encode($summary, JSON_HEX_QUOT | JSON_HEX_TAG);

echo $encoded_price;

?>