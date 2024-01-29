import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';
import { getAuth, deleteUser } from "firebase/auth";


const Dashboard = ({ setIsAuthenticated }) => {
  const [usuario, setUsuarios] = useState();
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "Usuario"));
    const usuario = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log(usuario)
    setUsuarios(usuario)
  }

  useEffect(() => {
    getUsuarios()
  }, []);

  const handleEdit = id => {
    //console.log(id)
    //console.log(usuario.filter(Usuario => usuario.id === id))
    const [Usuario] = usuario.filter(Usuario => Usuario.id === id);
    //console.log(Usuario)
    setSelectedUsuario(Usuario);
    setIsEditing(true);
  };

  const handleDelete = id => {
    console.log(typeof id)
    Swal.fire({
      icon: 'warning',
      title: 'Estas seguro que quieres eliminar este usuario?',
      text: "Esto no se puede revertir!",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then(async (result) => {
      if (result.value) {
        const [Usuario] = usuario.filter(Usuario => Usuario.id === id);
        console.log(Usuario)
        await deleteDoc(doc(db, "Usuario", Usuario.id))
        //console.log("prueba")

        getAuth().deleteUser(Usuario.id)

        /*
        await deleteUser(Usuario)
          .then(() => {
            console.log('Usuario eliminado con éxito.');
          })
          .catch((error) => {
            console.error('Error al eliminar el usuario:', error.message);
          });*/

        Swal.fire({
          icon: 'success',
          title: 'Registro Eliminado!',
          text: `Eliminado correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });
        const usuariosCopy = usuario.filter(usuario => usuario.id !== id);
        setUsuarios(usuariosCopy);
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
            usuario={usuario}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          usuario={usuario}
          setUsuarios={setUsuarios}
          setIsAdding={setIsAdding}
          getUsuarios={getUsuarios}
        />
      )}
      {isEditing && (
        <Edit
          usuario={usuario}
          selectedUsuario={selectedUsuario}
          setUsuarios={setUsuarios}
          setIsEditing={setIsEditing}
          getUsuarios={getUsuarios}
        />
      )}
    </div>
  );
};

export default Dashboard;
