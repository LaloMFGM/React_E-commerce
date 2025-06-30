import {  useState } from "react";

import { useNavigate } from "react-router-dom";
import type { Product } from "../interfaces/Product";

const initialForm: Product = {
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: ""
};

export const SuggestProductPage = () => {
 const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    if (!formData.name || !formData.description || !formData.category || !formData.imageUrl || formData.price <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError(null);

    try {
      // Aquí envías al backend real:
      await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      setSuccess(true);
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setError(`Failed to submit suggestion : ${err}`);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h2>
          <p>Your product suggestion has been submitted.</p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Suggest a New Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border p-2 rounded"
            value={formData.price}
            onChange={handleChange}
            min={0.01}
            step={0.01}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full border p-2 rounded"
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
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            className="w-full border p-2 rounded"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Suggestion
        </button>
      </form>
    </div>
  );
}
