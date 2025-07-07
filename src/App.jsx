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

  // Estado para la entrada que se está editando
  const [entradaEditada, setEntradaEditada] = useState(null);

  useEffect(() => {
    localStorage.setItem('entradas', JSON.stringify(entradas));
  }, [entradas]);

  const agregarEntrada = (entrada) => {
    setEntradas((prevEntradas) => [entrada, ...prevEntradas]);
  };

    // Función para eliminar una entrada
  const eliminarEntrada = (id) => {
    setEntradas((prevEntradas) => prevEntradas.filter((entrada) => entrada.id !== id));
    // Si la entrada editada es la que se elimina, cancelar edición
    if (entradaEditada && entradaEditada.id === id) {
      setEntradaEditada(null);
    }
  };

  // Función para iniciar la edición de una entrada
  const iniciarEdicion = (entrada) => {
    setEntradaEditada(entrada);
    setVistaActual('formulario'); // Asegura que la vista sea el formulario
  };

  // Función para actualizar una entrada
  const actualizarEntrada = (entradaActualizada) => {
    setEntradas((prevEntradas) =>
      prevEntradas.map((entrada) =>
        entrada.id === entradaActualizada.id ? entradaActualizada : entrada
      )
    );
    setEntradaEditada(null);
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setEntradaEditada(null);
  };

  const renderizarVista = () => {
    if (vistaActual === 'formulario') {
      return (
        <>
          <FormularioRegistro onAgregarEntrada={agregarEntrada} entradaEditada= {entradaEditada} onActualizarEntrada={actualizarEntrada} onCancelarEdicion={cancelarEdicion} />
          <section className="max-w-md mx-auto mt-10 bg-white bg-opacity-80 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Entradas Registradas</h2>
            {entradas.length === 0 ? (
              <p className="text-center text-emerald-700">No hay entradas registradas aún.</p>
            ) : (
              <ul className="space-y-4">
                {entradas.map(({ id, comida, nivelSaciedad, estadoEmocional, fecha }) => (
                  <li key={id} className="bg-emerald-100 p-4 rounded shadow">
                    <div>
                      <p><strong>Comida:</strong> {comida}</p>
                      <p><strong>Nivel de saciedad:</strong> {nivelSaciedad}</p>
                      <p><strong>Estado emocional:</strong> {estadoEmocional}</p>
                      <p className="text-sm text-emerald-700">{new Date(fecha).toLocaleString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => iniciarEdicion({ id, comida, nivelSaciedad, estadoEmocional, fecha })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded shadow transition duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarEntrada(id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow transition duration-300"
                      >
                        Eliminar
                      </button>
                    </div>
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
