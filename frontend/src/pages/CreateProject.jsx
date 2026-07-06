import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function CreateProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    projectManager: "",
    teamMembers: [],
  });

  const [users, setUsers] = useState([]);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects/create", form);
      alert("Project Created 🚀");

      setForm({
        title: "",
        description: "",
        deadline: "",
        projectManager: "",
        teamMembers: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">Create Project</h1>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TITLE */}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          {/* DEADLINE */}
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          {/* PROJECT MANAGER */}
          <select
            name="projectManager"
            value={form.projectManager}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Project Manager</option>

            {users
              .filter((u) => u.role === "Project Manager")
              .map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
          </select>

          {/* TEAM MEMBERS */}
          <select
            multiple
            className="border p-2 w-full"
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setForm({ ...form, teamMembers: values });
            }}
          >
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>

          {/* SUBMIT */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create Project
          </button>

        </form>
      </div>
    </>
  );
}

export default CreateProject;