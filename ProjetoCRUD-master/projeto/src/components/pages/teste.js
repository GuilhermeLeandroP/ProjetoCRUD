import styles from './Venda.module.css';

import { useState,useEffect } from 'react';

function Venda() {
    //select/////////////////////////////////////////////////////////////////
    const [data,setData] = useState([]);
    const [qtd, setQtd] = useState(0)
    const [valorUn, setValorUn] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)

    function getProdutos(){
        fetch(`http://localhost/ProjetoPhp/SELECT/index.php`)
        .then((response) => response.json())
        .then((responseJson)=>(
            setData(responseJson.records)
        ))
        .catch((err) => console.log(err))
    }

    const pegarProduto = async (e) =>{
        await fetch("http://localhost/ProjetoPhp/SELECT/visualizar.php?codigo="+e)
        .then((response) => response.json())
        .then((responseJson)=>{
            setData(responseJson.produto);
            setValorUn(responseJson.produto.valor);
        });
    }
    
    const pegarImposto = async (e) =>{
      await fetch("http://localhost/ProjetoPhp/SELECT/visualizartipo.php?codigo="+e)
      .then((response) => response.json())
      .then((responseJson)=>{
          setData(responseJson.produto);
          setValorUn(responseJson.produto.valor);
      });
  }






    const pegarQtd =(e)=>{
        setQtd(e.target.value)
    }

    useEffect(()=>{
        getProdutos();
    }, [])

    useEffect(() => {
        setValorTotal(qtd * valorUn);
    }, [qtd, valorUn])
 
    //////////////////////////////////

    return(
        <>
            <div className={styles.divesquerdo}>
                <form>
                    <fieldset className={styles.fieldsetproduto}>
                        <label htmlFor='produto'>Produto</label>
                        <select value={data.codigo} onChange={(e) => {
                            setSelectedItem(e.target.value);
                            pegarProduto(e.target.value);
                        }}>
                            <option value="0">Selecione um produto</option>
                            {Object.values(data).map(produto=>(
                                <option  key={produto.codigo} value={produto.codigo}>{produto.tipo} - {produto.nome}</option>
                            ))}
                        </select>
                    </fieldset>
                    <div className={styles.selects}>
                        <fieldset className={styles.fieldset}>
                            <label htmlFor='quantidade'>Quantidade</label>
                            <input type='number' value={qtd} onChange={pegarQtd} placeholder='Quantidade' name='quantidade'></input>
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <label htmlFor='valorun'>valorun</label>
                            <input readOnly disabled type='number' placeholder='valor' value={valorUn} name='valor'></input>
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <label htmlFor='total'>total</label>
                            <input type='number' placeholder='total' name='total' value={valorTotal} readOnly></input>
                        </fieldset>
                    </div>
                    <button type='submit'>Incluir</button>
                </form>
            </div>
        </>
    )
}

export default Venda