import React, { useState } from "react";
import "/public/style.css";
import { Alert } from "bootstrap";
export default function Simplecurd() {
  let [name, setname] = useState("");
  let [addstate, callstate] = useState([]);
  let [editIndex, setEditIndex] = useState(null);
  function Addrecord(e) {
    e.preventDefault();

    if (editIndex !== null) {
      let updated = [...addstate];
      updated[editIndex] = name;
      callstate(updated);
      setEditIndex(null);
    } else {
      callstate([...addstate, name]);
    }
    setname("");
  }
  function handleEdit(index) {
    let item = addstate[index];
    setname(item);
    setEditIndex(index);
  }
  function handleDelete(index) {
    if (index !== null && index >= 0) {
      callstate(addstate.filter((_, i) => i !== index));
    }
    setname("");
    setEditIndex(null);
  }

  return (
    <>
      <h1>Simple</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Addrecord(e);
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          placeholder="Enter name"
        />

        <button type="submit">
          {editIndex !== null ? "update" : "Add"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </form>
      <table border={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addstate.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
