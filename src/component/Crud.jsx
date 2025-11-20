import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
 import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";

export default function Crud() {
  const [pincode,setPincode]=useState("");
  const[stateList,setStateList]=useState([]);
  const[cityList,setCityList]=useState([]);
  const[state,setstate]=useState("");
  const[city,setCity]=useState("");
  const[country]=useState("India");
  const[records,setRecords]=useState([])
  const[editIndex,setEditIndex]=useState(null); 
  useEffect(()=>{
    if(pincode.length===6){
      axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res)=>{
        const data=res.data[0];
        if(data.Status==="Success"){
          const PostOffice=data.PostOffice;
        
        const states=[...new Set(PostOffice.map((item)=>
          item.State))];
          const cities=[...new Set(PostOffice.map((item)=item.District))];
          setStateList(states);
          setCityList(cities);
        

      }else{
        setCityList([]);
        setStateList([])
      }
      })
      .catch((err)=>console.log("Error:",err));
  }
},[pincode]);
const handleSubmit=(e)=>{
  e.preventDefault();
  const newRecord={pincode,state,city,country};
  if (editIndex!==null){
    const updated=[...records];
    updated[editIndex]=newRecord;
    setRecords(updated);
    setEditIndex(null);
  
  }
  else{
    setRecords([...records,newRecord]);
  }
  setPincode("");
  setstate("");
  setCity("");
  setStateList([]);
  setCityList([]);
};
const handleEdit=(index)=>{
  const item=records[index];
  setPincode(item.pincode);
  setstate(item.state);
  setCity(item.city);
  setEditIndex(index);
}
const handleDelete=(index)=>{
  setRecords(records.filter((_,i)=>i!==index));
};
 return (
    <>
     <Container ClasssNmae="mt-4">
      <h3 className='text-center mb-4'> CURD</h3>
      <Form onSubmit={handleSubmit} className='p-4 border rounded shadow-sm bg-light'>
        <Row className='mb-3'>
        <Col>
          <Form.Group>
            <Form.Label>Pincode</Form.Label>
            <Form.Control type='number' value={pincode}
            placeholder='Enter pin code '
            onChange={(e)=>setPincode(e.target.value)} required/>

          </Form.Group>        
          </Col>
          
        </Row>
      </Form>
     </Container>
    </>
  );
}
