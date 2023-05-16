import { useState } from "react"
import BotaoVoltar from "../layout/BotaoVoltar";
import styles from './Cadastro.module.css'
function CadastroTipo(){

    const[produto,setProduto]=useState({
    
        nome:'',
        percentual_imposto:''
    });
    const [status,setStatus] =useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setProduto({...produto,[e.target.name]: e.target.value})

    const cadProduto = async e => {
        e.preventDefault(); 
        console.log(produto.nome);
        

        await fetch("http://localhost/projetophp/INSERT/cadastrarTipo.php",{
        method:'POST',
        headers: {
            'Content-Type' :'application/json'
        },
        body:JSON.stringify({produto})
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        if(responseJson.erro){
            setStatus({
                type:'erro',
                mensagem: responseJson.messagem
            });
        
        }
        else {
            setStatus({
                type:'success',
                mensagem: responseJson.messagem
        });
    }}
        // console.log(responseJson)
    ).catch (()=>{
        setStatus({
            type:'erro',
            mensagem:'Produto não cadastrado com sucesso!!! '
        })
    })
    }


    return(
<>

        <BotaoVoltar/>
        <form onSubmit={cadProduto}>
 
        <div className={styles.inputCadastro}>
            <div className={styles.interior} >
            <h1 className={styles.titulo}>Cadastro</h1>
        {status.type==='erro'?<p className={styles.alertaerro}>{status.mensagem}</p>:''}
        {status.type==='success'?<p className={styles.alertasuccess}>{status.mensagem}</p>:''}
            <br></br>
            <label>Nome:</label><br/>
            <input className={styles.inputs} type="text" required name="nome" placeholder="Nome do Tipo" onChange={valorInput}/><br/><br/>

            <label>Percentual de Imposto:</label><br/>
            <input className={styles.inputs} type="number" required min={0} name="percentual_imposto" placeholder="Percentual do imposto do produto" onChange={valorInput}/> <br/><br/>


            <button type="submit" className={styles.botaocadastrar}>Cadastrar</button><br/><br/>
                </div>
            </div>
        </form>



</>
    )
}
export default CadastroTipo