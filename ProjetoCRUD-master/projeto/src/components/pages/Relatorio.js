import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import styles from './Produtos.module.css'
function Relatorio() {

///link////
const [data,setData] = useState([]);

const getProdutos = async() =>{
  fetch("http://localhost/ProjetoPhp/SELECT/relatorio.php")
  .then((response)=>response.json())
  .then((responseJson)=>(
    // console.log(responseJson)
    setData(responseJson.records)
  ));

}





//////////



useEffect(()=>{
    getProdutos();
  },[])
  

    return(
      <>

        <table>
        
        <thead>
          <tr>
            
            <th>Codigo</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Visualizar</th>

          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(data=>(
            <tr key={data.codigo}>
              <td>{data.codigo}</td>
              <td>{data.data}</td>
              <td>{data.total}</td>
              <td><Link to={'/mostrardetalhe/'+data.codigo}><button className={styles.visualizar}>Mostrar Detalhes<FaEye></FaEye></button></Link></td>

            </tr>

          ))}
        </tbody>
      </table>

                  </>
            
   )
}

export default Relatorio