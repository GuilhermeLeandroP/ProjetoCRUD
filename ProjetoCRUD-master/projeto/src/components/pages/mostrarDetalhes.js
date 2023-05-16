import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import BotaoVoltar from "../layout/BotaoVoltar";

function MostrarDetalhes(){
  
    const[data,setData]= useState([]);

    const {codigo}=useParams();


    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost/ProjetoPhp/SELECT/mostrardetalhe.php?codigo="+ codigo)
            .then((response) => response.json())
            .then((responseJson)=>{
                setData(responseJson.records)
                
            }).catch(console.log('erro'))
        }

        getProduto();
    },[codigo])
    return(
        <>
           
        <h1>Visualizar</h1>
        <BotaoVoltar/>
        <table>
        
        <thead>
          <tr>
            
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor UN</th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(data=>(
            <tr key={data.codigo}>
              <td>{data.produto } - {data.nome} </td>
              <td>{data.quantidade}</td>
              <td>{data.total / data.quantidade}</td>
              <td>{data.total}</td>

              
            </tr>
             
          ))}
          
        </tbody>

      </table>
        </>
    )

}

export default MostrarDetalhes