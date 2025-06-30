# Agregar la información de ramas y variables de entorno al README

## 🛒 React E-commerce

Este proyecto es una tienda en línea desarrollada con React que permite a los usuarios explorar productos, añadirlos al carrito y simular una compra. Fue creado como práctica de desarrollo frontend con componentes reutilizables, manejo de rutas, hooks de React y almacenamiento local.

## 🚀 Características principales

- Vista de productos
- Detalles individuales de cada producto
- Carrito de compras con contador de productos
- Persistencia del carrito con `localStorage`
- Navegación mediante `React Router`
- UI responsive con TailwindCSS
- Simulación de proceso de compra

## 🛠️ Tecnologías utilizadas

- **React** (con Vite)
- **React Router DOM** – para el manejo de rutas
- **TailwindCSS** – para los estilos
- **localStorage** – para guardar el estado del carrito
- **Hooks de React** – useState, useEffect, useContext

## 🤖 Herramientas de IA utilizadas y desafíos

Durante el desarrollo de este proyecto, dado que no tenía conocimientos previos de la sintaxis de React, las herramientas de Inteligencia Artificial fueron absolutamente fundamentales. Actuaron como un copiloto constante, acelerando tanto el proceso de aprendizaje como la resolución de problemas en cada etapa:

### 🛠️ ¿Cómo se utilizaron las herramientas de IA?

* **Generación de componentes y lógica básica:** Al no familiarizarme con la sintaxis de React, utilicé la IA para generar fragmentos de código. Esto incluyó cómo iniciar un `useState` para gestionar el estado de un componente, cómo emplear `useEffect` para cargar datos al montar un componente, o la estructura de un componente funcional básico. Esto me permitió comprender rápidamente la estructura fundamental y el flujo de trabajo de React.

* **Depuración y explicación de errores:** Cuando me encontraba con errores en la consola, solía copiar y pegar el mensaje de error en la herramienta de IA. Esta me proporcionaba explicaciones claras sobre la causa del problema y sugerencias precisas para corregirlo, lo que fue crucial para avanzar sin caer en la frustración.

* **Refactorización y transformación de código:** A medida que mi comprensión de React crecía, me apoyé en la IA para refactorizar y mejorar secciones de código. Por ejemplo, me ayudó a reestructurar componentes para usar el Context API en lugar de pasar props de forma manual, optimizando la legibilidad y la mantenibilidad.

* **Asistencia con TailwindCSS y diseño responsivo:** Para lograr un diseño responsivo, la IA fue invaluable para sugerir las clases de TailwindCSS adecuadas para diferentes puntos de quiebre (breakpoints) y ajustar la disposición de los elementos, lo cual me ahorró mucho tiempo en la experimentación y consulta de la documentación.

* **Aprendizaje interactivo y conceptual:** Más allá de la generación de código, la IA funcionó como un tutor. Le preguntaba sobre conceptos específicos de React (como el ciclo de vida de los componentes o el uso de *memoization*) y me ofrecía explicaciones concisas y ejemplos prácticos, lo que solidificó mi aprendizaje.

### 🚧 Desafíos encontrados y cómo la IA ayudó a superarlos:

* **Curva de aprendizaje inicial de React:** El mayor desafío fue asimilar la **sintaxis de React y su paradigma** (JSX, la gestión inmutable del estado, el ciclo de vida de los componentes, etc.). La IA me ayudó a superar esta barrera inicial, proporcionando ejemplos prácticos y explicaciones detalladas que desglosaron cada concepto complejo en partes manejables.

* **Manejo del estado global y persistencia con `localStorage`:** Integrar la funcionalidad del carrito de compras, asegurar su persistencia utilizando `localStorage` y mantener el estado sincronizado, fue inicialmente una tarea complicada. La IA me guio paso a paso en cómo serializar y deserializar los datos, y cómo asegurar que los cambios se reflejaran correctamente.

* **Configuración y uso de `React Router DOM`:** Al principio, configurar el enrutamiento y la navegación entre diferentes vistas y pasar parámetros a través de la URL resultaba confuso. La IA me proporcionó ejemplos de cómo definir rutas anidadas, cómo usar `Link` y `useNavigate` de manera efectiva, y cómo extraer la información de los parámetros de la URL.

* **Asegurar la responsividad del diseño:** Hacer que la interfaz de usuario se adaptara elegantemente a diferentes tamaños de pantalla, desde dispositivos móviles hasta grandes monitores, sin un conocimiento profundo de TailwindCSS fue un desafío. La IA fue fundamental para identificar las clases de utilidad responsivas correctas y la combinación adecuada para lograr el diseño deseado.

En resumen, la Inteligencia Artificial no fue solo una herramienta para generar código, sino un **catalizador para mi aprendizaje y resolución de problemas**. Me permitió construir este proyecto de e-commerce y adquirir una comprensión fundamental de React en un tiempo mucho más corto de lo que hubiera sido posible de otra manera.

## 🌿 Ramas del repositorio

- `main`: versión para desarrollo local con servidor en localhost.
- `server`: versión para producción y despliegue.

## 🔐 Variables de entorno

Es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=
VITE_LOCALHOST=http://localhost:4000
