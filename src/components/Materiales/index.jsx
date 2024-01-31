import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';



const Materiales = ({ setIsAuthenticated }) => {
  
  const [material, setMaterial] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getMateriales = async () => {
    const querySnapshot = await getDocs(collection(db, "Materiales"));
    const material = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log(material)
    setMaterial(material)
  }

  useEffect(() => {
    getMateriales()
  }, []);

  const handleEdit = id => {
    const [Material] = material.filter(Material => Material.id === id);
    setSelectedMaterial(Material);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Deseas eliminar este material?',
      text: "Esta acción no se puede revertir!",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then(async (result) => {
      if (result.value) {
        const [Material] = material.filter(material => material.id === id);
        console.log(Material)
        await deleteDoc(doc(db, "Materiales", Material.id))
        Swal.fire({
          position: "top-end",
          icon: 'success',
          title: 'Material Eliminado!',
          text: `Eliminado correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });

        const materialCopy = material.filter(material => material.id !== id);
        setMaterial(materialCopy);
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
            material={material}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          material={material}
          setMaterial={setMaterial}
          setIsAdding={setIsAdding}
          getMateriales={getMateriales}
        />
      )}
      {isEditing && (
        <Edit
          material={material}
          selectedMaterial={selectedMaterial}
          setMaterial={setMaterial}
          setIsEditing={setIsEditing}
          getMateriales={getMateriales}
        />
      )}
    </div>
  );
};

export default Materiales;
