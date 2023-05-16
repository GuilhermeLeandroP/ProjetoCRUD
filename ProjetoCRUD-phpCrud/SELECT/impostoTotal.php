<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../conexao.php';


$query_produtos="SELECT SUM(imposto) AS total FROM produto_pedido  ";
$result_produtos = $conn ->prepare($query_produtos);
$result_produtos-> execute();

$soma = $result_produtos ->fetch (PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode($soma['total']);

 






?>
