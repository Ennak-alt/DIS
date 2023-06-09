import { Car, CarCategories } from '../api/carService';
import React, { useState, useEffect } from 'react';

interface props {
    opencat: string
    setOpenCat: React.Dispatch<React.SetStateAction<string>>
    cat: string,
    minValue: number,
    maxValue: number,
    usedCats: CarCategories,
    setCats: React.Dispatch<React.SetStateAction<CarCategories>>,
    unit: string
}


export const NumericFilter: React.FC<props> = ({ opencat, setOpenCat, cat, minValue, maxValue, usedCats, setCats, unit }: props) => {
    const reset = () => {
        setCats({ ...usedCats, [`${cat}From`]: NaN, [`${cat}To`]: NaN })
    }

    const setMin = (min: number) => {
        setCats({ ...usedCats, [`${cat}From`]: min })
    }

    const setMax = (max: number) => {
        setCats({ ...usedCats, [`${cat}To`]: max })
    }

    let unit_string = ""
    let unit_desc = ""
    if (unit == "price") {
        unit_string = "$"
        unit_desc = "The highest price is $" + maxValue + "."
    }
    if (unit == "cylinders") {
        unit_string = "#"
        unit_desc = "The greatest number of cylinders is " + maxValue + "."
    }
    if (unit == "odometer") {
        unit_string = "mi"
        unit_desc = "The highest milage is " + maxValue + "mi."
    }

    return (
        <div className="relative">
            <summary
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                onClick={() => cat === opencat ? setOpenCat("") : setOpenCat(cat)}
            >
                <span className="text-sm font-medium"> {cat} </span>

                <span className={`transition ${cat === opencat && "rotate-180"}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </span>
            </summary>

            {cat === opencat && <div
                className="z-50 absolute start-0 top-auto mt-2"
            >
                <div className="w-96 rounded border border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">
                            {unit_desc}
                            {/* {`The ${unit_desc} is ${maxValue}`} */}
                        </span>

                        <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                            onClick={reset}
                        >
                            Reset
                        </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{unit_string}</span>

                                <input
                                    type="number"
                                    id="FilterPriceFrom"
                                    placeholder="From"
                                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    value={usedCats[`${cat}From`]}
                                    onChange={(evt) => setMin(evt.currentTarget.valueAsNumber)}
                                />
                            </label>

                            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{unit_string}</span>

                                <input
                                    type="number"
                                    id="FilterPriceTo"
                                    placeholder="To"
                                    value={usedCats[`${cat}To`]}
                                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    onChange={(evt) => setMax(evt.currentTarget.valueAsNumber)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}