import React from 'react';

const Table = ({ usuario, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Puntos</th>
            <th colSpan={2} className="text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {usuario ? (
            usuario.map((Usuario, i) => (
              <tr key={Usuario.id}>
                <td>{Usuario.id}</td>
                <td>{Usuario.nombrecompleto}</td>
                <td>{Usuario.usuario}</td>
                <td>{Usuario.correo}</td>
                <td>{Usuario.contrasenia} </td>
                <td>{Usuario.puntos} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Usuario.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Usuario.id)}
                    className="button muted-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
