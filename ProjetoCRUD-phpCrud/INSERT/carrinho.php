<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../conexao.php';

$response_json = file_get_contents("php://input");
$data = json_decode($response_json,true);



$produto = $data['Produto'];
$quantidade =$data['Quantidade'];
$total = $data['Total'];
$pedido = $data['Pedido'];
$imposto = $data['imposto'];


if($data){
    $query_produto_pedido = "INSERT INTO produto_pedido (produto,quantidade,total,pedido,imposto) VALUES (:Produto,:Quantidade,:Total,:Pedido,:imposto) ";
    $cad_produto_pedido = $conn -> prepare($query_produto_pedido);

    $cad_produto_pedido -> bindParam(':Produto', $produto);
    $cad_produto_pedido -> bindParam(':Quantidade', $quantidade) ;
    $cad_produto_pedido -> bindParam(':Pedido', $pedido) ;
    $cad_produto_pedido -> bindParam(':Total', $total);
    $cad_produto_pedido -> bindParam(':imposto', $imposto);


    $cad_produto_pedido->execute();

    if($cad_produto_pedido->rowCount()){
        $response = [ 
        "erro"=> false,
        "messagem" => "Produto Cadastrado com sucesso!!!"
    ];
}else{ 
    $response = [ 
        "erro"=> true,
        "messagem" => "produto nao cadastrado"
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











?>