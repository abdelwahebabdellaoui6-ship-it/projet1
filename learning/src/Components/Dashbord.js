// src/Components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [activeTab, setActiveTab] = useState("users");

  // ==========================================
  // USERS STATE
  // ==========================================
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur Users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(userForm),
    });

    fetchUsers();
    setUserForm({ username: "", email: "", password: "", role: "user" });
  };

  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setUserForm({ username: user.username, email: user.email, password: "", role: user.role });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(userForm),
    });
    setEditingUserId(null);
    setUserForm({ username: "", email: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  // ==========================================
  // COURSES STATE
  // ==========================================
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    instructor: "",
    image: "",
    price: "",
    originalPrice: "",
  });

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:5000/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseForm),
    });

    fetchCourses();
    setCourseForm({
      title: "",
      description: "",
      category: "",
      level: "",
      instructor: "",
      image: "",
      price: "",
      originalPrice: "",
    });
  };

  const handleEditCourse = (c) => {
    setEditingCourse(c._id);
    setCourseForm(c);
  };

  const handleSaveCourse = async () => {
    await fetch(`http://localhost:5000/api/courses/${editingCourse}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseForm),
    });

    setEditingCourse(null);
    fetchCourses();
  };

  const handleDeleteCourse = async (id) => {
    await fetch(`http://localhost:5000/api/courses/${id}`, { method: "DELETE" });
    fetchCourses();
  };

  // ==========================================
  // INSTRUCTORS STATE
  // ==========================================
  const [instructors, setInstructors] = useState([]);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [formInstructor, setFormInstructor] = useState({
    name: "",
    specialty: "",
    category: "",
    image: "",
    rating: 5,
    students: 0,
    courses: 0,
    description: "",
    achievements: [],
    social: { linkedin: "", twitter: "", website: "" },
  });

  const fetchInstructors = async () => {
    const res = await fetch("http://localhost:5000/api/instructors");
    const data = await res.json();
    setInstructors(data);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleInstructorSubmit = async (e) => {
    e.preventDefault();

    if (editingInstructor) {
      await fetch(`http://localhost:5000/api/instructors/${editingInstructor}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInstructor),
      });
    } else {
      await fetch("http://localhost:5000/api/instructors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInstructor),
      });
    }

    fetchInstructors();
    setEditingInstructor(null);
    setFormInstructor({
      name: "",
      specialty: "",
      category: "",
      image: "",
      rating: 5,
      students: 0,
      courses: 0,
      description: "",
      achievements: [],
      social: { linkedin: "", twitter: "", website: "" },
    });
  };

  const handleDeleteInstructor = async (id) => {
    await fetch(`http://localhost:5000/api/instructors/${id}`, { method: "DELETE" });
    fetchInstructors();
  };

  const handleEditInstructor = (inst) => {
    setEditingInstructor(inst._id);
    setFormInstructor(inst);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="dashboard-container">
      <h1>Dashboard Admin</h1>

      {/* TABS */}
      <div className="tabs">
        <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</button>
        <button onClick={() => setActiveTab("courses")} className={activeTab === "courses" ? "active" : ""}>Courses</button>
        <button onClick={() => setActiveTab("instructors")} className={activeTab === "instructors" ? "active" : ""}>Instructors</button>
      </div>

      {/* ================= USERS TAB ================= */}
      {activeTab === "users" && (
        <div>
          <h2>Gestion des Utilisateurs</h2>

          <form onSubmit={editingUserId ? handleUpdateUser : handleAddUser}>
            <input name="username" placeholder="Nom" onChange={handleUserChange} value={userForm.username} />
            <input name="email" placeholder="Email" onChange={handleUserChange} value={userForm.email} />
            <input name="password" placeholder="Mot de passe" type="password" onChange={handleUserChange} value={userForm.password} />
            <select name="role" onChange={handleUserChange} value={userForm.role}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">{editingUserId ? "Mettre à jour" : "Ajouter"}</button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleEditUser(u)}><Edit2 /></button>
                    <button onClick={() => handleDeleteUser(u._id)}><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= COURSES TAB ================= */}
      {activeTab === "courses" && (
        <div>
          <h2>Gestion des Cours</h2>

          <div className="form">
            <input name="title" placeholder="Titre" onChange={handleCourseChange} value={courseForm.title} />
            <input name="description" placeholder="Description" onChange={handleCourseChange} value={courseForm.description} />
            <input name="category" placeholder="Catégorie" onChange={handleCourseChange} value={courseForm.category} />
            <input name="level" placeholder="Niveau" onChange={handleCourseChange} value={courseForm.level} />
            <input name="instructor" placeholder="Instructeur" onChange={handleCourseChange} value={courseForm.instructor} />
            <input name="image" placeholder="Image" onChange={handleCourseChange} value={courseForm.image} />
            <input name="price" placeholder="Prix" onChange={handleCourseChange} value={courseForm.price} />
            <input name="originalPrice" placeholder="Ancien Prix" onChange={handleCourseChange} value={courseForm.originalPrice} />

            {editingCourse ? (
              <button onClick={handleSaveCourse}><Save /> Modifier</button>
            ) : (
              <button onClick={handleAddCourse}><Plus /> Ajouter</button>
            )}
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Niveau</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.level}</td>
                  <td>{c.price}€</td>
                  <td>
                    <button onClick={() => handleEditCourse(c)}><Edit2 /></button>
                    <button onClick={() => handleDeleteCourse(c._id)}><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= INSTRUCTORS TAB ================= */}
      {activeTab === "instructors" && (
        <div>
          <h2>Gestion des Formateurs</h2>

          <form onSubmit={handleInstructorSubmit}>
            <input placeholder="Nom" value={formInstructor.name} onChange={(e) => setFormInstructor({ ...formInstructor, name: e.target.value })} />
            <input placeholder="Spécialité" value={formInstructor.specialty} onChange={(e) => setFormInstructor({ ...formInstructor, specialty: e.target.value })} />
            <input placeholder="Catégorie" value={formInstructor.category} onChange={(e) => setFormInstructor({ ...formInstructor, category: e.target.value })} />
            <input placeholder="Image URL" value={formInstructor.image} onChange={(e) => setFormInstructor({ ...formInstructor, image: e.target.value })} />

            <button type="submit">{editingInstructor ? "Modifier" : "Ajouter"}</button>
          </form>

          <div className="cards">
            {instructors.map((i) => (
              <div className="card" key={i._id}>
                <img src={i.image} alt={i.name} />
                <h3>{i.name}</h3>
                <p>{i.specialty}</p>

                <button onClick={() => handleEditInstructor(i)}><Edit2 /> Modifier</button>
                <button onClick={() => handleDeleteInstructor(i._id)}><Trash2 /> Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
