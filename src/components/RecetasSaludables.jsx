import React, { useEffect, useState } from 'react';

const RecetasSaludables = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Vegetarian');
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Categorías permitidas para filtro
  const categoriasPermitidas = ['Vegetarian', 'Vegan', 'Starter', 'Seafood', 'Lamb', 'Miscellaneous', 'Beef'];

  // Obtener lista de categorías
  const obtenerCategorias = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await res.json();
      if (data.meals) {
        // Filtrar solo las categorías permitidas
        const categoriasFiltradas = data.meals
          .map(cat => cat.strCategory)
          .filter(cat => categoriasPermitidas.includes(cat));
        setCategorias(categoriasFiltradas);
      }
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  };

  // Obtener recetas por categoría
  const obtenerRecetasPorCategoria = async (categoria) => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
      const data = await res.json();
      if (data.meals) {
        const detalles = await Promise.all(
          data.meals.slice(0, 6).map(async (receta) => {
            const detalleRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receta.idMeal}`);
            const detalleData = await detalleRes.json();
            return detalleData.meals[0];
          })
        );
        setRecetas(detalles);
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
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      obtenerRecetasPorCategoria(categoriaSeleccionada);
    }
  }, [categoriaSeleccionada]);

  if (cargando) {
    return <p className="text-center text-gray-600">Cargando recetas saludables...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 rounded-xl shadow-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-700">Recetas Saludables Recomendadas</h2>

      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
              categoriaSeleccionada === cat
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-emerald-200 text-emerald-800 hover:bg-emerald-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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