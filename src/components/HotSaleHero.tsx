// src/components/HotSaleHero.tsx (o puedes copiarlo directamente en HomePage.tsx por ahora)

import React from 'react';

export const HotSaleHero = () => {
  const discountCode = "HOTSALE2025"; // Puedes cambiar el código o hacerlo dinámico
  const endDate = "31 de Julio"; // Puedes cambiar la fecha

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4 shadow-lg mt-8 rounded-lg mx-auto max-w-7xl">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-pulse">
          🔥 ¡Gran Hot Sale ShopZone! 🔥
        </h2>
        <p className="text-xl md:text-2xl mb-6 font-semibold">
          Descuentos increíbles en miles de productos seleccionados.
        </p>
        <p className="text-3xl md:text-4xl font-bold mb-6 bg-yellow-300 text-red-800 py-3 px-6 rounded-xl inline-block shadow-inner transform hover:scale-105 transition-transform duration-300">
          Usa el Código: <span className="underline tracking-wider">{discountCode}</span>
        </p>
        <p className="text-lg md:text-xl font-medium mb-8">
          Válido hasta el {endDate}. ¡No te lo pierdas!
        </p>
        <button className="btn btn-warning btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
          Explorar Ofertas Ahora
        </button>
      </div>
    </div>
  );
};