import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div
      className="
    flex min-h-screen
    bg-[radial-gradient(circle_at_top_left,#a16207_0%,#ca8a04_25%,#eab308_60%,#fef08a_100%)]
  "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Header */}
        <div className="bg-black px-8 py-5 shadow-lg">
          <h1 className="text-3xl font-extrabold">
            <span className="text-white">WAFF</span>
            <span className="text-amber-400"> N BURG</span>
          </h1>

          <p className="text-gray-300 text-sm mt-1">
            Restaurant Management System
          </p>
        </div>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
