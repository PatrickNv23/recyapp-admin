import React, { useState } from "react";
import Swal from "sweetalert2";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Materiales from ".";

const Add = ({ Material, setMateriales, setIsAdding, getMateriales }) => {
  const [nombreMaterial, setnombreMaterial] = useState("");
  const [valorMaterial, setValorMaterial] = useState("");
  const [imagenurlMaterial, setImagenUrlMaterial] = useState("");


  const handleAdd = async (e) => {
    e.preventDefault();

    if (!nombreMaterial || !valorMaterial || !imagenurlMaterial) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Todos los campos son requeridos",
        showConfirmButton: true,
      });
    }

    const newMaterial = {
      nombreMaterial,
      valorMaterial: parseInt(valorMaterial, 10),
      imagenurlMaterial,
    };
  
    const usuariosColeccion = collection(db, "Materiales");
    // Crear una referencia con el ID especificado
    const nuevoDocumentoRef = doc(usuariosColeccion);
    // Establecer los datos del documento
    setDoc(nuevoDocumentoRef, {
      ...newMaterial,
    })
    

    Material.push(newMaterial);
    setMateriales(Material);
    setIsAdding(false);
    await getMateriales();

    Swal.fire({
      icon: "success",
      title: "agregdao!",
      text: `${nombreMaterial} agregado exitosamente`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Registrar Material</h1>
        <label htmlFor="nombreMaterial">Nombre Material</label>
        <input
          id="nombreMaterial"
          placeholder="Ingrese nombre del material"
          type="text"
          name="nombreMaterial"
          value={nombreMaterial}
          onChange={(e) => setnombreMaterial(e.target.value)}
        />
        <label htmlFor="valorMaterial">Valor del Material</label>
        <input
          id="valorMaterial"
          type="number"
          placeholder="Ingrese el valor del material"
          name="valorMaterial"
          value={valorMaterial}
          onChange={(e) => setValorMaterial(e.target.value)}
        />
        <label htmlFor="imagenurlMaterial">Ingrese la imagen url del material</label>
        <input
          id="imagenurlMaterial"
          type="text"
          placeholder="Ingrese la imagen url del material"
          name="imagenurlMaterial"
          value={imagenurlMaterial}
          onChange={(e) => setImagenUrlMaterial(e.target.value)}
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