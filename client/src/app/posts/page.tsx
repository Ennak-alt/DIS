"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './card';
import CarService, { Car, ICarCategories, CarCategories, defaultCategories} from '../api/carService';
import { Filter, FilterMINMAX } from './filter';
import { all } from 'axios';
import Link from 'next/link';
import { NumericFilter } from './numericFilter';

const categoryNames = [
    "cartype",
    "price",
    "cylinders",
    "paint_color",
    "odometer",
    "drive",
    "size",
    "condition",
    "fuel",
    "transmission",
]

export default function Page() {
    const [cars, setCars] = useState<Car[]>([])
    const [count, setCount] = useState<number>(0)
    const [allcategories, setAllCategories] = useState<ICarCategories | null>(null)
    const [usedCategories, setUsedCategories] = useState<CarCategories>(defaultCategories)
    const [categoryChange, setCategoryChange] = useState<boolean>(false)
    const [page, setPage] = useState(1)
    const [prev, setPrev] = useState(false)
    const [openCat, setOpenCat] = useState("")

    useEffect(() => {
        console.log("changed")
        window.scrollTo(0, 0)
        setCategoryChange(true)
        setPage(1)
    }, [usedCategories])

    useEffect(() => {
        CarService.GetCategories().then(async categories => {
            setAllCategories(categories)
        })
    }, [])

    useEffect(() => {

        window.scrollTo(0, 0)
        var idx = "?"
        if (page === 1)  {
            console.log("Bip bip")
            idx = "?"
        }
        else if (cars.length != 0) {
            if (prev) {
                idx += "idx=" + cars[0].idx + "&idx_order=prev&"
            } else {
                idx += "idx=" + cars[cars.length-1].idx + "&"
            }
        }

        const search = categoryNames.reduce((acc1, cur1) => {
            console.log(cur1)
            console.log(acc1)
            if (cur1 === "price" || cur1 === "odometer" || cur1 === "cylinders") {
                if (usedCategories[cur1+"To"] !== 0) {
                    return acc1 + `${cur1}=${usedCategories[cur1+"From"]},${usedCategories[cur1+"To"]}&`
                }
                return acc1
            }
            return (
                acc1 + (usedCategories[cur1] as string[]).reduce((acc2, cur2) => {
                    console.log(cur2)
                    return acc2 + `${cur1}=${cur2}&`
                }, "")
            )
        }, "")

        fetch('http://localhost:8088/posts/' + idx + search)
            .then(response => response.json())
            .then(json => {
                setCars(json["cars"])
                setCount(json["count"])
            })
            .catch(error => console.error(error));
        setCategoryChange(false)
    }, [page, categoryChange]);

    return (
        <div className='flex flex-col items-center gap-5 m-5'>
            <div className='flex flex-row gap-5'>
                {allcategories && categoryNames.map((value) => {
                    if (value === "price" || value === "odometer" || value === "cylinders") {
                        return (
                            <div>
                                <NumericFilter
                                    opencat={openCat}
                                    setOpenCat={setOpenCat}
                                    cat={value}
                                    usedCats={usedCategories}
                                    minValue = {allcategories[value+"From"] as number}
                                    maxValue = {allcategories[value+"To"] as number}
                                    setCats={setUsedCategories}
                                    unit={value}
                                    />
                            </div>
                        )
                    } else {
                        return (
                            <Filter
                                opencat={openCat}
                                setOpenCat={setOpenCat}
                                cat={value}
                                availablecats={allcategories[value] as string[]}
                                usedCats={usedCategories}
                                setCats={setUsedCategories}
                                key={value}/>
                                )
                            }
                        })}
            </div>
            <p>{count == undefined ? "Loading..." : `Found ${count} cars`}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 place-content-center'>
                {!Array.isArray(cars) || cars.length === 0 ? "" : cars.map((car) => <Card car={car} />)}
            </div>
            <Pagination page={page} setPage={setPage} setPrev={setPrev} nextPage={!Array.isArray(cars) || cars.length !== 10}/>

        </div>
    )
}

interface props {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPrev: React.Dispatch<React.SetStateAction<boolean>>,
    nextPage: boolean,
}

const Pagination = ({page, setPage, setPrev, nextPage}: props) => {
    return (
        <div
            className="inline-flex items-center justify-center rounded bg-blue-600 py-1 text-white"
        >
            { page != 1 && <button
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
            </button>}

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

            {!nextPage && <button
                onClick={() => {setPage(page+1); setPrev(false)}}
                className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180"
                disabled={nextPage}
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
            </button>}
        </div>
    )
}