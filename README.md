# Agregar la información de ramas y variables de entorno al README
updated_readme_content = """# 🛒 React E-commerce

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

## 🌿 Ramas del repositorio

- `main`: versión para desarrollo local con servidor en localhost.
- `server`: versión para producción y despliegue.

## 🔐 Variables de entorno

Es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=
VITE_LOCALHOST=http://localhost:4000
