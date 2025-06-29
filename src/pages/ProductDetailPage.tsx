import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ajusta la URL según tu API real
        const response = await axios.get<{ product: Product }>(`http://localhost:4000/api/products/${id}`);

        if (!response.data.product) {
          setError("Product not found");
          setProduct(null);
        } else {
          setProduct(response.data.product);
        }
      } catch (err) {
        setError(`Failed to fetch product data : ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
        <Link to="/" className="mt-4 text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!product) {
    return null; // Por seguridad, aunque no debería llegar aquí
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline mb-4"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-h-96 object-cover rounded mb-6"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
    </div>
  );
}