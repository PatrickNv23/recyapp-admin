import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({ Usuario, selectedUsuario, setUsuarios, setIsEditing, getUsuarios, }) => {

  const id = selectedUsuario.id;
  const [nombrecompleto, setNombreCompleto] = useState(
    selectedUsuario.nombrecompleto
  );

  const [usuario, setUsuario] = useState(selectedUsuario.usuario);
  const [correo, setCorreo] = useState(selectedUsuario.correo);
  const [puntos, setPuntos] = useState(selectedUsuario.puntos);
  const [contrasenia, setContrasenia] = useState(selectedUsuario.contrasenia);

  useEffect(() => {
    console.log(selectedUsuario)
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!nombrecompleto || !usuario || !correo || !puntos || !contrasenia) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Los siguientes campos son requeridos.",
        showConfirmButton: true,
      });
    }

    const Usuario = {
      id,
      nombrecompleto,
      usuario,
      correo,
      puntos: parseInt(puntos, 10),
      contrasenia,
    };

    await setDoc(doc(db, "Usuario", id), {
      ...Usuario
    });

    setUsuario(Usuario);
    setIsEditing(false);
    await getUsuarios();

    Swal.fire({
      icon: "success",
      title: "Actualizado!",
      text: `${Usuario.nombrecompleto} Datos actualizados.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (

    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Editar Usuario</h1>
        <label htmlFor="nombrecompleto">Nombre completo</label>
        <input
          id="nombrecompleto"
          type="text"
          name="nombrecompleto"
          value={nombrecompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
        />
        <label htmlFor="usuario">Nombre usuario</label>
        <input
          id="usuario"
          type="text"
          name="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          name="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label htmlFor="puntos">Puntos ($)</label>
        <input
          id="puntos"
          type="number"
          name="puntos"
          value={puntos}
          onChange={(e) => setPuntos(e.target.value)}
        />
        <label htmlFor="contrasenia">Contraseña</label>
        <input
          id="contrasenia"
          type="text"
          name="contrasenia"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
