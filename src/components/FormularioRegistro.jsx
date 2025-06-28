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
    <form onSubmit={manejarEnvio} className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Registrar comida y emociones</h2>

      <label className="block mb-2 font-medium" htmlFor="comida">Comida consumida</label>
      <input
        id="comida"
        type="text"
        value={comida}
        onChange={(e) => setComida(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Ejemplo: Pasta, arroz, ensalada, etc."
        required
      />

      <label className="block mb-2 font-medium" htmlFor="nivelSaciedad">Nivel de saciedad</label>
      <select
        id="nivelSaciedad"
        value={nivelSaciedad}
        onChange={(e) => setNivelSaciedad(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      >
        <option value="">Selecciona un nivel</option>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>

      <label className="block mb-2 font-medium" htmlFor="estadoEmocional">Estado emocional</label>
      <select
        id="estadoEmocional"
        value={estadoEmocional}
        onChange={(e) => setEstadoEmocional(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
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
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Agregar entrada
      </button>
    </form>
  );
};

export default FormularioRegistro;