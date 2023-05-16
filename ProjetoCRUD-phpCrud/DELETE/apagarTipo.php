<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../conexao.php';

$codigo = filter_input(INPUT_GET, 'codigo' );

$response = '';

$query_produto =  "DELETE FROM tipo_produto WHERE codigo = :codigo AND NOT EXISTS (SELECT 1 FROM produto WHERE tipo = :codigo);";
$delete_produto =$conn -> prepare($query_produto);
$delete_produto ->bindParam(":codigo", $codigo);

if($delete_produto->execute()){
    
    $response = [
    "erro" => false,
    "mensagem" => "Produto apagado com sucesso!!!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Produto não apagado com sucesso!!!"
        ];

}


http_response_code(200);
echo json_encode($response);