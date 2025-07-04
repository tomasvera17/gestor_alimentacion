import React, { useEffect, useState } from 'react';

const RecetasSaludables = () => {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener recetas saludables
  const obtenerRecetas = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian');
      const datos = await respuesta.json();

      if (datos.meals) {
        const detallesRecetas = await Promise.all(
          datos.meals.slice(0, 6).map(async (receta) => {
            const detalleRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receta.idMeal}`);
            const detalleData = await detalleRes.json();
            return detalleData.meals[0];
          })
        );
        setRecetas(detallesRecetas);
      } else {
        setRecetas([]);
      }
    } catch (err) {
      setError('Error al obtener las recetas.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRecetas();
  }, []);

  if (cargando) {
    return <p className="text-center text-gray-600">Cargando recetas saludables...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-xl shadow-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-700">Recetas Saludables Recomendadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recetas.map((receta) => (
          <div key={receta.idMeal} className="bg-emerald-100 rounded-lg shadow p-4 flex flex-col">
            <img
              src={receta.strMealThumb}
              alt={receta.strMeal}
              className="rounded-md mb-4 object-cover h-40 w-full"
            />
            <h3 className="text-lg font-semibold mb-2">{receta.strMeal}</h3>
            <a
              href={receta.strSource && receta.strSource !== '' ? receta.strSource : receta.strYoutube && receta.strYoutube !== '' ? receta.strYoutube : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-emerald-600 hover:text-emerald-800 font-semibold"
            >
              Ver receta completa
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecetasSaludables;

