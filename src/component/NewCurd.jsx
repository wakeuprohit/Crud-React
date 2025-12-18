import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";

export default function NewCurd() {
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [savereacord, setsavereacord] = useState([]);
  const [editindex, seteditindex] = useState(null);
  const [oda, setoda] = useState(false);
  const [active, setactive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      country,
      state,
      city,
      oda,
      pincode,
      active,
    };

    if (editindex !== null) {
      const update = [...savereacord];
      update[editindex] = newRecord;
      setsavereacord(update);
      seteditindex(null);
    } else {
      setsavereacord((prev) => [...prev, newRecord]);
    }
    handleReset();
  };

  const handleReset = () => {
    setcountry("");
    setstate("");
    setcity("");
    setpincode("");
    setoda(false);
    setactive(true);
    seteditindex(null);
  };

  const handleEdit = (index) => {
    const r = savereacord[index];
    setcountry(r.country);
    setstate(r.state);
    setcity(r.city);
    setpincode(r.pincode);
    setoda(r.oda);
    setactive(r.active);
    seteditindex(index);
  };

  const handleDelete = (index) => {
    setsavereacord(savereacord.filter((_, i) => i !== index));
  };

  const toggleActive = (index) => {
    const update = [...savereacord];
    update[index].active = !update[index].active;
    setsavereacord(update);
  };

  return (
    <Container>
      <h2>Curd</h2>
      <Form onSubmit={handleSubmit} className="p-4 border bg-light">
        <Row className="mb-3">
          <Col>
            <Form.Control
              value={country}
              placeholder="enter you country"
              onChange={(e) => setcountry(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Form.Control
              value={state}
              placeholder="enter the state"
              onChange={(e) => setstate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Control
              value={city}
              placeholder="enter you city"
              onChange={(e) => setcity(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Form.Control
              value={pincode}
              placeholder="enter the pincode"
              onChange={(e) => setpincode(e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Check
              type="switch"
              label={oda ? "oda:yes" : "oda:no"}
              checked={oda}
              onChange={() => setoda(!oda)}
            />
          </Col>
          <Col>
            <Form.Check
              type="switch"
              label={active ? "status:active" : "status:inactive"}
              checked={active}
              onChange={() => setactive(!active)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" className="w-100">
              {editindex !== null ? "update" : "save"}
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" className="w-100" onClick={handleReset}>
              reset
            </Button>
          </Col>
        </Row>

        <Table bordered striped hover className="mt-4">
          <thead className="table-dark">
            <tr>
              <th>Contry</th>
              <th>state</th>
              <th>City</th>
              <th>pincode</th>
              <th>oda</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savereacord.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center"></td>
              </tr>
            ) : (
              savereacord.map((r, i) => (
                <tr key={i}>
                  <td>{r.country}</td>
                  <td>{r.state}</td>
                  <td>{r.city}</td>
                  <td>{r.pincode}</td>
                  <td>{r.oda ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant={r.active ? "success" : "secondary"}
                      onClick={() => toggleActive(i)}
                    >
                      {r.active ? "Active" : "Inactive"}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEdit(i)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Form>
    </Container>
  );
}
