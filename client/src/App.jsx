import { Routes, Route } from "react-router-dom";
import { DEMO_MODE } from "./config";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import BillingPage from "./pages/BillingPage";
import BillHistoryPage from "./pages/BillHistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReceiptPage from "./pages/ReceiptPage";
import MenuPage from "./pages/MenuPage";
import MenuCardPage from "./pages/MenuCardPage";
import QRPage from "./pages/QRPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";

function App() {
  if (DEMO_MODE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold">WAFF L CONE</h1>

          <p className="mt-4 text-gray-600">
            Demo version is temporarily under update.
          </p>

          <p className="mt-2">Production version coming soon 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public customer pages */}
      <Route path="/menu-card" element={<MenuCardPage />} />
      <Route path="/receipt" element={<ReceiptPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/" element={<AdminLoginPage />} />

      {/* Admin pages */}
      <Route
        path="*"
        element={
          <AdminLayout>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/history" element={<BillHistoryPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/bill-history" element={<BillHistoryPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/qr" element={<QRPage />} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
