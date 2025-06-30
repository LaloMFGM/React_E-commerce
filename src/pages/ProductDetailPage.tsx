import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";

// Definimos el placeholder para imágenes que no carguen
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/600x400?text=Image+Not+Available";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para el Navbar
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false); // Estado para manejar errores de imagen

  useEffect(() => {
    // Resetear el estado de error de imagen cada vez que cambia el ID
    setImageError(false);

    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ajusta la URL según tu API real
        const response = await axios.get<{ product: Product }>(
          `http://localhost:4000/api/products/${id}`
        );

        if (!response.data.product) {
          setError("Product not found.");
          setProduct(null);
        } else {
          setProduct(response.data.product);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(
            `Error: ${err.response.status} - ${
              err.response.data.message || "Product not found."
            }`
          );
        } else {
          setError(
            `Failed to fetch product data: ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  // --- Renderizado Condicional para Loading/Error (pre-Navbar para centrar) ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Cargando detalles del producto...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <p className="text-red-600 text-lg mb-4 text-center">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
        >
          ← Volver
        </button>
        <Link to="/home" className="text-blue-600 underline text-lg">
          Ir al Inicio
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <p className="text-gray-700 text-lg mb-4">
          No se pudo cargar la información del producto.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
        >
          ← Volver
        </button>
        <Link to="/home" className="text-blue-600 underline text-lg">
          Ir al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header (Navbar) - Reinstated */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Link to="/home" className="flex items-center gap-1">
                  <span className="text-purple-600 text-2xl">🛍️</span>
                  <div className="text-xl font-bold text-gray-800">
                    ShopZone
                  </div>
                </Link>
              </div>
            </div>

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

            <div className="hidden md:flex items-center gap-6 flex-wrap md:flex-nowrap">
              <nav className="flex items-center gap-6 text-gray-900 font-medium">
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
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
              <nav className="flex flex-col gap-3 mb-4 text-gray-900 font-medium">
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
        </div>
      </header>
      {/* End Header */}

      {/* Main Content - Product Display Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col md:flex-row items-start gap-10 mb-12">
          {/* Columna de la imagen (Izquierda) */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-lg p-6 overflow-hidden">
            <img
              src={imageError ? PLACEHOLDER_IMAGE : product.imageUrl}
              alt={product.name}
              className="max-w-full h-auto object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
              onLoad={() => setImageError(false)}
            />
          </div>

          {/* Columna de la información del producto (Derecha) */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline mb-6 self-start text-lg"
            >
              ← Volver a la Lista
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl text-purple-700 font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 text-md font-medium px-4 py-2 rounded-full shadow-sm">
                Categoría: {product.category}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button className="w-full sm:w-auto flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md">
                Añadir al Carrito
              </button>
              <button className="w-full sm:w-auto flex-1 py-3 px-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>

        {/* --- Secciones Adicionales de la HomePage --- */}

        {/* Hot Sale Section */}
        <section className="bg-red-600 text-white py-16 px-8 rounded-lg text-center shadow-lg mb-12">
          <h2 className="text-5xl font-extrabold mb-4 animate-pulse">
            ¡HOT SALE! 🔥
          </h2>
          <p className="text-2xl mb-6">
            Grandes descuentos en miles de productos.
          </p>
          <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-md">
            Ver Ofertas
          </button>
        </section>

        {/* Trending Products Section */}
        <section className="py-12 bg-white rounded-lg shadow-xl mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
              Productos Populares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Product Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f7600868f77?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Laptop"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Laptop Ultrabook
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Potencia y portabilidad
                  </p>
                  <p className="text-purple-600 font-bold text-xl">$1200.00</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1546435327-04664879207e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Smart TV"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Smart TV 4K 55"
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Entretenimiento en alta definición
                  </p>
                  <p className="text-purple-600 font-bold text-xl">$750.00</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1518779578-8cefa170f80b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gaming Mouse"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Mouse Gamer RGB
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Precisión para tus juegos
                  </p>
                  <p className="text-purple-600 font-bold text-xl">$55.00</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
              {/* Product Card 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1571477799793-e4d0d866a1e3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Headphones"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Audífonos Bluetooth
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Sonido inmersivo sin cables
                  </p>
                  <p className="text-purple-600 font-bold text-xl">$99.00</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-gray-100 rounded-lg shadow-xl">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
              Nuestras Categorías
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Category Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://www.mercojuris.com/wp-content/uploads/2018/09/compure.jpg"
                  alt="Electronics"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Electrónica
                  </h3>
                  <p className="text-gray-600">
                    Smartphones, laptops, gadgets y más.
                  </p>
                </div>
              </div>
              {/* Category Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9F0rsnV0ukE-6228OUnu6Bfy6-Yv1OZL-A&s"
                  alt="Home & Kitchen"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Hogar y Cocina
                  </h3>
                  <p className="text-gray-600">
                    Electrodomésticos, utensilios y decoración.
                  </p>
                </div>
              </div>
              {/* Category Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                <img
                  src="https://blog.hulifestyle.mx/hs-fs/hubfs/deportes%20que%20puedes%20hacer%20al%20aire%20libre_3.webp?width=1280&height=792&name=deportes%20que%20puedes%20hacer%20al%20aire%20libre_3.webp"
                  alt="Sports & Outdoors"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Deportes y Aire Libre
                  </h3>
                  <p className="text-gray-600">
                    Equipo, ropa y accesorios para tus aventuras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-purple-700 text-white text-center rounded-lg shadow-xl mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl mb-8">
              Sugiere un producto y lo buscaremos para ti.
            </p>
            <Link
              to="/suggestproduct"
              className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-md"
            >
              Sugerir Producto
            </Link>
          </div>
        </section>
      </main>
      {/* End Main Content */}

      {/* Footer - Reinstated */}
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
      {/* End Footer */}
    </div>
  );
};
