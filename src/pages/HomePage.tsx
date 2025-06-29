import { useEffect, useState } from "react";
import axios from "axios";
import type { Product, ProductResponse } from "../interfaces/Product";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

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
            {/* Izquierda: Toggle + Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-purple-600 text-2xl">🛍️</span>
                <div className="text-xl font-bold text-gray-800">ShopZone</div>
              </div>
            </div>

            {/* Derecha: Navegación + Búsqueda */}
            <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
              {/* Navegación alineada a la derecha */}
              <nav className="hidden md:flex items-center gap-6 text-gray-900 font-medium">
                <a href="/home" className="hover:text-blue-600">
                  Home
                </a>
                <a
                  href="/suggestproduct"
                  className="hover:text-blue-600 whitespace-nowrap"
                >
                  Suggest Product
                </a>
              </nav>

              {/* Input búsqueda solo visible en md+ */}
              <div className="hidden md:flex max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - DaisyUI's Hero with custom smaller height */}
      <div
        className="hero" // Removed min-h-screen to apply custom height
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/vertical-frame-full-size-photo-young-woman-formal-attire-with-black-shopping-bags_134398-10282.jpg?ga=GA1.1.782208770.1751165924&w=740)",
          height: "70vh", // Set the hero height to 40% of the viewport height
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hero Overlay - provides a semi-transparent layer for text readability */}
        <div className="hero-overlay bg-opacity-60"></div>

        {/* Hero Content - the actual text and buttons */}
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Descubre las Últimas Tendencias <br /> en ShopZone
            </h1>
            <p className="mb-5">
              Encuentra productos únicos y de alta calidad para cada estilo y
              necesidad.
            </p>
            <button className="btn btn-primary mr-2">Comprar Ahora</button>
            <button className="btn btn-outline btn-info">Más Información</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
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

        {/* Product Cards */}
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
              <div
                key={product.id}
                className="card card-compact bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 relative"
              >
                {/* Wishlist Button - positioned top right */}
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

                {/* Trending Badge - positioned top left */}
                {/* Replace 'product.isTrending' with your actual data property if available */}
                {product.price > 500 && ( // Example condition for trending
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
                    className="object-contain w-full h-full p-4" // Padding inside figure
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-center mb-1">
                    <div className="badge badge-outline badge-primary">
                      {product.category}
                    </div>
                  </div>
                  <h2 className="card-title text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    A concise product description or key selling points go here.
                    Keep it short and sweet for card views!
                  </p>

                  <div className="flex items-baseline gap-2 mb-3">
                    <div className="text-gray-900 font-bold text-2xl">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-gray-400 line-through text-sm">
                      ${(product.price * 1.1).toFixed(2)}
                    </div>
                  </div>

                  {/* Optional: Color options can be added here, similar to your original */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-5 h-5 rounded-full bg-red-500 border border-gray-200 cursor-pointer" title="Red"></div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-gray-200 cursor-pointer" title="Blue"></div>
                    <div className="w-5 h-5 rounded-full bg-green-500 border border-gray-200 cursor-pointer" title="Green"></div>
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-block">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};