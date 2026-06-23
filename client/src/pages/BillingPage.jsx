import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { categories } from "../constants/categories";

function BillingPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBaseModal, setShowBaseModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const generateBill = async () => {
    try {
      const billData = {
        items: cart.map((item) => ({
          productName: item.name,
          base: item.base,
          price: item.price,
          qty: item.qty,
        })),

        totalAmount: total,

        paymentMethod: "UPI",
      };

      const response = await api.post("/bills", billData);

      console.log("BILL RESPONSE:", response.data);

      alert("Bill Generated");

      navigate("/receipt", {
        state: {
          items: cart,
          total,
          billNumber: response.data.billNumber,
        },
      });

      setCart([]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    return searchMatch && categoryMatch;
  });

  const addProductWithBase = (base) => {
    const product = selectedProduct;

    const finalPrice = base === "Brownie" ? product.price + 5 : product.price;

    const cartItem = {
      ...product,
      base,
      price: finalPrice,
    };

    const existing = cart.find(
      (item) => item._id === cartItem._id && item.base === cartItem.base,
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === cartItem._id && item.base === cartItem.base
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...cartItem,
          qty: 1,
        },
      ]);
    }

    setShowBaseModal(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-black">Billing POS</h1>

        <p className="text-black/70 mt-2">
          Create bills quickly and manage customer orders.
        </p>
      </div>
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
shadow-lg
mb-6
focus:outline-none
focus:ring-2
focus:ring-amber-400
"
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:scale-105 ${
              selectedCategory === cat.name
                ? "ring-4 ring-amber-400"
                : "border-transparent"
            }`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-24 object-cover"
            />

            <div className="p-3 text-center font-semibold">{cat.name}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products */}

        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="
bg-white
rounded-3xl
shadow-xl
border
border-amber-100
p-5
hover:scale-[1.03]
transition-all
duration-300
"
              >
                {/* {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  /> 
                )} */}
                <h2 className="font-bold text-lg">{product.name}</h2>

                <p className="text-gray-500 text-sm mt-1">{product.category}</p>

                <p className="font-extrabold text-2xl mt-3 text-amber-700">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => {
                    if (
                      product.category === "Classic Waffles" ||
                      product.category === "Premium Waffles"
                    ) {
                      setSelectedProduct(product);
                      setShowBaseModal(true);
                    } else {
                      addToCart(product);
                    }
                  }}
                  className="
mt-4
w-full
bg-black
text-amber-400
py-3
rounded-xl
font-semibold
hover:bg-zinc-900
transition
"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}

        <div
          className="
bg-white
rounded-3xl
shadow-xl
border
border-amber-100
p-6
sticky
top-6
"
        >
          <h2 className="text-2xl font-extrabold mb-5">Cart</h2>
          <div className="bg-amber-50 rounded-2xl p-4 mb-5">
            <p className="text-sm text-gray-600">Items in Cart</p>

            <h3 className="text-2xl font-bold">{cart.length}</h3>
          </div>

          {cart.length === 0 ? (
            <p>No items added</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="
flex
justify-between
py-4
border-b
border-amber-100
"
                >
                  <div>
                    <div>
                      <p>
                        {item.name}
                        {item.base && ` (${item.base} Base)`}
                      </p>

                      {item.base && (
                        <p className="text-xs text-gray-500">
                          {item.base} Base
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="
px-3
py-1
bg-red-500
text-white
rounded-lg
font-bold
"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="
px-3
py-1
bg-amber-500
text-black
rounded-lg
font-bold
"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p>₹{item.price * item.qty}</p>
                </div>
              ))}

              <div className="mt-4">
                <h3 className="text-3xl font-extrabold text-black">
                  Total: ₹{total}
                </h3>
                <button
                  onClick={() => setCart([])}
                  className="
w-full
mt-3
border-2
border-black
py-3
rounded-xl
font-semibold
hover:bg-gray-100
"
                >
                  Clear Cart
                </button>

                <button
                  onClick={generateBill}
                  className="
mt-4
w-full
bg-black
text-amber-400
py-4
rounded-xl
font-bold
text-lg
hover:bg-zinc-900
transition
"
                >
                  Generate Bill
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {showBaseModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-80">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>

            <button
              onClick={() => addProductWithBase("Vanilla")}
              className="w-full bg-amber-400 py-3 rounded-xl mb-3 font-semibold"
            >
              Vanilla Base ₹{selectedProduct.price}
            </button>

            <button
              onClick={() => addProductWithBase("Brownie")}
              className="w-full bg-black text-amber-400 py-3 rounded-xl font-semibold"
            >
              Brownie Base ₹{selectedProduct.price + 5}
            </button>

            <button
              onClick={() => {
                setShowBaseModal(false);
                setSelectedProduct(null);
              }}
              className="w-full mt-3 border py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingPage;
