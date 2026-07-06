import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully 👋");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">
        Project Management System
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;