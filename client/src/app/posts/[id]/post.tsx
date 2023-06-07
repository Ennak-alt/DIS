import {Car} from "@/app/api/carService";
import { SellerData } from "@/app/api/userService";
import UserCard from "@/app/user/userCard";
import Image from 'next/image'
import React, {useState} from 'react';

export default function Post (props: {car: Car, seller: SellerData}) {
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
                    <div className="-ms-0.5 flex" style={{position: "relative"}}>
                        {/* <span style={{height: "10em"}}></span> */}
                        <span style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}><UserCard {...props.seller} own={false} clickable={true}>
                            </UserCard>
                            <table className="text-sm my-3">
                                <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td className="px-2 py-2">{props.seller.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                    <td className="px-2 py-2">{props.seller.phone}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                    <td className="px-2 py-2">{props.seller.address}</td>
                                </tr>
                                </tbody>
                            </table>

                            {/* <div>
                                <span><b>Email:</b><br/> {props.seller.email}</span><br/>
                                <span><b>Phone:</b><br/> {props.seller.phone}</span><br/>
                                <span><b>Address:</b><br/> {props.seller.address}</span>
                            </div> */}
                        </span>
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
    if (desc.length <= 510) return (<div>{desc}</div>)
    let text = expanded ? desc.substring(0, 510) : desc
    return (
        <>
        <div>{text}...</div>
        <button className="mt-2 text-sm font-medium underline" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Read more" : "Read less"}
        </button>
        </>
    )
}
