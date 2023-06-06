import { Car, CarCategories } from '../api/carService';
import React, { useState, useEffect } from 'react';

interface props {
    cat: string,
    minValue: number,
    maxValue: number,
    usedCats: CarCategories,
    setCats: React.Dispatch<React.SetStateAction<CarCategories>>,
}


export const NumericFilter: React.FC<props> = ({ cat, minValue, maxValue, usedCats, setCats }: props) => {
    const setMin = (min: number) => {
        setCats({ ...usedCats, [`${cat}From`]: min})
        console.log("hello")
    }

    const setMax = (max: number) => {
        setCats({ ...usedCats, [`${cat}To`]: max})
        console.log("hello2")
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
                            <span className="text-sm text-gray-700">
                               {`The highest price is ${maxValue}`}
                            </span>

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
                                    <span className="text-sm text-gray-600">$</span>

                                    <input
                                        type="number"
                                        id="FilterPriceFrom"
                                        placeholder="From"
                                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                        onChange={(evt) => setMin(evt.currentTarget.valueAsNumber)}
                                    />
                                </label>

                                <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">$</span>

                                    <input
                                        type="number"
                                        id="FilterPriceTo"
                                        placeholder="To"
                                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                        onChange={(evt) => setMax(evt.currentTarget.valueAsNumber)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    )
}