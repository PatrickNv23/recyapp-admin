import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({ Recompensa, selectedRecompensa,setRecompensa, setIsEditing, getRecompensas, }) => {

  const id = selectedRecompensa.id;
  const [nombreRecompensa, setNombreRecompesa] = useState(selectedRecompensa.nombreRecompensa);
  const [valorRecompensa, setValorRecompensa] = useState(selectedRecompensa.valorRecompensa);
  const [imagenurlRecompensa, setImagen] = useState(selectedRecompensa.imagenUrlRecompensa);


  useEffect(() => {
    console.log(selectedRecompensa)
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!nombreRecompensa || !valorRecompensa || !imagenurlRecompensa) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Los siguientes campos son requeridos.",
        showConfirmButton: true,
      });
    }

    const Recompensa = {
      id,
      nombreRecompensa,
      valorRecompensa: parseInt(valorRecompensa, 10),
      imagenurlRecompensa,
    };

    await setDoc(doc(db, "Recompensas", id), {
      ...Recompensa
    });

    setRecompensa(Recompensa);
    setIsEditing(false);
    await getRecompensas();

    Swal.fire({
      icon: "success",
      title: "Actualizado!",
      text: `${Recompensa.nombreRecompensa}, actualizado.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (

    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Editar Materiales</h1>

        <label htmlFor="nombreRecompensa">Nombre Material</label>
        <input
          id="nombreRecompensa"
          placeholder="Ingrese nombre de la recompensa"
          type="text"
          name="nombreRecompensa"
          value={nombreRecompensa}
          onChange={(e) => setNombreRecompesa(e.target.value)}
        />

        <label htmlFor="valorRecompensa">Valor del Material</label>
        <input
          id="valorRecompensa"
          type="number"
          placeholder="Ingrese el valor de la recompensa"
          name="valorRecompensa"
          value={valorRecompensa}
          onChange={(e) => setValorRecompensa(e.target.value)}
        />
        <label htmlFor="imagenUrlRecompensa">Ingrese la imagen url del material</label>

        <input
          id="imagenUrlRecompensa"
          type="text"
          placeholder="Ingrese la imagen url de la recompensa"
          name="imagenUrlRecompensa"
          value={imagenurlRecompensa}
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
