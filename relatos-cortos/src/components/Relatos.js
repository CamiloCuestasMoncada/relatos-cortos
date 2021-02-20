import React, { useEffect, useState } from "react";
import RelatosForm from "./RelatosForm";
import { db } from "../firebase";


const Relatos = () => {
  const [relatos, setRelatos] = useState([]);
  const addOrEditRelato = async (relatoObject) => {
    console.log(relatoObject);
    await db.collection("relatos").doc().set(relatoObject);
    console.log("Funciono ok");
    getRelatos();
  };

  const getRelatos = async () => {
    const querySnapshot = await db.collection("relatos").get(); //querySnapshot: asi llama a la respuesta el servidor de firebase según la documentación.
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    let numeroOrdenMenor = 1;
    let relatosOrdenados = [];
    for (let i = 0; i < docs.length; i++) {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].orden === numeroOrdenMenor) {
          relatosOrdenados.push(docs[i]);
          numeroOrdenMenor++;
        }
      }
    }
    setRelatos(relatosOrdenados);
    
  };

  useEffect(() => {
    getRelatos();
  }, []);



  return (
    <div className="container">
      <div className="col-md-4 p-2">
        <RelatosForm addOrEditRelato={addOrEditRelato} />
      </div>

      <div className="col-md-8 p-2">
        {relatos.map((relato) => {
          return (
            <div className="card mb-1">
              <div className="card-body">
                <p>{relato.relato}</p>
                <span>{`Compartido por ${relato.nombre}`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Relatos;
