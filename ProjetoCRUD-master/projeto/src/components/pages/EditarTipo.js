import styles from './Editar.module.css'
import BotaoVoltar from '../layout/BotaoVoltar'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
function EditarTipo() {

    const[nome,setNome]= useState('');
    const[percentual_imposto,setPercentual_imposto]= useState(0);
    

    const {codigo}=useParams();

    const [status,setStatus] =useState({
        type: '',
        mensagem: ''
    })

    const editProduto = async e=> {
        e.preventDefault();
        console.log(nome);
        
        await fetch ("http://localhost/ProjetoPhp/UPDATE/editarTipo.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({codigo,nome,percentual_imposto})
        }).then((response) => response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                })

            }else {
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });

            }
        }).catch(() => {
            setStatus({
                type: 'erro',
                mensagem:  'Produto não editado, tente mais tarde!!!'
            });
        })
    }

    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost/ProjetoPhp/SELECT/visualizartipo.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                setNome(responseJson.produto.nome);
                setPercentual_imposto(responseJson.produto.percentual_imposto);

            });
        }

        getProduto();
    },[codigo])




    return(


<> 
        <BotaoVoltar></BotaoVoltar>
    
        <div className={styles.diveditar}>

        <form onSubmit={editProduto}>
        <h1 className={styles.titulo}>Editar</h1>
        {status.type==='erro'?<p className={styles.alertaerro}>{status.mensagem}</p>:''}
        {status.type==='success'?<p className={styles.alertasuccess}>{status.mensagem}</p>:''}
        <br></br>
            <label className={styles.labels}>Nome:</label><br/>
            <input className={styles.inputs} type="text" name="nome"  required placeholder="Nome do produto" value={nome} onChange={e=> setNome(e.target.value)}/><br/><br/>

            <label className={styles.labels}>percentual_imposto:</label><br/>
            <input className={styles.inputs} type="number" name="percentual_imposto" required min={0} placeholder="percentual_imposto do produto"value={percentual_imposto} step="0.001" onChange={e=> setPercentual_imposto(e.target.value)} /> <br/><br/>

            
            <button type="submit" className={styles.botaoeditar}>Editar</button><br/><br/>


        </form>
        
        
        </div>
        </>
    )

}

export default EditarTipo