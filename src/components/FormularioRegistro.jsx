import React, { useEffect, useState } from 'react';

const FormularioRegistro = ({ onAgregarEntrada, entradaEditada, onActualizarEntrada, onCancelarEdicion}) => {
  const [comida, setComida] = useState('');
  const [nivelSaciedad, setNivelSaciedad] = useState('');
  const [estadoEmocional, setEstadoEmocional] = useState('');

  useEffect(() => {
    if (entradaEditada) {
      setComida(entradaEditada.comida);
      setNivelSaciedad(entradaEditada.nivelSaciedad);
      setEstadoEmocional(entradaEditada.estadoEmocional);
    } else {
      setComida('');
      setNivelSaciedad('');
      setEstadoEmocional('');
    }
  }, [entradaEditada]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!comida || !nivelSaciedad || !estadoEmocional) return;

    if (entradaEditada) {
      const entradaActualizada = {
        ...entradaEditada,
        comida,
        nivelSaciedad,
        estadoEmocional,
      };
      onActualizarEntrada(entradaActualizada);
    } else {
      const nuevaEntrada = {
        id: Date.now(),
        comida,
        nivelSaciedad,
        estadoEmocional,
        fecha: new Date().toISOString(),
      };
      onAgregarEntrada(nuevaEntrada);
    }
    setComida('');
    setNivelSaciedad('');
    setEstadoEmocional('');
  };

  return (
    <form onSubmit={manejarEnvio} className="p-6 bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-200 rounded-lg shadow-2xl max-w-md mx-auto text-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center drop-shadow-md">{entradaEditada ? 'Editar Entrada' : 'Registrar Comida y Emociones'}</h2>

      <label className="block mb-3 font-semibold" htmlFor="comida">Comida consumida</label>
      <input
        id="comida"
        type="text"
        value={comida}
        onChange={(e) => setComida(e.target.value)}
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ejemplo: Pasta, arroz, ensalada, etc."
        required
      />

      <label className="block mb-2 font-semibold" htmlFor="nivelSaciedad">Nivel de saciedad</label>
      <select
        id="nivelSaciedad"
        value={nivelSaciedad}
        onChange={(e) => setNivelSaciedad(e.target.value)}
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        required
      >
        <option value="">Selecciona un nivel</option>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>

      <label className="block mb-2 font-semibold" htmlFor="estadoEmocional">Estado emocional</label>
      <select
        id="estadoEmocional"
        value={estadoEmocional}
        onChange={(e) => setEstadoEmocional(e.target.value)}
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        required
      >
        <option value="">Selecciona un estado</option>
        <option value="feliz">Feliz</option>
        <option value="neutral">Neutral</option>
        <option value="triste">Triste</option>
        <option value="estresado">Estresado/a</option>
      </select>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="w-full bg-stone-800 hover:bg-emerald-400 text-white py-3 rounded-md shadow-lg transition duration-300"
        >
          {entradaEditada ? 'Actualizar entrada' : 'Agregar entrada'}
        </button>
        {entradaEditada && (
          <button 
            type="button"
            onClick={onCancelarEdicion}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md shadow-lg transition duration-300"
            >
              Cancelar
            </button>
        )}
      </div>
    </form>
  );
};

export default FormularioRegistro;