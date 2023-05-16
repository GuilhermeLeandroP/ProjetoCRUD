<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../conexao.php';
// $codigo=1;
$codigo= filter_input(INPUT_GET,'codigo');
$response= '';

$query="SELECT codigo,nome,percentual_imposto FROM tipo_produto WHERE codigo=:codigo LIMIT 1";
$result_produto = $conn -> prepare($query);
$result_produto->bindParam(':codigo',$codigo);
$result_produto->execute();


if(($result_produto) AND ($result_produto->rowCount()  !=0)){
    $row_produto = $result_produto->fetch(PDO::FETCH_ASSOC);
    extract($row_produto);
    $produto = [
        'codigo' =>$codigo,
        'nome' =>$nome,
        'percentual_imposto' =>$percentual_imposto
        

    ];
    
    $response = [
        "erro"=> false,
        "produto"=>$produto
    ];
}else {
    $response = [
        "erro"=> true,
        "messagem"=> "Produto não encontrado"
    ];
}

http_response_code(200);
echo json_encode($response);



?>