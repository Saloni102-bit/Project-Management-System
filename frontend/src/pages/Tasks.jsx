import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
 const [uploading, setUploading] = useState(false);
  // 📌 FILTER STATES
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({});
  const [priority, setPriority] = useState("");

  // 📌 PAGINATION STATE
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [commentText, setCommentText] = useState("");
  const [file, setFile] = useState(null);

  // FETCH TASKS (WITH FILTER + PAGINATION)
  const fetchTasks = async (currentPage = 1) => {
    try {
      const res = await API.get(
        `/tasks?page=${currentPage}&limit=5&search=${search}&status=${status}&priority=${priority}`
      );

      setTasks(res.data.tasks);
      setPage(res.data.page);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      alert("Task Deleted Successfully ✅");
      fetchTasks(page);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD COMMENT
  const addComment = async (taskId) => {
    try {
      await API.post(`/tasks/${taskId}/comment`, {
        text: commentText,
      });

      setCommentText("");
      fetchTasks(page);
    } catch (err) {
      console.log(err);
    }
  };

  // UPLOAD FILE
  // UPLOAD FILE
const uploadFile = async (taskId) => {
  const file = selectedFiles[taskId];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  await API.post(`/tasks/upload/${taskId}`, formData);

  alert("File Uploaded Successfully ✅");
};

  useEffect(() => {
    fetchTasks(1);
  }, []);

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6">Tasks 📌</h1>

        {/* 🔍 SEARCH + FILTER UI */}
        <div className="flex gap-3 mb-4">
              <input
  type="file"
  onChange={(e) => {
    console.log("FILES:", e.target.files);
    console.log("FILE:", e.target.files[0]);
    setFile(e.target.files[0]);
  }}
/>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            onClick={() => fetchTasks(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>

        </div>

        {/* TASK LIST */}
        <div className="grid gap-4">
          {tasks.map((t) => (
            <div key={t._id} className="p-4 bg-white shadow rounded-xl">

              <h2 className="text-xl font-bold">{t.title}</h2>
              <p className="text-gray-600">{t.description}</p>

              <div className="flex gap-4 mt-2 text-sm">
                <span>Status: {t.status}</span>
                <span>Priority: {t.priority}</span>
              </div>

              {/* DELETE */}
              <button
                onClick={() => deleteTask(t._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete
              </button>

              {/* FILE UPLOAD */}
              <div className="mt-4 border-t pt-3">

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="mb-2"
                />

                  <button
  onClick={() => uploadFile(t._id)}
  disabled={uploading}
  className="bg-purple-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
>
  {uploading ? "Uploading..." : "Upload File"}
</button>

              </div>

              {/* COMMENTS */}
              <div className="mt-4 border-t pt-3">

                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write comment..."
                  className="border p-2 w-full rounded"
                />

                <button
                  onClick={() => addComment(t._id)}
                  className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
                >
                  Add Comment
                </button>

                <div className="mt-3">
                  {t.comments?.map((c, i) => (
                    <div key={i} className="bg-gray-100 p-2 rounded mt-2 text-sm">
                      💬 {c.text}
                    </div>
                  ))}
                </div>

              </div>

              {/* FILE LIST */}
              <div className="mt-3">
                {t.attachments?.map((a, i) => (
                  <a
                    key={i}
                    href={`http://localhost:5000/${a.filePath}`}
                    target="_blank"
                    className="text-blue-500 block"
                  >
                    📎 {a.fileName}
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* 📌 PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => fetchTasks(page - 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchTasks(page + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default Tasks;