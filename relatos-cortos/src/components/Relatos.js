import React, { useEffect, useState } from "react";
import RelatosForm from "./RelatosForm";
import { db } from "../firebase";
import Loading from './Loading';

const Relatos = () => {
  const [relatos, setRelatos] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const addOrEditRelato = async (relatoObject) => {
    if(currentId === ''){
      console.log(relatoObject);
    await db.collection("relatos").doc().set(relatoObject);
    console.log("Funciono ok");
    getRelatos();
    } else{
      
       await db.collection('relatos').doc(currentId).update(relatoObject);
       
       await getRelatos();
       setCurrentId('');
    }
  };

  const onDeleteRelato = (idRelato) => {
    
    let a = document.querySelector(`#btn${idRelato}`);

    if (!a) {
      let aviso = document.createElement("button");
      aviso.className = "btn btn-danger btn-sm";
      aviso.textContent = "confirmar";
      aviso.id = `btn${idRelato}`;
      document.querySelector(`#div${idRelato}`).appendChild(aviso);
      aviso.onclick = async function () {
        
        await db.collection("relatos").doc(idRelato).delete();
        
        
        await getRelatos();
        await mostrarAviso();
         
        //avisoDeExito();
      };
    }
  };

  let cerrarAviso = () => {
    document.querySelector('#aviso').style.display="none";
    
  }

  let mostrarAviso = () => {
    document.querySelector('#aviso').style.display="block";
    
  }
  const getRelatos = async () => {
    const querySnapshot = await db.collection("relatos").get(); //querySnapshot: asi llama a la respuesta el servidor de firebase según la documentación.
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    //let numeroOrdenMenor = 1;
    let relatosOrdenados = [];
    let copiaDosOrden = [];
    //let copiaDosOrdenFinalizada = [];
    for (let i= 0; i < docs.length; i++) {
      copiaDosOrden[i]=docs[i].orden
      
    }
    copiaDosOrden= copiaDosOrden.sort(comparar);
    function comparar(a, b) {
      return a - b;
    }
    


    for (let i = 0; i < docs.length; i++) {
      
      
      
      
      
      let menor = copiaDosOrden[i]
        
        for (let i = 0; i < docs.length; i++) {
          if (docs[i].orden === menor) {
            relatosOrdenados.push(docs[i]);
          }
        }
        
    }


    /*for (let i = 0; i < docs.length; i++) {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].orden === numeroOrdenMenor) {
          relatosOrdenados.push(docs[i]);
          numeroOrdenMenor++;
        }
      }
    }*/
    setRelatos(relatosOrdenados);
  };

  useEffect(() => {
    
    getRelatos();
    
      setIsLoading(false);
    
    

    //onDeleteRelato();
  }, []);


  return (
    <div className="container">
      <div className="col-md-4 p-2">
        {isLoading === true? <Loading/>:<RelatosForm {...{addOrEditRelato, currentId, relatos}}  />}
      </div>

      <div className="col-md-8 p-2">
        {relatos.map((relato) => {
          return (
            
            <div className="card mb-1" key={relato.id}>
              
              
              <div className="card-body">
                <div id={`div${relato.id}`}>
                  <p>{relato.relato}</p>
                  <i className="material-icons text-warning"
                  onClick={() => setCurrentId(relato.id)}>edit</i>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteRelato(relato.id)}
                  >
                    delete_forever
                  </i>
                </div>
                <span>{`Compartido por ${relato.nombre}`}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="alert alert-dismissible alert-secondary" id="aviso">
        <button type="button" className="close" data-dismiss="alert" onClick={cerrarAviso}>
          &times;
        </button>
        <strong>¡Muy bien!</strong> ¡Los cambios se han realizado exitosamente!
      </div>
      
      
    </div>
  );
};

export default Relatos;
