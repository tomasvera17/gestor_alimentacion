import React, { useState, useEffect } from 'react';
import FormularioRegistro from './components/FormularioRegistro';
import GraficosHabitos from './components/GraficoHabitos';
import RecetasSaludables from './components/RecetasSaludables';
import { MetaSemanal } from './components/MetaSemanal';

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
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-600 drop-shadow-lg">Control de Alimentación y Emociones</h1>
      <FormularioRegistro onAgregarEntrada={agregarEntrada} />
      <section className="max-w-md mx-auto mt-10 bg-white bg-opacity-80 rounded-xl p-6 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Entradas Registradas</h2>
        {entradas.length === 0 ? (
          <p className="text-center text-emerald-700">No hay entradas registradas aún.</p>
        ) : (
          <ul className="space-y-4">
            {entradas.map(({ id, comida, nivelSaciedad, estadoEmocional, fecha }) => (
              <li key={id} className="bg-emerald-100 p-4 rounded shadow">
                <p><strong>Comida:</strong> {comida}</p>
                <p><strong>Nivel de saciedad:</strong> {nivelSaciedad}</p>
                <p><strong>Estado emocional:</strong> {estadoEmocional}</p>
                <p className="text-sm text-emerald-700">{new Date(fecha).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <GraficosHabitos />
      <RecetasSaludables />
      <MetaSemanal />
    </div>
  );
};

export default App;