import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH STATS
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/stats");
      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="ml-64 p-6">
          <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
        </div>
      </>
    );
  }

  const pieData = [
    { name: "Completed", value: stats?.completedTasks || 0 },
    { name: "Pending", value: stats?.pendingTasks || 0 },
  ];

  const barData = [
    { name: "Projects", value: stats?.totalProjects || 0 },
    { name: "Tasks", value: stats?.totalTasks || 0 },
  ];

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard 🚀
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-blue-500 text-white p-4 rounded-xl">
            <h2>Total Projects</h2>
            <p className="text-2xl font-bold">
              {stats?.totalProjects ?? 0}
            </p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-xl">
            <h2>Total Tasks</h2>
            <p className="text-2xl font-bold">
              {stats?.totalTasks ?? 0}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-xl">
            <h2>Completed Tasks</h2>
            <p className="text-2xl font-bold">
              {stats?.completedTasks ?? 0}
            </p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-xl col-span-3">
            <h2>Pending Tasks</h2>
            <p className="text-2xl font-bold">
              {stats?.pendingTasks ?? 0}
            </p>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-6 mt-10">

          {/* PIE CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold mb-4">Task Status</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold mb-4">Overview</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;