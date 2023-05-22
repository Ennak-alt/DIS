"use client";
import Alike from "./alike";
import Single from "./single"
import React, { useState, useEffect } from 'react';

export default function Page({ params, searchParams }) {
  const [data, setData] = useState(null);
  useEffect(() => {
      fetch('http://localhost:8088/post/' + params.id)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);

  return(
    <div>
      <Single car={data}></Single>
      <hr />
      <Alike car={data}></Alike>
    </div>
  )
}