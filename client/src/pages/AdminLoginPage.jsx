import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="
    bg-white
    w-full
    max-w-md
    p-10
    rounded-3xl
    shadow-xl
    border
    border-amber-100
  "
      >
        <div className="text-center mb-8">
          <div
            className="
      text-5xl
      mb-4
      "
          >
            🧇
          </div>

          <h1
            className="
      text-3xl
      font-extrabold
      text-black
      "
          >
            Waff N Burg
          </h1>

          <p
            className="
      text-gray-500
      mt-2
      "
          >
            Admin Dashboard Login
          </p>
        </div>

        <label className="text-sm font-medium">Email</label>

        <input
          type="email"
          className="
      mt-2
      w-full
      border
      rounded-xl
      p-3
      mb-5
      focus:ring-2
      focus:ring-orange-400
      "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium">Password</label>

        <input
          type="password"
          className="
      mt-2
      w-full
      border
      rounded-xl
      p-3
      mb-6
      focus:ring-2
      focus:ring-orange-400
      "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="
      w-full
      bg-amber-500
      text-white
      py-3
      rounded-xl
      font-semibold
      hover:bg-amber-600
      transition
      "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
