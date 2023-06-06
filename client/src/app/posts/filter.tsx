import { Car, CarCategories } from '../api/carService';
import React, { useState, useEffect } from 'react';
interface props {
    cat: string,
    availablecats: string[],
    usedCats: CarCategories,
    setCats: React.Dispatch<React.SetStateAction<CarCategories>>,
}


export const Filter: React.FC<props> = ({cat, availablecats, usedCats, setCats}: props) => {
    const reset = () => {
        setCats({...usedCats, [cat]: []})
    }
    
    const setCategory = (catname: string) => {
        let c = (usedCats[cat]) as string[]

        if (c.includes(catname)) {
            c = c.splice(c.indexOf(catname, 1))
        } else {
            c.push(catname)
        }
        setCats({...usedCats, [cat]: c})
    }

    return (
    <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
                <span className="text-sm font-medium"> {cat} </span>

                <span className="transition group-open:-rotate-180">
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

            <div
                className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
            >
                <div className="w-96 rounded border border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">

                        <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                            onClick={reset}
                        >
                            Reset
                        </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        {availablecats.map((categoryName) => {
                            return (
                                <li>
                                    <label htmlFor={categoryName} className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={categoryName}
                                            checked={(usedCats[cat] as string[]).includes(categoryName)}
                                            onChange={() => setCategory(categoryName)}
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            {categoryName}
                                        </span>
                                    </label>
                                </li>
                            )
                            })}
                    </ul>
                </div>
            </div>
        </details>
    </div>
    )
}

export const FilterMINMAX: React.FC<props> = ({cat, minValue, maxValue, setComponent}: props) => {
    const [sliderValue, setSliderValue] = useState(maxValue/2)
    const sliderHandler = (e) => {
        setSliderValue(parseInt(e.target.value))
    }

    return(
        <div className="relative">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
                <span className="text-sm font-medium"> {cat} </span>

                <span className="transition group-open:-rotate-180">
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

            <div
                className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
            >
                <div className="w-96 rounded border border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                    <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                    >
                    Reset
                    </button>
                </header>

                <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between gap-4">
                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                        <input
                        min={minValue}
                        max={maxValue}
                        type="range"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        onChange={sliderHandler}
                        />
                        <p>{sliderValue}</p>
                    </label>

                    </div>
                </div>
                </div>
            </div>
            </details>

        </div>
    )
}