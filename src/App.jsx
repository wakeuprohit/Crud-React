import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [pincode, setPincode] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("India");

  const [records, setRecords] = useState([]);
  const [active, setactive] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (pincode.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => {
          const data = res.data[0];

          if (data.Status === "Success") {
            const postOffice = data.PostOffice;

            const states = [...new Set(postOffice.map((item) => item.State))];
            const cities = [
              ...new Set(postOffice.map((item) => item.District)),
            ];

            setStateList(states);
            setCityList(cities);
          } else {
            setStateList([]);
            setCityList([]);
          }
        })
        .catch((err) => console.log("Error:", err));
    }
  }, [pincode]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = { pincode, state, city, country, active };

    if (editIndex !== null) {
      const updated = [...records];
      updated[editIndex] = newRecord;
      setRecords(updated);
      setEditIndex(null);
    } else {
      setRecords([...records, newRecord]);
    }
    handleReset();
  };
  const handleReset = () => {
    setPincode("");
    setState("");
    setCity("");
    setStateList([]);
    setCityList([]);
    setactive(true);
  };
  const handleEdit = (index) => {
    const item = records[index];

    setPincode(item.pincode);
    setState(item.state);
    setCity(item.city);
    setactive(item.active);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };
  const toggleActive = (index) => {
    const update = [...savereacord];
    update[index].active = !update[index].active;
    setsavereacord(update);
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">CURD</h3>

      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                value={pincode}
                placeholder="Enter 6 digit pincode"
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control value={country} disabled />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select State</option>
                {stateList.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {cityList.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" className="w-100" variant="primary">
              {editIndex !== null ? "Update Record" : "Add Record"}
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleReset}>
              reset
            </Button>
          </Col>
        </Row>
        <Row className="mc-3">
          <Col>
            <Form.Check
              type="switch"
              label={active ? "status:active" : "status:inactive"}
              checked={active}
              onChange={() => setactive(!active)}
            />
          </Col>
        </Row>
      </Form>
      <Table bordered striped hover className="mt-4 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Pincode</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Status</th>
            <th width="150px">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{rec.pincode}</td>
              <td>{rec.state}</td>
              <td>{rec.city}</td>
              <td>{rec.country}</td>
              <td>{rec.active ? "Active" : "inactive"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
// import React from 'react'

// import Crud from './component/Crud';

// export default function App() {
//   return (
//    <>
//     <Crud/>
//    </>
//   )
// }
