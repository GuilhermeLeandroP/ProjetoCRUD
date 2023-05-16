<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json,true);



if($dados){
    $query_produto = "INSERT INTO tipo_produto (nome,percentual_imposto) VALUES (:nome,:percentual_imposto) ";
    $cad_produto = $conn -> prepare($query_produto);

    $cad_produto -> bindParam(':nome', $dados['produto']['nome']);
    $cad_produto -> bindParam(':percentual_imposto', $dados['produto']['percentual_imposto']) ;


    $cad_produto->execute();


    if($cad_produto->rowCount()){
        $response = [ 
        "erro"=> false,
        "messagem" => "Produto Cadastrado com sucesso!!!"
    ];
}else{ 
    $response = [ 
        "erro"=> true,
        "messagem" => "produto não cadastrado"
    ];

}
}else {
    $response =[ 
        "erro"=>true,
        "messagem"=> "produto não cadastrado com sucesso!"
    ];
}



http_response_code(200);
echo json_encode($response);

