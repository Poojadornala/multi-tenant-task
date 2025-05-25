import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-500 p-4 rounded">Total Tasks: {stats.totalTasks}</div>
        <div className="bg-red-500 p-4 rounded">Overdue: {stats.overdueTasks}</div>
        <div className="bg-green-500 p-4 rounded">Completed: {stats.completedTasks}</div>
        <div className="bg-blue-500 p-4 rounded">In Progress: {stats.inProgressTasks}</div>
      </div>
    </div>
  );
};

export default Dashboard;
