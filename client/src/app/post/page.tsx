"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './card';
import { Car } from '../api/hello/carService';

export default function Page({ params, searchParams }) {
    const [cars, setCars] = useState<Car[]>([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch('http://localhost:8088/posts/')
            .then(response => response.json())
            .then(json => {
                setCars(json)
                console.log(json)
            })
            .catch(error => console.error(error));
    }, [page]);

    return (
        <div className='flex gap-7 justify-around'>
            <div className='grid grid-cols-1 md:grid-cols-2 place-content-center'>
                {cars.length === 0 ? "hello" : cars.map((car) => <Card car={car} />)}

            </div>
        </div>
    )
} 