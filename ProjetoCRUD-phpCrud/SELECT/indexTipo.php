<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../conexao.php';


$query_produtos="SELECT codigo,nome,percentual_imposto FROM tipo_produto ORDER BY codigo DESC";
$result_produtos = $conn ->prepare($query_produtos);
$result_produtos-> execute();

if(($result_produtos) && ($result_produtos->rowCount()!= 0)){
    while ($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)){
         extract($row_produto);

         $lista_produtos["records"][$codigo]=[
            'codigo' => $codigo,
            'nome' => $nome,
            'percentual_imposto' => $percentual_imposto,

         ];
        }
        
    http_response_code(200);
    echo json_encode($lista_produtos);

}
 






?>