import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({ Material, selectedMaterial,setMaterial, setIsEditing, getMateriales, }) => {

  const id = selectedMaterial.id;
  const [nombreMaterial, setNombreMaterial] = useState(selectedMaterial.nombreMaterial);
  const [valorMaterial, setValorMaterial] = useState(selectedMaterial.valorMaterial);
  const [imagenurlMaterial, setImagen] = useState(selectedMaterial.imagenUrlMaterial);


  useEffect(() => {
    console.log(selectedMaterial)
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!nombreMaterial || !valorMaterial || !imagenurlMaterial) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Los siguientes campos son requeridos.",
        showConfirmButton: true,
      });
    }

    const Material = {
      id,
      nombreMaterial,
      valorMaterial: parseInt(valorMaterial, 10),
      imagenurlMaterial,
    };

    await setDoc(doc(db, "Materiales", id), {
      ...Material
    });

    setMaterial(Material);
    setIsEditing(false);
    await getMateriales();

    Swal.fire({
      icon: "success",
      title: "Actualizado!",
      text: `${Material.nombreMaterial}, actualizado.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (

    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Editar Materiales</h1>

        <label htmlFor="nombreMaterial">Nombre Material</label>
        <input
          id="nombreMaterial"
          placeholder="Ingrese nombre del material"
          type="text"
          name="nombreMaterial"
          value={nombreMaterial}
          onChange={(e) => setNombreMaterial(e.target.value)}
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
          onChange={(e) => setImagen(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Actualizar" />
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
