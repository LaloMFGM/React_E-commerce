import { useState, useEffect } from "react"; // Importamos useEffect
import { useNavigate } from "react-router-dom";
import type { Product } from "../interfaces/Product";

const initialForm: Product = {
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: "",
};

export const SuggestProductPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [debouncedImageUrl, setDebouncedImageUrl] = useState(""); // Nuevo estado para la URL con debounce
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const placeholderImage =
    "https://www.shutterstock.com/image-vector/drag-drop-add-document-file-600nw-2152749621.jpg";
  const debounceTimeout = 300; // Puedes ajustar este valor (milisegundos)

  // useEffect para implementar el debounce
  useEffect(() => {
    // Establecemos un temporizador
    const timer = setTimeout(() => {
      // Solo actualizamos debouncedImageUrl después del tiempo de debounce
      setDebouncedImageUrl(formData.imageUrl);
      setImageError(false); // Reiniciamos el error de imagen al intentar cargar una nueva URL
    }, debounceTimeout);

    // Función de limpieza: si formData.imageUrl cambia antes de que expire el temporizador, lo cancelamos
    return () => clearTimeout(timer);
  }, [formData.imageUrl]); // Este efecto se ejecuta cada vez que formData.imageUrl cambia

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Aquí actualizamos formData inmediatamente para que el input del formulario muestre el valor actual
      [name]: name === "price" ? Number(value) : value,
    }));
    // El 'debouncedImageUrl' se actualizará a través del 'useEffect'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.imageUrl ||
      formData.price <= 0
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError(null);

    try {
      // Send to the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit product.");
      }

      setSuccess(true);
      // Optional: Clear form data after successful submission
      setFormData(initialForm);
      // Reset the debounced image URL and error state on successful submission
      setDebouncedImageUrl("");
      setImageError(false);
      setTimeout(() => navigate("/home"), 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Type 'any' for 'err' to handle potential non-Error objects
      setError(`Failed to submit suggestion: ${err.message || err}`);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header (retained) */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-purple-600 text-2xl">🛍️</span>
                  <div className="text-xl font-bold text-gray-800">
                    ShopZone
                  </div>
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
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
                <nav className="flex flex-col gap-3 mb-4 text-gray-900 font-medium">
                  <a href="/home" className="hover:text-blue-600 block">
                    Home
                  </a>
                  <a
                    href="/suggestproduct"
                    className="hover:text-blue-600 block whitespace-nowrap"
                  >
                    Suggest Product
                  </a>
                </nav>
              </div>
            )}
          </div>
        </header>
        {/* End Header */}

        <div className="flex-grow flex items-center justify-center text-center p-6 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Thank you!
            </h2>
            <p>Your product suggestion has been submitted successfully.</p>
            <p className="text-sm text-gray-500">Redirecting to home...</p>
          </div>
        </div>

        {/* Footer (retained) */}
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
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header (retained) */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-purple-600 text-2xl">🛍️</span>
                <div className="text-xl font-bold text-gray-800">ShopZone</div>
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
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
              <nav className="flex flex-col gap-3 mb-4 text-gray-900 font-medium">
                <a href="/home" className="hover:text-blue-600 block">
                  Home
                </a>
                <a
                  href="/suggestproduct"
                  className="hover:text-blue-600 block whitespace-nowrap"
                >
                  Suggest Product
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
      {/* End Header */}
      {/* Main content - Product Suggestion Form and Image Preview */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col md:flex-row gap-8">
          {/* Columna de la imagen */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <img
              src={
                imageError || !debouncedImageUrl
                  ? placeholderImage
                  : debouncedImageUrl
              }
              alt="Product Preview"
              className="max-w-full h-auto object-contain rounded-lg shadow-md"
              onError={handleImageError} // Manejar error de carga de imagen
              onLoad={() => setImageError(false)} // Restablecer el error si la imagen carga correctamente
            />
          </div>

          {/* Columna del formulario */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              Suggest a New Product
            </h1>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Wireless Bluetooth Earbuds"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 h-32 resize-y"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A detailed description of the product, features, and benefits."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  value={formData.price}
                  onChange={handleChange}
                  min={0.01}
                  step={0.01}
                  placeholder="e.g., 59.99"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Food & Drink">Food & Drink</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  value={formData.imageUrl} // El input sigue usando formData.imageUrl
                  onChange={handleChange}
                  placeholder="e.g., https://example.com/product-image.jpg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Suggestion
              </button>
            </form>
          </div>
        </div>
      </main>
      {/* End Main Content */}
      ---
      {/* Footer (retained) */}
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
