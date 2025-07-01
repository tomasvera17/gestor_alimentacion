import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const GraficosHabitos = () => {
  const [entradasSemana, setEntradasSemana] = useState([]);
  useEffect(() => {
    try {
      const datosGuardados = localStorage.getItem('entradas');
      const entradas = datosGuardados ? JSON.parse(datosGuardados) : [];
      const hoy = new Date();
      const haceSieteDias = new Date();
      haceSieteDias.setDate(hoy.getDate() - 7);
      const entradasFiltradas = entradas.filter((entrada) => {
        const fechaEntrada = new Date(entrada.fecha);
        return fechaEntrada >= haceSieteDias && fechaEntrada <= hoy;
      });
      setEntradasSemana(entradasFiltradas);
    } catch (error) {
      console.error('Error al leer los datos del localStorage:', error);
      setEntradasSemana([]);
    }
  }, []);
  // Mapeo de niveles de saciedad a valores numéricos (1-3)
  const mapaSaciedad = {
    bajo: 1,
    medio: 2,
    alto: 3,
  };
  // Mapeo de estados emocionales a valores numéricos (1-4)
  const mapaEmociones = {
    triste: 1,
    estresado: 2,
    neutral: 3,
    feliz: 4,
  };
  // Inicializar estructura para los últimos 7 días
  const dias = [];
  const saciedadPorDia = {};
  const emocionesPorDia = {};
  // Crear array de los últimos 7 días
  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const fechaStr = dia.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    dias.push(fechaStr);
    saciedadPorDia[fechaStr] = [];
    emocionesPorDia[fechaStr] = [];
  }
  // Agrupar valores por día
  entradasSemana.forEach((entrada) => {
    const fecha = new Date(entrada.fecha);
    const fechaStr = fecha.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    if (fechaStr in saciedadPorDia) {
      saciedadPorDia[fechaStr].push(mapaSaciedad[entrada.nivelSaciedad] || 0);
      emocionesPorDia[fechaStr].push(mapaEmociones[entrada.estadoEmocional] || 0);
    }
  });
  // Calcular promedios diarios
  const promediosSaciedad = dias.map(dia => {
    const valores = saciedadPorDia[dia];
    return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  });
  const promediosEmociones = dias.map(dia => {
    const valores = emocionesPorDia[dia];
    return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  });
  //Datos para gráfico de saciedad
  const dataSaciedad = {
    labels: dias,
    datasets: [
      {
        label: 'Nivel de Saciedad Promedio',
        data: promediosSaciedad,
        backgroundColor: '#60a5fa',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };
  // Datos para gráfico de emociones
  const dataEmociones = {
    labels: dias,
    datasets: [
      {
        label: 'Estado Emocional Promedio',
        data: promediosEmociones,
        backgroundColor: promediosEmociones.map(valor => {
          if (valor >= 3.5) return '#4ade80'; // feliz
          if (valor >= 2.5) return '#facc15'; // neutral
          if (valor >= 1.5) return '#f97316'; // estresado
          return '#ef4444'; // triste
        }),
        borderColor: '#374151',
        borderWidth: 1,
      },
    ],
  };
  // Opciones para el grafico de saciedad
  const opcionesSaciedad = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return ['', 'Bajo', 'Medio', 'Alto'][value] || '';
          }
        }
      }
    }
  };
  // Opciones para el gráfico de emociones
  const opcionesEmociones = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return ['', 'Triste', 'Estresado', 'Neutral', 'Feliz'][value] || '';
          }
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Resumen Semanal de Hábitos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80">
          <h3 className="text-xl font-semibold mb-2">Promedio Diario de Saciedad</h3>
          <Bar data={dataSaciedad} options={opcionesSaciedad} />
        </div>
        <div className="h-80">
          <h3 className="text-xl font-semibold mb-2">Promedio Diario de Estado Emocional</h3>
          <Bar data={dataEmociones} options={opcionesEmociones} />
        </div>
      </div>
    </div>
  );
};

export default GraficosHabitos;