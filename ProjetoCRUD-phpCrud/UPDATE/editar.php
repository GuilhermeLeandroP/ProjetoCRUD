<?php

include_once '../conexao.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json,true);

if($dados){
    $query_produto= "UPDATE produto SET nome=:nome,valor=:valor, tipo=:tipo WHERE codigo =:codigo ";
    $edit_produto =  $conn -> prepare($query_produto);

    $edit_produto->bindParam(':codigo', $dados['codigo']);
    $edit_produto->bindParam(':nome', $dados['nome']);
    $edit_produto->bindParam(':valor', $dados['valor']);
    $edit_produto->bindParam(':tipo', $dados['tipo']);

    $edit_produto ->execute();


    if($edit_produto ->rowCount()){
    $response=[
        "erro" => false,
        "mensagem" => "Produto editado com sucesso!"
    ];
}else{
       
            $response=[
                "erro" => true,
                "mensagem" => "Produto não editado com sucesso!"
            ];
        
    }
}else{
    $response=[
        "erro" => true,
        "mensagem" => "Produto não editado com sucesso!"
    ];

}





http_response_code(200);
echo json_encode($response);


?>