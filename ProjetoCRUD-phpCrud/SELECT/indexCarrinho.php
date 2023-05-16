<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../conexao.php';


$query_produtos="SELECT produto_pedido.codigo,produto,quantidade,produto_pedido.total,pedido,nome,imposto FROM produto_pedido INNER JOIN produto on produto.codigo = produto_pedido.produto INNER JOIN pedido on (pedido.codigo + 1) = produto_pedido.pedido WHERE produto_pedido.pedido = (select (codigo + 1 ) as codigo from pedido ORDER BY codigo DESC LIMIT 1);";
$result_produtos = $conn ->prepare($query_produtos);
$result_produtos-> execute();

if(($result_produtos) && ($result_produtos->rowCount()!= 0)){
    while ($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)){
         extract($row_produto);

         $lista_produtos["records"][$codigo]=[

            'codigo' => $codigo,
            'produto' => $produto,
            'quantidade' => $quantidade,
            'total' => $total,
            'pedido' => $pedido,
            'nome' => $nome,
            'imposto'=>$imposto
         ];
        }
        
    http_response_code(200);
    echo json_encode($lista_produtos);

}
 






?>


