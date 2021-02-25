import React from "react";

function Aviso(props) {
  let cerrarAviso = () => {
    const aviso = document.querySelector(`#aviso${props.idAviso}`);

    aviso.style.display = "none";
  };


  const divStyle = {
    display : 'none',
  }
 

  return (
    <div className="alert alert-dismissible alert-secondary" id={`aviso${props.idAviso}`} style={divStyle}>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        onClick={cerrarAviso}
      >
        &times;
      </button>
      <strong>¡Muy bien!</strong> ¡Los cambios se han realizado exitosamente!
    </div>
  );
}

export default Aviso;
