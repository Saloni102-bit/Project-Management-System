import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-8">
        PMS 🚀
      </h1>

      <div className="flex flex-col gap-4">

        {/* DASHBOARD */}
        <Link to="/dashboard" className="hover:text-yellow-400">
          Dashboard
        </Link>

        {/* PROJECTS */}
        <Link to="/projects" className="hover:text-yellow-400">
          Projects
        </Link>

        {/* TASKS */}
        <Link to="/tasks" className="hover:text-yellow-400">
          Tasks
        </Link>

        {/* CREATE PROJECT (ADMIN ONLY) */}
        {user.role === "Admin" && (
          <Link
            to="/create-project"
            className="hover:text-yellow-400"
          >
            Create Project
          </Link>
        )}

        {/* CREATE TASK (ADMIN + PROJECT MANAGER) */}
        {(user.role === "Admin" ||
          user.role === "Project Manager") && (
          <Link
            to="/create-task"
            className="hover:text-yellow-400"
          >
            Create Task
          </Link>
        )}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 mt-6 p-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;