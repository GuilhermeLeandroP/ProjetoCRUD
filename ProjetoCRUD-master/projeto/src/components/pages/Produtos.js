import { useEffect,useState } from "react";
import styles from './Produtos.module.css'
import { Link } from "react-router-dom";
import { FaPencilAlt,FaTrashAlt,FaEye, FaCartPlus } from "react-icons/fa";


function Produto() {



  const apagarProduto = async (codigoProduto) =>{
    // console.log(codigoProduto);
    await fetch("http://localhost/projetophp/DELETE/apagar.php?codigo=" + codigoProduto)
    .then((response)=> response.json())
    .then((responseJson)=> {
      if(responseJson.erro){
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          }
          
          )
      }else{
        setStatus({
          type: 'success',
          mensagem: responseJson.mensagem
        })
      }
      console.log(responseJson)
    })
    .then(() => {
      window.location.reload();
  })
    .catch(()=>{
      setStatus({
        type: 'erro',
        mensagem: ("Produto não apagado com sucesso!!")
      })
      console.log("Produto não apagado com sucesso!!")
    })
  };


  const [status, setStatus] = useState({
    type: '',
    mensagem : ''
  });

  const [data,setData] = useState([]);

  const getProdutos = async() =>{
    fetch("http://localhost/ProjetoPhp/SELECT/index.php")
    .then((response)=>response.json())
    .then((responseJson)=>(
      // console.log(responseJson)
      setData(responseJson.records)
    ));

  }

useEffect(()=>{
  getProdutos();
},[])




const [tipoInput,settipoInput]=useState([])
const gettipoInput = async () => {
  await fetch("http://localhost/ProjetoPhp/SELECT/indexTipo.php")
    .then((response) => response.json())
    .then((responseJson) => {
      
        settipoInput(responseJson.records);
      
    }).catch(console.log('errou aqui'))
};

useEffect(() => {
  gettipoInput();

}, []);
  return (
    <div >
 
      <h1>Produtos</h1>

      <Link to={'/cadastro'}><button className={styles.botaocadastrar}><FaCartPlus></FaCartPlus> Cadastrar</button></Link>
      {status.type==='erro'?<p className={styles.alertaerro}>{status.mensagem}</p>:''}
        {status.type==='success'?<p className={styles.alertasuccess}>{status.mensagem}</p>:''}
      <table>
        
        <thead>
          <tr>
            
            <th>Codigo</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data,tipoInput).map(produto=>(
            <tr key= {produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.nome}</td>
              <td>{produto.valor}</td>
              <td>{produto.tipo}</td>
              <td>
                <Link to={'/visualizar/' + produto.codigo}><button className={styles.visualizar}>Visualizar<FaEye></FaEye></button></Link>
                <Link to={'/editar/'+ produto.codigo}><button className={styles.editar}>Editar <FaPencilAlt></FaPencilAlt></button></Link>
                <><button className={styles.apagar} onClick={()=> apagarProduto(produto.codigo)}>Apagar<FaTrashAlt></FaTrashAlt></button></>

                </td>
            </tr>

          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Produto;
