import React, { useState, useEffect } from 'react';
import {Car} from "@/app/api/hello/carService";

export default function Alike(props: {cars: Car[]}) {

    const cards = [];
    for(let c of props.cars) {
        console.log(c)
        cards.push(<Card
                    cartype= {c.cartype}
                    paint_color = {c.paint_color}
                    price = {c.price}
                    manufacturer = {c.manufacturer}
                    model = {c.model}
                    odometer = {c.odometer}
                ></Card>)
    }

    return (
        <div className="flex flex row">
            {cards}
        </div>
    )
}

// export function Card(props) {
//     return (
//     <div>
//         <p>cartype: {props.cartype}</p>
//         <p>color: {props.paint_color}</p>
//         <p>price: {props.price}</p>
//     </div>
//     )
// }


export function Card(props) {
    return (
        <div className='pr-10'>
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
            <img
                alt="Cartype-image"
                //src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
                <div>
                    <dd className="font-medium">{props.manufacturer}, {props.model}</dd>
                </div>

                <div>
                    <dt className="sr-only">Price</dt>
                    <dd className="text-sm text-gray-500">${props.price}</dd>
                </div>

                <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500 pr-10">Type</p>
                        <p className="font-medium">{props.cartype}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500 pr-10">Color</p>
                        <p className="font-medium">{props.paint_color}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500 pr-10">Odometer</p>
                        <p className="font-medium">{props.odometer} mi</p>
                        </div>
                    </div>
                </div>
            </div>
            </a>
        </div>
    )
}