// src/components/ProductCard.tsx
"use client"


import type { Product } from "../interfaces/Product";

// Define las props basadas directamente en tu interfaz Product
// Asumo que tu Product interface tiene id (mapeado de _id), name, price, imageUrl, category


export default function ProductCard({

  name,
  price,
  imageUrl,
  category
}: Product) {

  // URL de imagen de fallback si no se proporciona una
  const fallbackImage = "/placeholder.svg?height=300&width=300";

  return (
    <div className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-sm bg-white rounded-lg border border-gray-200">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={imageUrl || fallbackImage} // Usa tu imageUrl o el fallback
          alt={name} // Usa el nombre del producto para el alt
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Add to Cart Button - appears on hover */}
        {/* El botón de añadir al carrito se muestra al hacer hover sobre la imagen */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <div className="text-gray-500 text-xs uppercase font-medium mb-1">
          {category} {/* Usa la categoría de tu producto */}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {name} {/* Usa el nombre de tu producto */}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
          {/* El precio original y el descuento se han eliminado ya que no están en tus variables */}
        </div>
      </div>

      {/* Add to Cart Button at the bottom (always visible) */}
      <div className="p-4 pt-0">
       
      </div>
    </div>
  );
}