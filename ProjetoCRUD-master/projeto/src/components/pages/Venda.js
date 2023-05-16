import styles from './Venda.module.css';
import { useState, useEffect } from 'react';

function Venda() {
  //USE STATE/////////////////////////////////////////////////////////////////
  const [data, setData] = useState([]);
  const [dataCarrinho, setDataCarrinho] = useState([]);
  const [qtd, setQtd] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [Produto,setProduto]=useState([])
  const [Pedido,setPedido]=useState([])
  const [Quantidade,setQuantidade]=useState([])
  const [Total,setTotal]=useState([])
  const [imposto,setImposto] =useState([])


  const [percentual,setPercentual]= useState([])
  const [codigoPedido,setCodigoPedido]= useState([])

 ////////////////////////////////

 ////////////////////////LINKS/////////////////////////////
  function getProdutos() {
    fetch(`http://localhost/ProjetoPhp/SELECT/index.php`)
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.records))
      .catch((err) => console.log(err));
  }


  function getCodigo() {
    fetch(`http://localhost/ProjetoPhp/SELECT/codigo.php`)
      .then((response) => response.json())
      .then((responseJson) => setCodigoPedido(responseJson))
      .catch((err) => console.log(err));
  }


  function getCarrinho() {
    fetch(`http://localhost/ProjetoPhp/SELECT/indexCarrinho.php`)
      .then((response) => response.json())
      .then((responseJson) => setDataCarrinho(responseJson.records))
      .catch((err) => console.log('INCLUA PRODUTOS'));
  }


  const pegarProduto = async (c) => {
    await fetch('http://localhost/ProjetoPhp/SELECT/visualizar.php?codigo=' + c)
      .then((response) => response.json())
      .then((responseJson) => {
        setProdutoSelecionado(responseJson.produto);
        getImp(responseJson.produto.tipo)
      });
  };


////////////////////////teste
const getImp = async (e) => {
  await fetch("http://localhost/ProjetoPhp/SELECT/visualizarTipo.php?codigo=" + e)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.produto) {
        setPercentual(responseJson.produto.percentual_imposto);
      }
    })
};


// //////////////
// function recarregar(){
//   window.location.reload(true)
// }



const teste = () =>{
  setProduto (produtoSelecionado.codigo)

  setPedido(codigoPedido +1)
  setQuantidade(qtd)
  setTotal(valorTotal)
  setImposto((valorTotal * percentual)/100)
  console.log(percentual)
  console.log(codigoPedido)


  
}

  ////cadastrar produto/////

  const cadProduto = async e => {
    e.preventDefault(); 
  
    const data = {
      Produto,
      Quantidade,
      Pedido,
      Total,
      imposto

    };


    

  
    await fetch("http://localhost/projetophp/INSERT/carrinho.php",{
      method:'POST',
      headers: {
        'Content-Type' :'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) =>response.json())
    .then((data)=>(
      setTimeout(() => {
        window.location.reload(true)
      }, 200)
    ))

  };

  const pegarQtd = (e) => {
    setQtd(e.target.value);
  };

  useEffect(() => {
    getProdutos();

  }, []);
  
  useEffect(() => {
    getCarrinho();

  }, []);
  

  useEffect(() => {
    getCodigo();

  }, []);
 
  useEffect(() => {
    if (produtoSelecionado && !isNaN(qtd) && !isNaN(produtoSelecionado.valor)) {
      setValorTotal(qtd * produtoSelecionado.valor);
    }
  }, [qtd, produtoSelecionado]);




  ////////////////////////////////////////////////////////////////////teste pegar imposto /////////////////////////////////////////////////////////////////

 
  let total = 0;
  Object.values(dataCarrinho).map(dataCarrinho => (
      total += parseInt(dataCarrinho.total)))
 
  let imp = 0;
  Object.values(dataCarrinho).map(dataCarrinho => (
      imp += parseInt(dataCarrinho.imposto)))

      const concluirVenda = async (e) => {
        e.preventDefault()

        await fetch("http://localhost/projetophp/INSERT/novoPedido.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total })
        })
            .then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }




  




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <section>
      <div className={styles.divesquerdo}>
        <form onSubmit={cadProduto}>
          <fieldset className={styles.fieldsetproduto}>
            <label className={styles.labelproduto} htmlFor='produto'>Produto</label>
            <select name='produto'
              value={produtoSelecionado ? produtoSelecionado.codigo : ''}
              onChange={(e) => {

                pegarProduto(e.target.value);

                getImp(percentual)
              }}
            >
              <option value=''>Selecione um produto</option>
              {Object.values(data).map((produto) => (
                <option key={produto.codigo} value={produto.codigo}>
                  {produto.tipo} - {produto.nome}
                </option>
              ))}
            </select>

          
          </fieldset>
          <div className={styles.selects}>
            <fieldset className={styles.fieldset}>
              <label className={styles.labelqtd} htmlFor='quantidade' >Quantidade</label>
              <input required
                min={1}
                value={qtd}
                type="number"
                onChange={pegarQtd
                }
                placeholder='Quantidade'
                name='quantidade'
              />
            </fieldset>


            <fieldset className={styles.fieldset}>
              <label className={styles.labelvalorun} htmlFor='valorun'>valorun</label>
              <input
                readOnly
                disabled
                type='number'
                placeholder='valor'
                value={produtoSelecionado ? produtoSelecionado.valor : ''}
                name='valor'></input>



            </fieldset>


            <fieldset className={styles.fieldset}>
                <label htmlFor='total' className={styles.labelvalorun}>total</label>
                <input type='number' placeholder='total' value={valorTotal} name='valorTotal' readOnly disabled></input>

            </fieldset>
            </div>
            <button type='submit'  onClick={teste} className={styles.botaoincluir} >Incluir</button>
            </form>

        </div>
       <div  className={styles.divesquerdo}>
       <table>
        
        <thead>
          <tr>
            
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor UN</th>
            <th>Total</th>
            <th>Imposto</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(dataCarrinho).map(dataCarrinho=>(
            <tr key={dataCarrinho.codigo}>
              <td>{dataCarrinho.produto } - {dataCarrinho.nome}</td>
              <td>{dataCarrinho.quantidade}</td>
              <td>{dataCarrinho.total / dataCarrinho.quantidade}</td>
              <td>{dataCarrinho.total}</td>
              <td>{dataCarrinho.imposto}</td>
              
            </tr>
             
          ))}
          <tr className={styles.resposta}>
          <td>Imposto Total: </td>
          <td>{imp}</td>
          <td></td>
          <td>Valor Total:</td>
          <td>{total}</td>
          
          </tr>
          
        </tbody>

      </table>
      <button type='submit' className={styles.botaoconcluir} onClick={concluirVenda}>Concluir Venda</button>
       </div>
    </section>
      

          )}
export default Venda

///SELECT SUM(produto_pedido.total * tipo_produto.percentual_imposto/100) AS total_impostos FROM produto_pedido INNER JOIN produto ON produto_pedido.produto = produto.codigo INNER JOIN tipo_produto ON produto.tipo = tipo_produto.codigo WHERE produto_pedido.pedido = 1;