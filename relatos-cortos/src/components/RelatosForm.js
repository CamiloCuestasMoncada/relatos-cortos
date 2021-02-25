import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Aviso from './Aviso';

const RelatosForm = (props) => {
  const initialStateValues = {
    nombre: "",
    relato: "",
    orden: "0",
  };

  const { currentId, idAvisos } = props;

  const [values, setValues] = useState(initialStateValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getOrdenRelatos = async () => {
    try {
      const querySnapshot = await db.collection(props.collection).get(); //querySnapshot: asi llama a la respuesta el servidor de firebase según la documentación.
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      let mayor = 0;
      docs.forEach((relato) => {
        relato.orden = Number(relato.orden);
        if (relato.orden > mayor) {
          mayor = relato.orden;
        }
      });
      console.log(mayor);
      return mayor;
    } catch (e) {
      console.log(e);
    }
  };

  const ordenRelatos = async () => {
    let getNumMayor = await getOrdenRelatos();
    if (currentId === "") {
      console.log(getNumMayor + "hola");

      values.orden = (await Number(getNumMayor)) + 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await ordenRelatos();

    props.addOrEditRelato(values);

    setValues({ nombre: "", relato: "", orden: values.orden });
  };

  const getRelatoById = async (id) => {
    const doc = await db.collection(props.collection).doc(id).get();
    setValues({ ...doc.data() });
    console.log(doc.data());
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getRelatoById(props.currentId);
    }
  }, [currentId]);

  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-text bg-ligth">
            <i className="material-icons">person_pin</i>
          </div>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre:"
            onChange={handleInputChange}
            value={values.nombre}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-text bg-ligth">
            <i className="material-icons">receipt</i>
          </div>
          <textarea
            id=""
            rows="3"
            className="form-control"
            name="relato"
            placeholder="Relato:"
            onChange={handleInputChange}
            value={values.relato}
          ></textarea>
        </div>

        <button className="btn btn-info btn-clock">
          {currentId === "" ? "Enviar" : "Editar"}
        </button>
      </form>
      <Aviso idAviso = {idAvisos}/>
    </div>
  );
};

export default RelatosForm;
