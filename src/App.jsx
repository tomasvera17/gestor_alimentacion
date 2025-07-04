import React, { useState, useEffect } from 'react';
import FormularioRegistro from './components/FormularioRegistro';
import GraficosHabitos from './components/GraficoHabitos';
import Navegacion from './components/Navegacion';
import RecetasSaludables from './components/RecetasSaludables';
import { MetaSemanal } from './components/MetaSemanal';


const App = () => {
  const [entradas, setEntradas] = useState(() => {
    const datosGuardados = localStorage.getItem('entradas');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const [vistaActual, setVistaActual] = useState('formulario');

  useEffect(() => {
    localStorage.setItem('entradas', JSON.stringify(entradas));
  }, [entradas]);

  const agregarEntrada = (entrada) => {
    setEntradas((prevEntradas) => [entrada, ...prevEntradas]);
  };

  const renderizarVista = () => {
    if (vistaActual === 'formulario') {
      return (
        <>
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
        </>
      );
    } else if (vistaActual === 'graficos'){
      return <GraficosHabitos />;
    } else if (vistaActual === 'recetas'){
      return <RecetasSaludables />;
    } else if (vistaActual === 'meta') {
      return <MetaSemanal />;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to right bottom, #f0fdf4, #dcfce7)' }}>
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-600 drop-shadow-lg">
        Control de Alimentación y Emociones
      </h1>
      <Navegacion 
        vistaActual={vistaActual} 
        cambiarVista={setVistaActual}
      />
      <div className="container mx-auto">
        {renderizarVista()}
      </div>
    </div>
  );
};

export default App;
