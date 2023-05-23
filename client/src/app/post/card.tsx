import Link from "next/link"
import Image from "next/image"
import { Car } from "../api/hello/carService"

export function Card(props: {car: Car}) {
    return (
        <Link href ={`/post/${props.car.id}`}>
            <div className='pr-10'>
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
            <Image
                width={500}
                height={500}
                src={`/Cars/${props.car.cartype}.jpeg`}
                alt={`${props.car.cartype}`}
            />

            <div className="mt-2">
                <div>
                    <dd className="font-medium">{props.car.manufacturer}, {props.car.model}</dd>
                </div>

                <div>
                    <dt className="sr-only">Price</dt>
                    <dd className="text-sm text-gray-500">${props.car.price}</dd>
                </div>

                <div className="mt-6 flex items-center gap-8 text-xs">
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
                </div>
            </div>
            </a>
        </div>
        </Link>
    )
}