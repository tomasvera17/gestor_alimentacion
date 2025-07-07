import { useState, useEffect } from 'react';

export const MetaSemanal = () => {
  const [goals, setGoals] = useState({
    azucar: 50,
    agua: 2,
    ejercicio: 3,
    vegetales: 3
  });

  const [progress, setProgress] = useState({
    azucar: 35,
    agua: 1,
    ejercicio: 2,
    vegetales: 2
  });


  // Configuración de métricas
  const metricsConfig = [
    { 
      key: 'azucar',
      title: 'Reducción azúcar', 
      icon: '🍬',
      desc: 'Objetivo diario máximo',
      color: 'red',
      unit: '%',
      min: 0,
      max: 100,
      step: 1,
      inverse: false 
    },
    {
      key: 'agua',
      title: 'Agua diaria',
      icon: '💧',
      desc: 'Recomendación OMS',
      color: 'blue',
      unit: 'L',
      min: 1,
      max: 5,
      step: 1,
      inverse: false
    },
    { 
      key: 'ejercicio',
      title: 'Ejercicio semanal', 
      icon: '🏋️',
      desc: 'Sesiones de 30 min.',
      color: 'green',
      unit: ' sesiones',
      min: 0,
      max: 7,
      step: 1,
      inverse: false
    },
    { 
      key: 'vegetales',
      title: 'Vegetales diarios', 
      icon: '🥦',
      desc: 'Raciones de 80g',
      color: 'yellow',
      unit: ' raciones',
      min: 0,
      max: 8,
      step: 1,
      inverse: false
    }
  ];

  // Calcular porcentaje de progreso
  const calculateProgress = (metric) => {
    const goal = goals[metric.key];
    const current = progress[metric.key];

    if (metric.inverse) {
      if (current <= goal) return 100;
      if (current >= metric.max) return 0;
      const range = metric.max - goal;
      if (range === 0) return 0;
      const progressValue = ((metric.max - current) / range) * 100;
      return Math.max(0, Math.min(100, progressValue));
    } else {
      if (current >= goal) return 100;
      if (goal === 0) return 0;
      const progressValue = (current / goal) * 100;
      return Math.max(0, Math.min(100, progressValue));
    }
  };

  // Obtener color del progreso
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  // Obtener colores por tipo de métrica
  const getMetricColors = (color) => {
    const colorMap = {
      red: { 
        bg: 'bg-red-50 border-red-200', 
        text: 'text-red-800', 
        accent: 'text-red-600',
        gradient: 'bg-gradient-to-r from-red-400 to-red-600',
        light: 'bg-red-100'
      },
      blue: { 
        bg: 'bg-blue-50 border-blue-200', 
        text: 'text-blue-800', 
        accent: 'text-blue-600',
        gradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
        light: 'bg-blue-100'
      },
      green: { 
        bg: 'bg-green-50 border-green-200', 
        text: 'text-green-800', 
        accent: 'text-green-600',
        gradient: 'bg-gradient-to-r from-green-400 to-green-600',
        light: 'bg-green-100'
      },
      yellow: { 
        bg: 'bg-amber-50 border-amber-200', 
        text: 'text-amber-800', 
        accent: 'text-amber-600',
        gradient: 'bg-gradient-to-r from-amber-400 to-amber-600',
        light: 'bg-amber-100'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  // Actualizar objetivo
  const updateGoal = (key, value) => {
    setGoals(prev => ({ ...prev, [key]: Math.round(value) }));
  };

  // Actualizar progreso
  const updateProgress = (key, value) => {
    setProgress(prev => ({ ...prev, [key]: Math.round(value) }));
  };



  // Calcular progreso general
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const newOverallProgress = metricsConfig.reduce((acc, metric) => 
      acc + calculateProgress(metric), 0) / metricsConfig.length;
    setOverallProgress(newOverallProgress);
  }, [goals, progress]);

  return (
    <div className="max-w-full mx-auto mt-10 p-4 bg-white rounded-xl shadow-xl">
      {/* Header con progreso general */}
      <div className="mb-8 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600 transition-all duration-1000 ease-out"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${overallProgress}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{Math.round(overallProgress)}%</div>
                <div className="text-xs text-gray-500">Progreso</div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Planificación Nutricional
        </h2>
        <p className="text-gray-600 text-lg">Establece y monitorea tus objetivos semanales</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Panel de métricas */}
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metricsConfig.map((metric) => {
              const colors = getMetricColors(metric.color);
              const progressPercent = calculateProgress(metric);
              const progressColors = getProgressColor(progressPercent);
              
              return (
                <div 
                  key={metric.key}
                  className={`${colors.bg} border-2 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer min-h-[200px] flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                        {metric.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-700 text-sm">{metric.title}</div>
                        <div className={`${colors.text} text-2xl font-bold`}>
                          {goals[metric.key]}{metric.unit}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${progressColors}`}>
                      {Math.round(progressPercent)}%
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Actual: {progress[metric.key]}{metric.unit}</span>
                      <span>Meta: {goals[metric.key]}{metric.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${colors.gradient} transition-all duration-1000 ease-out rounded-full`}
                        style={{ width: `${Math.round(Math.max(0, Math.min(100, progressPercent)))}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 opacity-75 group-hover:opacity-100 transition-opacity">
                    {metric.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen estadístico */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📊</span>
              Análisis Semanal
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metricsConfig.map((metric) => {
                const progressPercent = calculateProgress(metric);
                const colors = getMetricColors(metric.color);
                
                return (
                  <div key={metric.key} className="text-center p-3 rounded-xl bg-gray-50">
                    <div className={`${colors.accent} text-lg font-bold`}>
                      {Math.round(progressPercent)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{metric.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel de controles */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <span>🎯</span>
              Ajustar Objetivos
            </h3>
            
            <div className="space-y-8">
              {metricsConfig.map((metric) => {
                const colors = getMetricColors(metric.color);
                
                return (
                  <div key={metric.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span>{metric.icon}</span>
                        {metric.title} (Meta)
                      </label>
                      <span className={`text-lg font-bold ${colors.accent} bg-gray-100 px-3 py-1 rounded-lg`}>
                        {goals[metric.key]}{metric.unit}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                        value={goals[metric.key]}
                        onChange={(e) => updateGoal(metric.key, parseFloat(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider transition-all duration-200 hover:h-4"
                        style={{
                          background: `linear-gradient(to right, ${colors.gradient.replace('bg-gradient-to-r', '').replace('from-', '').replace('to-', '').split(' ')[0]} 0%, ${colors.gradient.replace('bg-gradient-to-r', '').replace('from-', '').replace('to-', '').split(' ')[1]} ${(goals[metric.key] - metric.min) / (metric.max - metric.min) * 100}%, #e5e7eb ${(goals[metric.key] - metric.min) / (metric.max - metric.min) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{metric.min}{metric.unit}</span>
                        <span>{metric.max}{metric.unit}</span>
                      </div>
                    </div>

                    {/* New Progress Input */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <label className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        <span>{metric.icon}</span>
                        {metric.title} (Actual)
                      </label>
                      <input
                        type="number"
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                        value={progress[metric.key]}
                        onChange={(e) => updateProgress(metric.key, parseFloat(e.target.value))}
                        className="w-auto min-w-[6rem] p-2 border border-gray-300 rounded-lg text-center text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panel de consejos */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>💡</span>
              Consejo del Día
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-blue-600">Hidratación:</strong> Bebe un vaso de agua 30 minutos antes de cada comida para mejorar la digestión y controlar el apetito.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-green-600">Ejercicio:</strong> Divide tu actividad física en sesiones cortas de 10 minutos a lo largo del día si no tienes tiempo para entrenamientos largos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};