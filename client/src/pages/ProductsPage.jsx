import { useEffect, useState } from "react";
import api from "../api/api";
import { categories } from "../constants/categories";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [image, setImage] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const form = new FormData();

  form.append("name", formData.name);
  form.append("category", formData.category);
  form.append("price", formData.price);

  if (image) {
    form.append("image", image);
  }

  async function createProduct(e) {
    e.preventDefault();

    try {
      await api.post("/products", form);
      setFormData({
        name: "",
        category: "",
        price: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${editingId}`, formData);

      setEditingId(null);

      setFormData({
        name: "",
        category: "",
        price: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
    });
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    return searchMatch && categoryMatch;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-black">
          Product Management
        </h1>

        <p className="text-black/70 mt-2">Add, update and manage menu items.</p>
      </div>
      {/* Add Product Form */}
      <form
        onSubmit={editingId ? updateProduct : createProduct}
        className="
bg-white
rounded-3xl
shadow-xl
border
border-amber-100
p-6
mb-6
"
      >
        <h2 className="text-xl font-bold mb-5">Add Product</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="
border
border-amber-300
rounded-xl
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-amber-400
"
            required
          />

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="
border
border-amber-300
rounded-xl
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-amber-400
"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
            required
          />
        </div>

        <div className="flex items-center gap-4 mt-3">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm"
          />

          <button
            className="
px-5
py-3
bg-black
text-amber-400
rounded-xl
font-semibold
hover:bg-zinc-900
transition
"
          >
            {editingId ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:scale-105 ${
              selectedCategory === cat.name
                ? "ring-4 ring-amber-400"
                : "border-gray-200"
            }`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-24 object-cover"
            />

            <div className="p-2 text-center text-xs font-medium">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
      {/* Category Cards */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
w-full
bg-white
border
border-amber-300
rounded-2xl
px-5
py-3
shadow-md
focus:outline-none
focus:ring-2
focus:ring-amber-400
"
        />
      </div>
      {/* Products Table */}
      <div
        className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
"
      >
        <table className="w-full">
          <thead>
            <tr className="bg-black text-amber-400">
              <th className="p-3 text-left">#</th>

              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Category</th>

              <th className="p-3 text-left">Price</th>

              <th className="p-3 text-left">Image</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product._id}
                className="border-t hover:bg-amber-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{product.name}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3">₹{product.price}</td>

                <td className="p-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
w-16
h-16
object-cover
rounded-xl
border
border-amber-200
"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => startEdit(product)}
                    className="
bg-amber-400
text-black
px-3
py-2
rounded-lg
font-medium
mr-2
hover:bg-amber-500
"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="
bg-black
text-white
px-3
py-2
rounded-lg
font-medium
hover:bg-zinc-800
"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage;
