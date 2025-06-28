import React, { useState, useEffect } from 'react';
import FormularioRegistro from './components/FormularioRegistro';

const App = () => {
  const [entradas, setEntradas] = useState(() => {
    const datosGuardados = localStorage.getItem('entradas');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('entradas', JSON.stringify(entradas));
  }, [entradas]);

  const agregarEntrada = (entrada) => {
    setEntradas((prevEntradas) => [entrada, ...prevEntradas]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Control de Alimentación y Emociones</h1>
      <FormularioRegistro onAgregarEntrada={agregarEntrada} />
      <section className="max-w-md mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Entradas registradas</h2>
        {entradas.length === 0 ? (
          <p className="text-center text-gray-500">No hay entradas registradas aún.</p>
        ) : (
          <ul className="space-y-4">
            {entradas.map(({ id, comida, nivelSaciedad, estadoEmocional, fecha }) => (
              <li key={id} className="bg-white p-4 rounded shadow">
                <p><strong>Comida:</strong> {comida}</p>
                <p><strong>Nivel de saciedad:</strong> {nivelSaciedad}</p>
                <p><strong>Estado emocional:</strong> {estadoEmocional}</p>
                <p className="text-sm text-gray-400">{new Date(fecha).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default App;
