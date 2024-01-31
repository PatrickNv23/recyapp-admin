import { useState } from "react";
import Swal from "sweetalert2";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firestore";



const Add = ({ Recompensa, setRecompensas, setIsAdding, getRecompensas }) => {
  const [nombreRecompensa, setnombreRecompensa] = useState("");
  const [valorRecompensa, setValorRecompensa] = useState("");
  const [imagenurlRecompensa, setImagenUrlRecompensa] = useState("");


  const handleAdd = async (e) => {
    e.preventDefault();

    if (!nombreRecompensa || !valorRecompensa || !imagenurlRecompensa) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Todos los campos son requeridos",
        showConfirmButton: true,
      });
    }

    const newRecompensa = {
      nombreRecompensa,
      valorRecompensa: parseInt(valorRecompensa, 10),
      imagenurlRecompensa,
    };
  
    const recompensasColection = collection(db, "Recompensas");
    // Crear una referencia con el ID especificado
    const nuevoDocumentoRef = doc(recompensasColection);
    // Establecer los datos del documento
    setDoc(nuevoDocumentoRef, {
      ...newRecompensa,
    })
    

    Recompensa.push(newRecompensa);
    setRecompensas(Recompensa);
    setIsAdding(false);
    await getRecompensas();

    Swal.fire({
      icon: "success",
      title: "agregado!",
      text: `agregado exitosamente`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Registrar Recompensa</h1>
        <label htmlFor="nombreRecompensa">Nombre Recompensa</label>
        <input
          id="nombreRecompensa"
          placeholder="Ingrese nombre de la recompensa"
          type="text"
          name="nombreRecompensa"
          value={nombreRecompensa}
          onChange={(e) => setnombreRecompensa(e.target.value)}
        />
        <label htmlFor="valorRecompensa">Valor de la Recompensa</label>
        <input
          id="valorRecompensa"
          type="number"
          placeholder="Ingrese el valor de la Recompensa"
          name="valorRecompensa"
          value={valorRecompensa}
          onChange={(e) => setValorRecompensa(e.target.value)}
        />
        <label htmlFor="imagenurlRecompensa">Ingrese la imagen url de la recompensa</label>
        <input
          id="imagenurlRecompensa"
          type="text"
          placeholder="Ingrese la imagen url de la recompensa"
          name="imagenurlRecompensa"
          value={imagenurlRecompensa}
          onChange={(e) => setImagenUrlRecompensa(e.target.value)}
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