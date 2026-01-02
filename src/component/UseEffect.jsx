import React, { use } from "react";
import { useEffect, useState } from "react";

const UseEffect = () => {
  const [data, setData] = useState(0);
  useEffect(() => {
    console.log("component is render without dependency");
  });
  useEffect(() => {
    console.log("component is render with empty dependency");
  }, []);
  useEffect(() => {
    console.log("component is render with data dependency");
  }, [data]);

  return (
    <>
      <h1>UseEffect Hook Example</h1>
      <h2>Data:{data}</h2>
      <button onClick={() => setData(data + 1)}>Update Data</button>
    </>
  );
};

export default UseEffect;
