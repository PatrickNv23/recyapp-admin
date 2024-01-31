import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';



const Recompensas = ({ setIsAuthenticated }) => {
  const [recompensa, setRecompensa] = useState();
  const [selectedRecompensa, setSelectedRecompensa] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getRecompensas = async () => {
    const querySnapshot = await getDocs(collection(db, "Recompensas"));
    const recompensa = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log(recompensa)
    setRecompensa(recompensa)
  }

  useEffect(() => {
    getRecompensas()
  }, []);

  const handleEdit = id => {
    const [Recompensa] = recompensa.filter(Recompensa => Recompensa.id === id);
    setSelectedRecompensa(Recompensa);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Deseas eliminar esta recompensa?',
      text: "Esta acción no se puede revertir!",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then(async (result) => {
      if (result.value) {
        const [Recompensa] = recompensa.filter(recompensa => recompensa.id === id);
        console.log(Recompensa)
        await deleteDoc(doc(db, "Recompensas", Recompensa.id))
        Swal.fire({
          position: "top-end",
          icon: 'success',
          title: 'Recompensa Eliminada!',
          text: `Eliminado correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });

        const recompensaCopy = recompensa.filter(recompensa => recompensa.id !== id);
        setRecompensa(recompensaCopy);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Eliminación cancelada',
          text: 'Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            recompensa={recompensa}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          recompensa={recompensa}
          setMaterial={setRecompensa}
          setIsAdding={setIsAdding}
          getRecompensas={getRecompensas}
        />
      )}
      {isEditing && (
        <Edit
          recompensa={recompensa}
          selectedRecompensa={selectedRecompensa}
          setRecompensa={setRecompensa}
          setIsEditing={setIsEditing}
          getRecompensas={getRecompensas}
        />
      )}
    </div>
  );
};

export default Recompensas;
