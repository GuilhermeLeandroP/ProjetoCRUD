import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styles from './Visualizar.module.css';
import BotaoVoltar from '../layout/BotaoVoltar'

function VisualizarTipo(){
  
    const[data,setData]= useState([]);

    const {codigo}=useParams();

    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost/ProjetoPhp/SELECT/visualizartipo.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson)=>{
                setData(responseJson.produto);
            });
        }

        getProduto();
    },[codigo])

    return(
        <>
           
        <h1>Visualizar</h1>
        <BotaoVoltar/>
        <div >
        <div className={styles.container1}><p className={styles.p}>Código</p><p>{data.codigo} </p></div>
        <div className={styles.container2}><p className={styles.p}>Nome</p><p>{data.nome}</p></div> 
        <div className={styles.container3}><p className={styles.p}>percentual_imposto</p><p>{data.percentual_imposto}</p></div> 

        </div>
        </>
    )

}

export default VisualizarTipo