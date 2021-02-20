import React, { useState } from "react";
import { db } from "../firebase";

const RelatosForm = (props) => {
  const initialStateValues = {
    nombre: "",
    relato: "",
    orden: "0",
  };
  const [values, setValues] = useState(initialStateValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getOrdenRelatos = async () => {
    try {
      const querySnapshot = await db.collection("relatos").get(); //querySnapshot: asi llama a la respuesta el servidor de firebase según la documentación.
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
    }catch(e){
        console.log(e);
    }
  };

  /*useEffect(() => {
        getRelatos();
      }, []);*/

  const ordenRelatos = async () => {
    let llego = await getOrdenRelatos();
   
      console.log(llego+"hola");
     
      //values.orden=== "0" ? values.orden = 1 : values.orden = await Number(llego) + 1;
      values.orden = await Number(llego) + 1;
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ordenRelatos();
    //console.log(ordenohp())

    props.addOrEditRelato(values);

    setValues({ nombre: "", relato: "", orden: values.orden });
  };

  return (
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

      <button className="btn btn-info btn-clock">Enviar</button>
    </form>
  );
};

export default RelatosForm;
