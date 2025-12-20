export default function DashboardPage() {
  return (
    <>
      <div className="px-4 md:px-8 py-4 md:py-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Welcome to the dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your store will appear here.
          </p>
        </div>
      </div>
    </>
  );
}
