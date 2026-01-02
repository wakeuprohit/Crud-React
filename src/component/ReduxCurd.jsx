import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "../Redux/userSlice";
import { useState } from "react";

export default function ReduxCurd() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    active: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editUserId, setEditUserId] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUserId) {
      dispatch(updateUser({ id: editUserId, ...formData }));
      setEditUserId(null);
    } else {
      dispatch(addUser(formData));
    }
    setFormData(initialFormState);
  };
  const handleEdit = (user) => {
    setEditUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      active: user.active,
    });
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">CURD</h2>

        <div className="card p-3 shadow">
          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-1 d-flex align-items-center">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Active
                </label>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-md-2 mt-3">
              <button className="btn btn-primary w-100" onClick={handleSubmit}>
                {editUserId ? "Update" : "Add"}
              </button>
            </div>
            <div className="col-md-2 mt-3">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setFormData(initialFormState);
                  setEditUserId(null);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <table className="table table-bordered table-striped mt-4 text-center">
          <thead className="table-dark">
            <tr>
              <th>Naam</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6">Nothing in table</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
