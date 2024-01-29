import React, { useState } from "react";
import Swal from "sweetalert2";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Add = ({ Usuario, setUsuarios, setIsAdding, getUsuarios }) => {
  const [nombrecompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [puntos, setPuntos] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!nombrecompleto || !usuario || !correo || !contrasenia || !puntos) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newUsuario = {
      nombrecompleto,
      usuario,
      correo,
      puntos: parseInt(puntos, 10),
      contrasenia,
    };
    const auth = getAuth();

    // Obtener una referencia a la colección
    const credential = await createUserWithEmailAndPassword(
      auth,
      newUsuario.correo,
      newUsuario.contrasenia
    );
    const uid = credential.user.uid;
    const usuariosColeccion = collection(db, "Usuario");
    // Crear una referencia con el ID especificado
    const nuevoDocumentoRef = doc(usuariosColeccion, uid);
    // Establecer los datos del documento
    setDoc(nuevoDocumentoRef, {
      ...newUsuario,
    })
      .then(() => {
        console.log("Usuario creado con ID personalizado:", uid);
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      });

    /*
    try {
      //createUserWithEmailAndPassword(auth, newUsuario.correo, newUsuario.contrasenia);
      const credential= await createUserWithEmailAndPassword(auth, newUsuario.correo, newUsuario.contrasenia);
      const uid = credential.user.uid;
      //newUsuario.id = uid;
      await addDoc(collection(db, "Usuario"), {
        ...newUsuario,
      });
    } catch (error) {
      console.log(error);
    }
    */

    Usuario.push(newUsuario);
    setUsuario(usuario);
    setIsAdding(false);
    getUsuarios();

    Swal.fire({
      icon: "success",
      title: "agregao!",
      text: `${nombrecompleto} fue agregado exitosamente`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Registrar Usuario</h1>
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
          <input type="submit" value="Agregar" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;