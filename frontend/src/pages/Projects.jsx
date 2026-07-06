import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Projects() {
  const [projects, setProjects] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Projects
  const fetchProjects = async (currentPage = 1) => {
    try {
      const res = await API.get(
        `/projects?page=${currentPage}&limit=5`
      );

      console.log("API Response:", res.data);

      setProjects(res.data.projects);
      setPage(res.data.page);
      setTotalPages(res.data.pages);

    } catch (err) {
      console.log(err);
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);

      alert("Project Deleted Successfully ✅");

      fetchProjects(page);

    } catch (err) {
      console.log(err);
    }
  };

  // Update Project
 const updateProject = async (id) => {
  try {
    const res = await API.put(`/projects/${id}`, {
      status: "Completed",
    });

    alert(res.data.message);

    fetchProjects();

  } catch (err) {
    console.log(err.response?.data);

    alert(err.response?.data?.message);
  }
};

  useEffect(() => {
    fetchProjects(1);
  }, []);

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Projects 📁
        </h1>

        {/* PROJECT LIST */}

        <div className="grid gap-4">

          {projects.length > 0 ? (

            projects.map((p) => (

              <div
                key={p._id}
                className="p-4 bg-white shadow rounded-xl"
              >

                <h2 className="text-xl font-bold">
                  {p.title}
                </h2>

                <p className="text-gray-600">
                  {p.description}
                </p>

                <p className="mt-2">
                  <b>Status:</b> {p.status || "Pending"}
                </p>

                <p>
                  <b>Deadline:</b>{" "}
                  {p.deadline
                    ? new Date(p.deadline).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => updateProject(p._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteProject(p._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center text-gray-500 text-lg">
              No Projects Found
            </div>

          )}

        </div>

        {/* Pagination */}

        <div className="flex justify-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => fetchProjects(page - 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchProjects(page + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default Projects;