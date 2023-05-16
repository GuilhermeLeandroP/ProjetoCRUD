import { useState ,useEffect} from "react"
import BotaoVoltar from "../layout/BotaoVoltar";
import styles from './Cadastro.module.css'
function Cadastro(){
    const [tipoMax,setTipoMax]=useState()

    const[produto,setProduto]=useState({
    
        nome:'',
        valor:'',
        tipo:''
    });
    const [status,setStatus] =useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setProduto({...produto,[e.target.name]: e.target.value})

    const cadProduto = async e => {
        e.preventDefault(); 
        console.log(produto.nome);
        

        await fetch("http://localhost/projetophp/INSERT/cadastrar.php",{
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


    
    function getCodigo() {
        fetch(`http://localhost/ProjetoPhp/SELECT/ultimoTipo.php`)
          .then((response) => response.json())
          .then((responseJson) => setTipoMax(responseJson))
          .catch((err) => console.log(err));
      }

      const [tipo,setTipo]=useState([])
      const getTipo = async () => {
        await fetch("http://localhost/ProjetoPhp/SELECT/indexTipo.php")
          .then((response) => response.json())
          .then((responseJson) => {
            
              setTipo(responseJson.records);
            
          }).catch(console.log('errou aqui'))
      };

      useEffect(() => {
        getTipo();
    
      }, []);

    useEffect(() => {
        getCodigo();
    
      }, []);
 


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
            <input className={styles.inputs} type="text" required name="nome" placeholder="Nome do produto" onChange={valorInput}/><br/><br/>

            <label>Valor:</label><br/>
            <input className={styles.inputs} type="number" required min={0} name="valor"  step="0.001" placeholder="Valor do produto" onChange={valorInput}/> <br/><br/>

            <label>Tipo:</label><br/>

            
            <select onChange={valorInput} required name="tipo" min={1} max={tipoMax}>
                <option value=''>
                    Selecione
                </option>
                {Object.values(tipo).map(produto=>(
                <option value={produto.codigo}>{produto.codigo}-{produto.nome}</option>
                ))}

            </select>
            
            
            
            
            
            <br/><br/>
            
            <button type="submit" className={styles.botaocadastrar}>Cadastrar</button><br/><br/>
                </div>
            </div>
        </form>



</>
    )
}
export default Cadastro