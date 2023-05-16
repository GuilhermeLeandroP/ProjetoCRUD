import styles from './BotaoVoltar.module.css'

function BotaoVoltar(){
    function voltar(){ 
        <a  href={window.history.back(-1)}></a>}
    return(
        
        <button className={styles.botaovoltar} onClick={voltar}>Voltar</button>

    )
}
export default BotaoVoltar