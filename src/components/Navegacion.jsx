import React from 'react';
import PropTypes from 'prop-types';

const Navegacion = ({ vistaActual, cambiarVista }) => {
  return (
    <nav className="bg-white bg-opacity-80 p-4 rounded-xl shadow-2xl mb-8">
      <ul className="flex justify-center space-x-4">
        <li>
          <button
            onClick={() => cambiarVista('formulario')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer ${
              vistaActual === 'formulario'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            Registro de Comidas y Emociones
          </button>
        </li>
        <li>
          <button
            onClick={() => cambiarVista('graficos')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer ${
              vistaActual === 'graficos'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            Gráficos de Hábitos Semanales
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navegacion.propTypes = {
  vistaActual: PropTypes.string.isRequired,
  cambiarVista: PropTypes.func.isRequired,
};

export default Navegacion;