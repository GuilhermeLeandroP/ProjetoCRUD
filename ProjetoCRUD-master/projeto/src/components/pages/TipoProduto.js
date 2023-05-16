import { useEffect,useState } from "react";
import styles from './Produtos.module.css'
import { Link } from "react-router-dom";
import { FaPencilAlt,FaTrashAlt,FaEye, FaCartPlus } from "react-icons/fa";

function TipoProduto() {

const [data,setData]= useState([])

const getProdutos = async() => {
fetch("http://localhost/projetophp/SELECT/indexTipo.php")
.then((response) => response.json())
.then((responseJson)=>(
    // console.log(responseJson),
    setData(responseJson.records)
    ))
}


//apagar

const [status, setStatus] = useState({
    type: '',
    mensagem : ''
  });


const apagarProduto = async (codigoProduto) => {
    // console.log(codigoProduto)
    await fetch("http://localhost/projetophp/DELETE/apagartipo.php?codigo="+ codigoProduto)
    .then((response)=>response.json())
    .then((responseJson)=>{
        if(responseJson.erro){
            setStatus({
                type: 'erro',
                mensagem : responseJson.mensagem
            })
        }else{
            setStatus({
                type: 'success',
                mensagem : responseJson.mensagem
            

        })}
    })
    .then(() => {
        window.location.reload();
    })
    .catch(()=>{
        console.log("erro, produto não apagado!!!")
    })
}






useEffect(()=>{
    getProdutos();
})


    return(<>
        <h1>Tipos de produtos</h1>
        <Link to={'/cadastrotipo'}><button className={styles.botaocadastrar}><FaCartPlus></FaCartPlus> Cadastrar</button></Link>
        {status.type==='erro'?<p className={styles.alertaerro}>{status.mensagem}</p>:''}
        {status.type==='success'?<p className={styles.alertasuccess}>{status.mensagem}</p>:''}
        <table>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nome</th>
                    <th>Percentual de Imposto</th>
                    <th>Acões</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(data).map(produto=>(
                    <tr key={produto.codigo}>
                        <td>{produto.codigo}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.percentual_imposto}</td>
                        <td>
                        <Link to={'/visualizartipo/' + produto.codigo}><button className={styles.visualizar}>Visualizar<FaEye></FaEye></button></Link>
                        <Link to={'/editartipo/'+ produto.codigo}><button className={styles.editar}>Editar <FaPencilAlt></FaPencilAlt></button></Link>
                        <><button className={styles.apagar} onClick={()=> apagarProduto(produto.codigo)}>Apagar<FaTrashAlt></FaTrashAlt></button></>
                      </td>
                    </tr>
                ))}
            </tbody>
        </table>


        </>
    )
}

export default TipoProduto