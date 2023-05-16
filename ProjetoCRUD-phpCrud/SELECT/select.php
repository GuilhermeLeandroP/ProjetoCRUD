<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json,true);



$query_produto= "SELECT produto FROM nome=:nome,valor=:valor, tipo=:tipo WHERE codigo =:codigo ";
$edit_produto =  $conn -> prepare($query_produto);

$edit_produto->bindParam(':codigo', $dados['codigo']);
$edit_produto->bindParam(':nome', $dados['nome']);
$edit_produto->bindParam(':valor', $dados['valor']);
$edit_produto->bindParam(':tipo', $dados['tipo']);

$edit_produto ->execute();




http_response_code(200);
echo json_encode($response);


?>