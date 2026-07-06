import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    priority: "Low",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks/create", form);
      alert("Task Created 🚀");

      setForm({
        title: "",
        description: "",
        project: "",
        priority: "Low",
        dueDate: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">Create Task</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="project"
            placeholder="Project ID"
            value={form.project}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateTask;