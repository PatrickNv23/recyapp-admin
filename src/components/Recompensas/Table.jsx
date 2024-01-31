const Table = ({ recompensa, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Recompensa</th>
            <th>Valor</th>
            <th className="text-center">Imagen</th>
            <th colSpan={2} className="text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {recompensa ? (
            recompensa.map((Recompensa, i) => (
              <tr key={Recompensa.id}>
                <td>{Recompensa.nombreRecompensa}</td>
                <td>{Recompensa.valorRecompensa}</td>
                <td className="text-center">
                  <img src={Recompensa.imagenurlRecompensa} alt={Recompensa.nombreRecompensa} style={{ width: '75px', height: '75px' }} />
                  </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Recompensa.id)}
                    className="button edit-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Recompensa.id)}
                    className="button delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay Recompensas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
