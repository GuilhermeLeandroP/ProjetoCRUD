import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar(){
    return (
        <div>
        <ul className={styles.list}>
        <li className={styles.nomeloja}><b>Loja do Mirante</b></li>
        <li className={styles.item}><Link  className={styles.Link}  to="/">Venda</Link></li>
        <li className={styles.item}><Link  className={styles.Link}  to="/produtos">Produtos</Link></li>
        <li className={styles.item}><Link  className={styles.Link}  to="/tipoproduto">Tipo de Produtos</Link></li>
        <li className={styles.item}><Link  className={styles.Link}  to="/relatorio">Relatorio</Link></li>
      </ul>
      </div>

    )
}

export default Navbar 