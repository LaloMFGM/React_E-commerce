import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import type { Product, ProductResponse } from "../interfaces/Product";
import { HotSaleHero } from "../components/HotSaleHero";

import shoppingImage from '../assets/shopping.png';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        const data = res.data.products.map((p: ProductResponse) => ({
          ...p,
          id: p._id,
        }));
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => {
        setError("Error loading products");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, sortBy, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo a la izquierda */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-purple-600 text-2xl">🛍️</span>
              <div className="text-xl font-bold text-gray-800">ShopZone</div>
            </div>

            {/* Barra de búsqueda centrada para pantallas medianas/grandes */}
            <div className="hidden md:flex flex-grow justify-center mx-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-lg pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>

            {/* Navegación y botón de menú (hamburger) a la derecha */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Navegación para pantallas medianas/grandes */}
              <nav className="hidden md:flex items-center gap-6 text-gray-900 font-medium">
                <Link to="/home" className="hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/suggestproduct"
                  className="hover:text-blue-600 whitespace-nowrap"
                >
                  Suggest Product
                </Link>
              </nav>

              {/* Botón de menú para pantallas pequeñas */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isMenuOpen ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 01-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 01-1.414-1.414L10.586 12 5.722 7.136a1 1 0 011.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil - Se muestra condicionalmente */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
            {/* Barra de búsqueda móvil (centrada) */}
            <div className="w-full mb-4 flex justify-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
            {/* Enlaces de navegación móvil (alineados a la derecha) */}
            <nav className="flex flex-col items-end gap-3 text-gray-900 font-medium">
              <Link to="/home" className="hover:text-blue-600 block">
                Home
              </Link>
              <Link
                to="/suggestproduct"
                className="hover:text-blue-600 block whitespace-nowrap"
              >
                Suggest Product
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section: Hero con figura (reverse order) de DaisyUI con fondo gris turquesa */}
      <div className="hero min-h-[70vh] bg-gray-300 py-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={shoppingImage}
            className="max-w-sm rounded-lg "
            alt="Mujer con bolsas de compra"
          />
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Tu Estilo, <br /> Nuestra Colección
            </h1>
            <p className="py-6 text-lg text-gray-700">
              Descubre lo último en moda y tecnología. Calidad que te define, precios que te sorprenden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary btn-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                Comprar Ahora
              </button>
              <button className="btn btn-outline btn-primary btn-lg shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">
                Ver Colecciones
              </button>
            </div>
          </div>
        </div>
      </div>

      ---

      {/* Nuevo Hero de Hot Sale, ubicado justo debajo del primer Hero */}
      <HotSaleHero />

      ---

      {/* Contenido Principal (Sección de Productos) */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
            >
              <option value="name">Sort by Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Tarjetas de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="card card-compact bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 relative group"
              >
                {/* The heart button should remain clickable independently, so it's not part of the Link */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer z-10 p-1">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {product.price > 500 && (
                  <div className="absolute top-4 left-4 badge badge-secondary z-10">
                    TRENDING
                  </div>
                )}

                <figure className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      product.imageUrl ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={product.name}
                    className="object-contain w-full h-full p-4"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-center mb-1">
                    <div className="badge badge-outline badge-primary">
                      {product.category}
                    </div>
                    {/* Add price display here, formatted for clarity */}
                    <span className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                      }).format(product.price)}
                    </span>
                  </div>
                  <h2 className="card-title text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {/* Use actual product description if available */}
                    {product.description || "A concise product description or key selling points go here. Keep it short and sweet for card views!"}
                  </p>

                  <div className="flex items-center gap-1.5 mb-4">
                    {/* These would ideally come from product.colors */}
                    <div
                      className="w-5 h-5 rounded-full bg-red-500 border border-gray-200 cursor-pointer"
                      title="Red"
                    ></div>
                    <div
                      className="w-5 h-5 rounded-full bg-blue-500 border border-gray-200 cursor-pointer"
                      title="Blue"
                    ></div>
                    <div
                      className="w-5 h-5 rounded-full bg-green-500 border border-gray-200 cursor-pointer"
                      title="Green"
                    ></div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={(e) => { e.preventDefault(); /* Add to cart logic here */ }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      ---

      {/* Sección "Ofertas Especiales y Beneficios" */}
      <div className="hero bg-white min-h-[50vh] py-10 px-4">
        <div className="hero-content text-center w-full max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Ofertas Especiales y Beneficios
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-6 overflow-x-auto pb-4 px-2 w-full">
            <div className="card w-full sm:w-80 bg-white shadow-xl flex-shrink-0 border border-black transition-transform duration-300 hover:scale-105">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold mb-4 text-black">
                  🎉 Descuentos Imperdibles 🎉
                </h2>
                <p className="mb-6 text-black">
                  Aprovecha nuestras ofertas exclusivas en una amplia selección
                  de productos. ¡No te los puedes perder!
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary w-full">
                    Ver Ofertas
                  </button>
                </div>
              </div>
            </div>

            <div className="card w-full sm:w-80 bg-white shadow-xl flex-shrink-0 border border-black transition-transform duration-300 hover:scale-105">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold mb-4 text-black">
                  🔥 Hot Sale ShopZone 🔥
                </h2>
                <p className="mb-6 text-black">
                  Prepárate para el Hot Sale con los mejores precios del año.
                  ¡Regístrate para notificaciones!
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-secondary w-full">
                    Más Información
                  </button>
                </div>
              </div>
            </div>

            <div className="card w-full sm:w-80 bg-white shadow-xl flex-shrink-0 border border-black transition-transform duration-300 hover:scale-105">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold mb-4 text-black">
                  💳 Meses Sin Intereses 💳
                </h2>
                <p className="mb-6 text-black">
                  Compra ahora y paga después con nuestras opciones de meses sin
                  intereses en tus bancos favoritos.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-accent w-full">Ver Bancos</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-8">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};