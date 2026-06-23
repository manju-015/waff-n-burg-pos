import { useEffect, useState } from "react";
import api from "../api/api";

function MenuPage() {
  const [products, setProducts] = useState([]);

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

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }

    acc[product.category].push(product);

    return acc;
  }, {});

  return (
    <div
      id="top"
      className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50"
    >
      {/* Header */}
      <div className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">🧇 WAFF N BURG</h1>

        <p className="mt-4 text-base md:text-xl">
          Fresh Waffles • Shakes • Coffee
        </p>

        <p className="mt-2">Order Directly At Counter</p>
      </div>

      <div className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          <a
            href="#top"
            className="whitespace-nowrap px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            All
          </a>

          <div className="flex gap-3 overflow-x-auto">
            {Object.keys(groupedProducts).map((category) => (
              <a
                key={category}
                href={`#${category}`}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-black text-white text-sm"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div id={category} key={category} className="mb-12 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition overflow-hidden"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  ) : (
                    <div className="h-52 bg-slate-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>

                    <p className="text-slate-500">{product.category}</p>

                    <p className="text-3xl font-bold mt-3 text-orange-600">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MenuPage;
