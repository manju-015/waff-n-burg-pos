function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-amber-100
        p-6
        hover:scale-[1.02]
        transition-all
        duration-300
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <h2 className="text-2xl font-bold text-black mt-3">{value}</h2>
        </div>

        <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
