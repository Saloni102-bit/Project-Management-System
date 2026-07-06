import { useEffect, useState } from "react";
import API from "../services/api";

function Board() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTasks = (status) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Board 📊</h1>

      <div className="grid grid-cols-3 gap-4">
        
        {/* TODO */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-bold mb-3">Todo</h2>
          {filterTasks("Todo").map((t) => (
            <div key={t._id} className="p-2 bg-white mb-2 rounded">
              {t.title}
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div className="bg-yellow-100 p-4 rounded-xl">
          <h2 className="font-bold mb-3">In Progress</h2>
          {filterTasks("In Progress").map((t) => (
            <div key={t._id} className="p-2 bg-white mb-2 rounded">
              {t.title}
            </div>
          ))}
        </div>

        {/* DONE */}
        <div className="bg-green-100 p-4 rounded-xl">
          <h2 className="font-bold mb-3">Done</h2>
          {filterTasks("Done").map((t) => (
            <div key={t._id} className="p-2 bg-white mb-2 rounded">
              {t.title}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Board;