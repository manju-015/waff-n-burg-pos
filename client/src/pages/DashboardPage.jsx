import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import api from "../api/api";
import { IndianRupee, Receipt, ShoppingBag, TrendingUp } from "lucide-react";

function DashboardPage() {
  const [analytics, setAnalytics] = useState({
    todaySales: 0,
    totalRevenue: 0,
    totalBills: 0,
    totalProductsSold: 0,
    topSeller: "-",
  });

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/analytics");

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-black">Dashboard</h1>

        <p className="text-black/70 mt-2">
          Track sales performance and monitor restaurant activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Today's Revenue"
          value={`₹${analytics.todaySales}`}
          icon={<IndianRupee size={28} />}
        />

        <DashboardCard
          title="Bills Total"
          value={analytics.totalBills}
          icon={<Receipt size={28} />}
        />

        <DashboardCard
          title="Products Sold Total"
          value={analytics.totalProductsSold}
          icon={<ShoppingBag size={28} />}
        />

        <DashboardCard
          title="Top Seller"
          value={analytics.topSeller}
          icon={<TrendingUp size={28} />}
        />
      </div>

      {/* Welcome Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-xl border border-amber-100 p-8">
        <h2 className="text-2xl font-bold text-black">
          Welcome to Waff N Burg POS
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed">
          Manage products, create bills, monitor daily revenue, track
          top-selling items and streamline restaurant operations from one
          powerful dashboard.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-medium">
          🧇 Fresh Waffles • 🍔 Burgers • 🥤 Thick Shakes
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
