import React, { useEffect, useState } from "react";

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Randomusers = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",

    lastName: "",

    email: "",

    department: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Users

  // Fetch Users
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        const formattedUsers = response.data.results.map((user, index) => ({
          id: index + 1, // This will give sequential numbers starting from 1
          firstName: user.name.first,
          lastName: user.name.last,
          email: user.email,
          department: user.department || "", // Add a placeholder department
        }));
        setUsers(formattedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Search Filter

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Form Change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update User

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Update User

      const updatedUsers = users.map((user) =>
        user.id === editingId ? { ...user, ...formData } : user
      );

      setUsers(updatedUsers);

      setEditingId(null);
    } else {
      // Create New User

      const newUser = {
        id: users.length + 1,

        ...formData,
      };

      setUsers([...users, newUser]);
    }

    // Reset Form

    setFormData({ firstName: "", lastName: "", email: "", department: "" });
  };

  // Edit User

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);

    setFormData({
      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      department: user.department,
    });

    setEditingId(id);
  };

  // Delete User

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);
  };

  return (
    <div>
      <h3 className="text-center fs-4 fw-bold">Users Information</h3>

      {/* Search Box */}

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search by Name or Department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add / Edit User Form */}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <br />

        <button type="submit" className="btn btn-primary">
          {editingId !== null ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Users Table */}

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Email</th>

            <th>Department</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="text-center">{user.id}</td>

              <td>{user.firstName}</td>

              <td>{user.lastName}</td>

              <td>{user.email}</td>

              <td>{user.department}</td>

              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Randomusers;