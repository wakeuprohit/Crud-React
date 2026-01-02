import React, { useState } from "react";
import "/public/style.css";
import { Alert } from "bootstrap";
export default function Simplecurd() {
  const [addstate, callstate] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const intialValue = {
    name: "",
    age: "",
    city: "",
    isactve: true,
  };
  const [Form, setFormData] = useState(intialValue);

  function Addrecord(e) {
    e.preventDefault();
    const { name, age, city } = Form;

    if (editIndex !== null) {
      // const updated = [...addstate];
      // updated[editIndex] = { ...Form };
      // callstate(updated);
      // setEditIndex(null);
      callstate((prev) => {
        const updated = [...prev];
        updated[editIndex] = { ...Form };
        return updated;
      });
      setEditIndex(null);   
    } else {
      // callstate([...addstate, { ...Form }]);
      callstate((prev) => [...prev, { ...Form }]);
    }
    setFormData(intialValue);
  }
  function handleEdit(index) {
    const item = addstate[index];
    setFormData(item);
    setEditIndex(index);
  }
  function handleDelete(index) {
    if (index !== null && index >= 0) {
      callstate(addstate.filter((_, i) => i !== index));
    }
    setFormData(intialValue);
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
          value={Form.name}
          onChange={(e) => setFormData({ ...Form, name: e.target.value })}
          required
          placeholder="Enter name"
        />
        <input
          type="text"
          value={Form.age}
          onChange={(e) => setFormData({ ...Form, age: e.target.value })}
          required
          placeholder="Enter age"
        />
        <input
          type="text"
          value={Form.city}
          onChange={(e) => setFormData({ ...Form, city: e.target.value })}
          required
          placeholder="Enter city"
        />
        <button type="submit">{editIndex !== null ? "update" : "Add"}</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
      <table border={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addstate.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
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
