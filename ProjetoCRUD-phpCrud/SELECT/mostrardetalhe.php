<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../conexao.php';
$codigo = filter_input(INPUT_GET, 'codigo');

$consulta="SELECT nome,produto_pedido.codigo, pedido, produto,quantidade, total FROM produto_pedido INNER JOIN produto ON produto.codigo = produto_pedido.produto WHERE pedido= :codigo";
$result_produtos = $conn ->prepare($consulta);
$result_produtos->bindParam(':codigo',$codigo);
$result_produtos-> execute();

if(($result_produtos) && ($result_produtos->rowCount()!= 0)){
    while($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)){
    extract($row_produto);
    $lista_produto ["records"][$codigo]=[
            'nome' => $nome,
            'produto' => $produto,
            'pedido' => $pedido,
            'codigo' => $codigo,
            'quantidade' => $quantidade,
            'total'=> $total

    ];
}
http_response_code(200);
echo json_encode($lista_produto);
}



?>


