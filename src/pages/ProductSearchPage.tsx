import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import type { Product, ProductResponse } from "../interfaces/Product";

export const ProductSearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSearchTerm(searchQuery);
    if (searchQuery) {
      setLoading(true);
      setError(null);
      axios
        .post(
          `http://localhost:4000/api/products/search?query=${encodeURIComponent(
            searchQuery
          )}`
        )
        .then((res) => {
          const data = res.data.products.map((p: ProductResponse) => ({
            ...p,
            id: p._id,
          }));
          setProducts(data);
        })
        .catch(() => {
          setError("Error loading search results. Please try again.");
        })
        .finally(() => setLoading(false));
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(localSearchTerm.trim())}`);
    }
  };

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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link to="/home" className="flex items-center gap-1">
                <span className="text-purple-600 text-2xl">🛍️</span>
                <div className="text-xl font-bold text-gray-800">ShopZone</div>
              </Link>
            </div>
            {/* Search Bar in the middle of the navbar */}
            <form onSubmit={handleSearchSubmit} className="flex-grow max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" // Added text-gray-900 here
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
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
      </header>

      <div className="bg-gray-100 py-6 mb-6 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Search Results for "<span className="text-blue-600">{searchQuery}</span>"
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products Found</h2>
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {products.length} items
          </span>
        </div>
        {products.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found for "{searchQuery}"
            </h3>
            <p className="text-gray-600">Please try a different search term.</p>
          </div>
        ) : products.length === 0 && !searchQuery ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start searching for products!
            </h3>
            <p className="text-gray-600">Enter a term in the search bar above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="card card-compact bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 relative group"
              >
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
                    <span className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price)}
                    </span>
                  </div>

                  <h2 className="card-title text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {product.description ||
                      "A concise product description or key selling points go here. Keep it short and sweet for card views!"}
                  </p>

                  <div className="flex items-center gap-1.5 mb-4">
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
                      onClick={(e) => {
                        e.preventDefault(); /* Add to cart logic here */
                      }}
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