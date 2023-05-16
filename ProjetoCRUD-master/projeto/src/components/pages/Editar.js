import styles from './Editar.module.css'
import BotaoVoltar from '../layout/BotaoVoltar'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
function Editar() {

    const[nome,setNome]= useState('');
    const[valor,setValor]= useState(0);
    const[tipo,setTipo]= useState(0);

    const {codigo}=useParams();

    const [status,setStatus] =useState({
        type: '',
        mensagem: ''
    })

    const editProduto = async e=> {
        e.preventDefault();
        console.log(nome);
        
        await fetch ("http://localhost/projetophp/UPDATE/editar.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({codigo,nome,valor,tipo})
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
            await fetch("http://localhost/ProjetoPhp/SELECT/visualizar.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                setNome(responseJson.produto.nome);
                setValor(responseJson.produto.valor);
                setTipo(responseJson.produto.tipo);
            });
        }

        getProduto();
    },[codigo])


    /////////////////tipo///////////////////
    const [tipoSelect,settipoSelect]=useState([])
    const gettipoSelect = async () => {
      await fetch("http://localhost/ProjetoPhp/SELECT/indexTipo.php")
        .then((response) => response.json())
        .then((responseJson) => {
          
            settipoSelect(responseJson.records);
          
        }).catch(console.log('errou aqui'))
    };

    useEffect(() => {
      gettipoSelect();
  
    }, []);
    /////////////////tipo///////////////////


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
            <input className={styles.inputs} type="text" name="nome" required placeholder="Nome do produto" value={nome} onChange={e=> setNome(e.target.value)}/><br/><br/>

            <label className={styles.labels}>Valor:</label><br/>
            <input className={styles.inputs} type="number" step="0.001" name="valor" required min={0} placeholder="Valor do produto"value={valor} onChange={e=> setValor(e.target.value)} /> <br/><br/>

            <label className={styles.labels}>Tipo:</label><br/>
     
            
            <select required name="tipo" min={1} onChange={e=> setTipo(e.target.value)} >
                <option value={tipo}>
                    {tipo} 
                </option>
                {Object.values(tipoSelect).map(produto=>(
                <option value={produto.codigo}>{produto.codigo}-{produto.nome}</option>
                ))}


            </select>
            
            
            
            
            
            
            
            
            
            
            
            <br/><br/>
            
            <button type="submit" className={styles.botaoeditar}>Editar</button><br/><br/>


        </form>
        
        
        </div>
        </>
    )

}

export default Editar