
#  Project Management System

A full-stack **Project Management System** built using the MERN stack to help teams manage projects and tasks efficiently. The application provides secure user authentication, role-based access control, project and task management, dashboards, comments, search, filtering, and pagination.

---

##  Features

* User Registration & Login (JWT Authentication)
* Role-Based Access Control (Admin, Project Manager, Team Member)
*  Project Management (Create, Read, Update, Delete)
*  Task Management (Create, Read, Update, Delete)
*  Task Comments
* Dashboard with Project & Task Statistics
* Search Functionality
*  Filter Tasks by Status and Priority
*  Pagination for Projects and Tasks
*  Audit Log Support
*  File Attachment Support (Work in Progress)

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Multer

---

##  Project Structure

```
Project-Management-System
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

##  Installation

### Clone the Repository

```bash
git clone https://github.com/Saloni102-bit/Project-Management-System.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects/create`
* PUT `/api/projects/:id`
* DELETE `/api/projects/:id`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks/create`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`
* POST `/api/tasks/:id/comment`

### Dashboard

* GET `/api/dashboard`

### Statistics

* GET `/api/stats`
---

##  Future Enhancements

* Drag & Drop Kanban Board
* Email Notifications
* Real-Time Collaboration
* Improved File Management
* Mobile Responsive Enhancements

---

##  Author

**Saloni Saini**

B.Tech – Computer Science & Engineering

Project: **Project Management System**

---

##  License

This project is developed for educational and internship purposes.
