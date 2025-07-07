# Gestor de Alimentación Consciente

Una aplicación web diseñada para promover hábitos alimenticios saludables mediante el seguimiento nutricional y emocional, recomendación de recetas saludables, y análisis de progreso semanal.


## Funcionalidades

- **Formulario de Registro de Comidas y Emociones:** Formulario que permite registar los **alimentos, nivel de saciedad, y estado emocional** del usuario.
- **Gráficos de Hábitos Alimenticios:** Gráficos que representan los hábitos alimenticios del usuario en la semana. Se observa el promedio del nivel de saciedad y estado emocional por cada día transcurrido.
- **Panel de Recestas Recomendadas:** Sección donde se muestran distintos tipos de recetas recomendadas para el usuario, cada receta tiene un enlace adjunto que llevara al usuario a otra página donde podrá ver la receta completa. Toda esta información se extrae desde la api **TheMealDB** que es una api gratuita de recetas y base de datos.
- **Panel de Meta Semanal:** Panel donde el usuario puede definir sus metas semanales de **reducción de azúcar, consumo de agua diaria, sesiones de ejercicio semanales, y raciones de vegetales diarias**, además se mostrará un resumen semanal de dichos objetivos, y un apartado de consejos diarios.
- **Interfaz de Usuario Responsiva:** La página esta diseñada para adaptarse a diferentes tamaños de pantalla.

## Tecnologías

- **Frontend:**
    - React
    - Vite
    - Tailwind CSS
    - Chart.js
    - React Chart.js 2
- **Almacenamiento:** Local Storage (almacenamiento de los registros del formulario).
- **API:** TheMealDB (información de recetas).
    


## API Utilizada

- **TheMealDB** (https://www.themealdb.com/api.php): Es una API pública con más de 300 recetas.
- **Endpoints usados en el proyecto:**
    - **`https://www.themealdb.com/api/json/v1/1/list.php?c=list`**: Obtener la lista de categorias de comidas.
    - **`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`**: Filtrar recetas por una categoria especifica dentro de nuestras categorias permitidas. 
    - **`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receta.idMeal}`**: Obtener detalles completos de una receta por su ID.




