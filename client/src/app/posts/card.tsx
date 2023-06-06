import Link from "next/link"
import Image from "next/image"
import { Car } from "../api/carService"
import UserCard from "@/app/user/userCard";

export function Card(props: {car: Car}) {
    return (
        <Link href ={`/posts/${props.car.id}`}>
            <div className='mx-10 mt-10'>
                <div
                    style={{
                        backgroundImage: `url(/Cars/${props.car.cartype}.jpeg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'contain',
                        height:"25em",
                        width:"30em"}}>
                </div>

                <div style={{width:"30em"}}>

                    <div>
                        <dd className="font-medium">{props.car.manufacturer}, {props.car.model}</dd>
                    </div>

                    <div>
                        <dt className="sr-only">Price</dt>
                        <dd className="text-sm text-gray-500">${props.car.price}</dd>
                    </div>

                    <div className="mt-1 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 pr-10">Type</p>
                                <p className="font-medium">{props.car.cartype}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 pr-10">Color</p>
                                <p className="font-medium">{props.car.paint_color}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 pr-10">Odometer</p>
                                <p className="font-medium">{props.car.odometer} mi</p>
                            </div>
                        </div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 pr-10">Year</p>
                                <p className="font-medium">{props.car.caryear}</p>
                            </div>
                        </div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 pr-10">Fuel type</p>
                                <p className="font-medium">{props.car.fuel}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}