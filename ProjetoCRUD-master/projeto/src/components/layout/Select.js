// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom";


// function Select(){
  

//     const [data,setData] = useState([]);

//     const getProdutos = async() =>{
//       fetch("http://localhost/ProjetoPhp/index.php")
//       .then((response)=>response.json())
//       .then((responseJson)=>(
//         // console.log(responseJson)
//         setData(responseJson.records)
//       ));
  
//     }
  
//   useEffect(()=>{
//     getProdutos();
//   },[]) 



//   const[produto,setProduto]=useState({
    
//     nome:'',
//     valor:'',
//     tipo:''
// });

//   const valorInput = e => setProduto({...produto,[e.target.name]: e.target.value})

//     return(
        
//         <select>
//              {Object.values(data).map(produto=>(
//             <option onChange={valorInput}>{produto.tipo} - {produto.nome} </option>
//              ))}
//         </select>
        


//     )
// }

// export default Select