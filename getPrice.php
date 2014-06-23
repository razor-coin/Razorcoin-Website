<?php
//get latest price of bitstamp

//header('Content-Type: application/json');

$jsonusd = file_get_contents('https://www.bitstamp.net/api/ticker/');
$jsoneur = file_get_contents('https://www.bitstamp.net/api/eur_usd/');

$datausd = json_decode($jsonusd, true);
$dataeur = json_decode($jsoneur, true);

$lastusd = $datausd['last'];
$lasteur = round(($datausd['last'] / $dataeur['buy']),2);

$summary = array(
		'LastUSD' => $lastusd,
		'LastEUR' => $lasteur
);

$encoded_price = json_encode($summary, JSON_HEX_QUOT | JSON_HEX_TAG);

echo $encoded_price;

?>