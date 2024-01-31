import React from 'react';

const Table = ({ material, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Material</th>
            <th>Valor</th>
            <th className="text-center">Imagen</th>
            <th colSpan={2} className="text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {material ? (
            material.map((Material, i) => (
              <tr key={Material.id}>
                <td>{Material.nombreMaterial}</td>
                <td>{Material.valorMaterial}</td>
                <td className="text-center">
                  <img src={Material.imagenurlMaterial} alt={Material.nombreMaterial} style={{ width: '75px', height: '75px' }} />
                  </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Material.id)}
                    className="button edit-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Material.id)}
                    className="button delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay Materiales</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
