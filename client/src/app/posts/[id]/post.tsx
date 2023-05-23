import {Car} from "@/app/api/hello/carService";
import Image from 'next/image'
import React, {useState} from 'react';

export default function Post (props: {car: Car}) {
    return (
        <div>
            <section>
            <div className="relative mx-auto max-w-screen-xl px-4 py-10">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                    <Image
                        width={10000}
                        height={100}
                        src={`/Cars/${props.car.cartype}.jpeg`}
                    />
                    <div className="-ms-0.5 flex">
                        !!SELLER INFO!!
                    </div>
                </div>
                <div className="sticky top-0">
                    <div className="flex justify-between">
                        <div className="max-w-[35ch] space-y-2">
                            <h1 className="text-xl font-bold sm:text-2xl"> {props.car.manufacturer}, {props.car.model} </h1>
                            <p className="text-lg font-bold">${props.car.price}</p>
                            <p className="text-sm">Type: {props.car.cartype}</p>
                            <p className="text-sm">Size: {props.car.size}</p>
                            <p className="text-sm">Year: {props.car.caryear}</p>
                            <p className="text-sm">Condition: {props.car.condition}</p>
                            <p className="text-sm">Color: {props.car.paint_color}</p>
                            <p className="text-sm">Transmission: {props.car.transmission}</p>
                            <p className="text-sm">Drive: {props.car.drive}</p>
                            <p className="text-sm">Odometer: {props.car.odometer} mi</p>
                            <p className="text-sm">Fuel: {props.car.fuel}</p>
                            <p className="text-sm">Cylinders: {props.car.cylinders}</p>
                            <p className="text-sm">VIN: {props.car.VIN}</p>
                            <p className="text-sm">Posted on: {props.car.posting_date.slice(0, 10)}</p>
                            <p className="text-sm">Location: {props.car.region}, {props.car.carstate}</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Expand desc={props.car.cardescription}></Expand>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    )
}

const Expand = ({desc}) => {
    let [expanded, setExpanded] = useState(true)
    if (desc.length <= 210) return (<div>{desc}</div>)
    let text = expanded ? desc.substring(0, 210) : desc
    return (
        <>
        <div>{text}...</div>
        <button className="mt-2 text-sm font-medium underline" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Read more" : "Read less"}
        </button>
        </>
    )
}
