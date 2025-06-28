import React, { useState } from 'react';

const FormularioRegistro = ({ onAgregarEntrada }) => {
  const [comida, setComida] = useState('');
  const [nivelSaciedad, setNivelSaciedad] = useState('');
  const [estadoEmocional, setEstadoEmocional] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!comida || !nivelSaciedad || !estadoEmocional) return;

    const nuevaEntrada = {
      id: Date.now(),
      comida,
      nivelSaciedad,
      estadoEmocional,
      fecha: new Date().toISOString(),
    };

    onAgregarEntrada(nuevaEntrada);
    setComida('');
    setNivelSaciedad('');
    setEstadoEmocional('');
  };

  return (
    <form onSubmit={manejarEnvio} className="p-6 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-lg shadow-lg max-w-md mx-auto text-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center drop-shadow-md">Registrar Comida y Emociones</h2>

      <label className="block mb-3 font-semibold" htmlFor="comida">Comida consumida</label>
      <input
        id="comida"
        type="text"
        value={comida}
        onChange={(e) => setComida(e.target.value)}
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder="Ejemplo: Pasta, arroz, ensalada, etc."
        required
      />

      <label className="block mb-2 font-semibold" htmlFor="nivelSaciedad">Nivel de saciedad</label>
      <select
        id="nivelSaciedad"
        value={nivelSaciedad}
        onChange={(e) => setNivelSaciedad(e.target.value)}
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
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
        className="w-full p-3 rounded-md mb-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
        required
      >
        <option value="">Selecciona un estado</option>
        <option value="feliz">Feliz</option>
        <option value="neutral">Neutral</option>
        <option value="triste">Triste</option>
        <option value="estresado">Estresado/a</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md shadow-md transition duration-300"
      >
        Agregar entrada
      </button>
    </form>
  );
};

export default FormularioRegistro;