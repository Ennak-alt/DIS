"use client";
import React, { useState, useEffect } from 'react';

export default function Page({ params, searchParams }) {
    const [cars, setCars] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch('http://localhost:8088/post?number=' + page*10)
          .then(response => response.json())
          .then(json => {
                setCars(json)
                console.log(json)
            })
          .catch(error => console.error(error));
      }, [page]);

    return (
        <div>
        { cars.length === 0 ? "hello" : cars.map((car) => <div>{car.idx}</div>)}
        <button onClick={() => setPage(page+1)}>
        Click me!
        </button>

        </div>
    )
} 