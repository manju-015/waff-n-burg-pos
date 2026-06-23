import { useEffect, useState } from "react";
import api from "../api/api";
import { CalendarDays, Calendar, BarChart3 } from "lucide-react";

function BillHistoryPage() {
  const [bills, setBills] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredBills, setFilteredBills] = useState([]);

  const fetchBills = async () => {
    try {
      const { data } = await api.get("/bills");

      setBills(data);
      setFilteredBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filterBills = () => {
    if (!startDate || !endDate) {
      setFilteredBills(bills);
      return;
    }

    const filtered = bills.filter((bill) => {
      const billDate = new Date(bill.createdAt);

      const start = new Date(startDate);
      const end = new Date(endDate);

      end.setHours(23, 59, 59);

      return billDate >= start && billDate <= end;
    });

    setFilteredBills(filtered);
  };
  const todayBills = bills.filter((bill) => {
    const billDate = new Date(bill.createdAt);
    const today = new Date();

    return (
      billDate.getDate() === today.getDate() &&
      billDate.getMonth() === today.getMonth() &&
      billDate.getFullYear() === today.getFullYear()
    );
  });

  const monthBills = bills.filter((bill) => {
    const billDate = new Date(bill.createdAt);
    const today = new Date();

    return (
      billDate.getMonth() === today.getMonth() &&
      billDate.getFullYear() === today.getFullYear()
    );
  });

  const todayRevenue = todayBills.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0,
  );

  const monthRevenue = monthBills.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0,
  );

  const todayItems = todayBills.reduce(
    (sum, bill) =>
      sum + bill.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0,
  );

  const monthItems = monthBills.reduce(
    (sum, bill) =>
      sum + bill.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0,
  );

  const totalItems = filteredBills.reduce(
    (sum, bill) =>
      sum + bill.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0,
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-black">Bill History</h1>

        <p className="text-black/70 mt-2">
          Review all generated bills and sales transactions.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-5 mb-6">
        <h2 className="font-bold mb-3">Filter Sales</h2>

        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <button
            onClick={filterBills}
            className="
bg-black
text-amber-400
px-5
rounded-xl
font-semibold
"
          >
            Apply
          </button>
        </div>
      </div>
      <div
        className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
"
      >
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Today */}
            <div className="border-r pr-6">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <CalendarDays size={20} />
                Today
              </h3>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Bills</p>
                  <h2 className="text-2xl font-bold">{todayBills.length}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Items Sold</p>
                  <h2 className="text-2xl font-bold">{todayItems}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹{todayRevenue}
                  </h2>
                </div>
              </div>
            </div>

            {/* This Month */}
            <div className="border-r pr-6">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <Calendar size={20} />
                This Month
              </h3>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Bills</p>
                  <h2 className="text-2xl font-bold">{monthBills.length}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Items Sold</p>
                  <h2 className="text-2xl font-bold">{monthItems}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹{monthRevenue}
                  </h2>
                </div>
              </div>
            </div>

            {/* Overall */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <BarChart3 size={20} />
                Overall
              </h3>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Bills</p>
                  <h2 className="text-2xl font-bold">{filteredBills.length}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Items Sold</p>
                  <h2 className="text-2xl font-bold">{totalItems}</h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹
                    {filteredBills.reduce(
                      (sum, bill) => sum + bill.totalAmount,
                      0,
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-black text-amber-400">
                <th className="p-4 text-left">#</th>
                <th className="p-3 text-left font-semibold">Date</th>

                <th className="p-3 text-left font-semibold">Items</th>

                <th className="p-3 text-left font-semibold">Total</th>
              </tr>
            </thead>

            <tbody>
              {bills.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-12 text-gray-500">
                    No bills generated yet.
                  </td>
                </tr>
              )}
              {filteredBills.map((bill, index) => (
                <tr
                  key={bill._id}
                  className="
    border-t
    hover:bg-amber-50
    transition
  "
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(bill.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {bill.items.length} Items
                    </span>
                  </td>

                  <td className="p-4 font-extrabold text-lg text-green-700">
                    ₹{bill.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillHistoryPage;
