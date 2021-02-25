import React, { useEffect, useState } from "react";
import RelatosForm from "./RelatosForm";
import { db } from "../firebase";
import Loading from "./Loading";


const Relatos = (props) => {
  const [relatos, setRelatos] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [idAviso, setIdAviso] = useState([]);

  const addOrEditRelato = async (relatoObject) => {
    try {
      if (currentId === "") {
        console.log(relatoObject);
        await db.collection(props.collection).doc().set(relatoObject);
        console.log("Funciono ok");
        getRelatos();
      } else {
        await db
          .collection(props.collection)
          .doc(currentId)
          .update(relatoObject);

        await getRelatos();
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteRelato = (idRelato) => {
    let a = document.querySelector(`#btn${idRelato}`);

    if (!a) {
      let btnConfirmar = document.createElement("button");
      btnConfirmar.className = "btn btn-danger btn-sm";
      btnConfirmar.textContent = "confirmar";
      btnConfirmar.id = `btn${idRelato}`;
      document.querySelector(`#div${idRelato}`).appendChild(btnConfirmar);
      btnConfirmar.onclick = async function () {
        await db.collection(props.collection).doc(idRelato).delete();

        await getRelatos();
        await mostrarAviso(idRelato);
      };
    }
  };

  

  const mostrarAviso = (idRelato) => {
    setIdAviso(idRelato);
    const aviso = document.querySelector(`#aviso${idRelato}`);
    
    aviso.style.display = "block";
  };
  const getRelatos = async () => {
    const querySnapshot = await db.collection(props.collection).get(); //querySnapshot: asi llama a la respuesta el servidor de firebase según la documentación.

    setIsLoading(false);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    let relatosOrdenados = [];
    let copiaDosOrden = [];

    for (let i = 0; i < docs.length; i++) {
      copiaDosOrden[i] = docs[i].orden;
    }
    copiaDosOrden = copiaDosOrden.sort(comparar);
    function comparar(a, b) {
      return a - b;
    }

    for (let i = 0; i < docs.length; i++) {
      let menor = copiaDosOrden[i];

      for (let i = 0; i < docs.length; i++) {
        if (docs[i].orden === menor) {
          relatosOrdenados.push(docs[i]);
        }
      }
    }

    setRelatos(relatosOrdenados);
  };

  useEffect(() => {
    getRelatos();
    //setIdAviso()
  }, []);

  return (
    <div className="container">
      <div className="container">
      <hr className="hr"/>
        <h2 id="titulos">{props.collection}</h2>
        
      </div>
      {isLoading === true ? (
        <Loading id="loading" />
      ) : (
        <div className="col-md-8 p-2">
          {relatos.map((relato) => {
            return (
              <div className="card mb-1" key={relato.id}>
                <div className="card-body">
                  <div id={`div${relato.id}`}>
                    <p>{relato.relato}</p>
                    <i className="material-icons text-info">favorite</i>
                    <i
                      className="material-icons text-warning"
                      onClick={() => setCurrentId(relato.id)}
                    >
                      edit
                    </i>
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
      )}

      <div className="col-md-8 p-2">
        <RelatosForm
          {...{ addOrEditRelato, currentId, relatos }}
          collection={props.collection}
          idAvisos={idAviso}
          
        />
        
        
      </div>
      
    </div>
  );
};

export default Relatos;
