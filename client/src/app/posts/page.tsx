"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './card';
import { Car } from '../api/carService';
import { Filter } from './filter';

export default function Page({ params, searchParams }) {
    const [cars, setCars] = useState<Car[]>([])
    const [categories, setCategories] = useState<CarCategories>(null)
    // const [idx, setIdx] = useState<string>("")
    const [page, setPage] = useState(1)
    const [prev, setPrev] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        var idx = ""
        if (cars.length != 0) {
            if (prev) {
                idx = "?idx=" + cars[0].idx + "&idx_order=prev"
            } else {
                idx = "?idx=" + cars[cars.length-1].idx
            }
        }

        let specfic_search = (searchParams.cartype != undefined) ? '?cartype=' + searchParams.cartype : ""
        fetch('http://localhost:8088/posts/' + idx + specfic_search)
            .then(response => response.json())
            .then(json => {
                console.log("hello")
                setCars(json)
                console.log(json)
            })
            .catch(error => console.error(error));
    }, [page]);

    return (
        <div className='flex flex-col items-center gap-5 m-5'>
            {Object.entries(categories).forEach(([key, value]) => {

            })}

            <div className='grid grid-cols-1 md:grid-cols-2 place-content-center'>
                {cars.length === 0 ? "Loading..." : cars.map((car) => <Card car={car} />)}
            </div>
            <Pagination page={page} setPage={setPage} setPrev={setPrev}/>

        </div>
    )
}

interface props {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
    setPrev: React.Dispatch<React.SetStateAction<boolean>>
}

const Pagination = ({page, setPage, setPrev}: props) => {
    return (
        <div
            className="inline-flex items-center justify-center rounded bg-blue-600 py-1 text-white"
        >
            <button
                onClick={() => {if (page != 1) {setPage(page-1); setPrev(true)}}}
                className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180"
                disabled={page == 1}
            >
                <span className="sr-only">Prev Page</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <span className="h-4 w-px bg-white/25" aria-hidden="true"></span>

            <div>
                <label htmlFor="PaginationPage" className="sr-only">Page</label>
                <input
                    disabled={true}
                    type="number"
                    className="h-8 w-12 rounded border-none bg-transparent p-0 text-center text-xs font-medium [-moz-appearance:_textfield] focus:outline-none focus:ring-inset focus:ring-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    min="1"
                    value={page}
                    id="PaginationPage"
                />
            </div>

            <span className="h-4 w-px bg-white/25"></span>

            <button
                onClick={() => {setPage(page+1); setPrev(false)}}
                className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180"
            >
                <span className="sr-only">Next Page</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}