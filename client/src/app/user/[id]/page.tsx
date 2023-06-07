'use client';

import UserService, { UserData } from "@/app/api/userService"
import UserCard from "../userCard";
import { useEffect, useState } from "react";
import CarService, { Car } from "@/app/api/carService";
import { DefaultCar } from "@/app/api/carService";
import Recommended from "@/app/posts/[id]/recommended"

export default function Page(params: {params: {id: string}, searchParams: any}) {
    const [data, setData] = useState<{user: UserData, cars: Car[]}>({user: UserService.DefaultUser, cars: []});
    useEffect(() => {
        (async() => {
            const user = await UserService.GetUser(params.params.id);
            const search = DefaultCar;
            search.id = "";
            search.cartype = "";
            search.paint_color = "",
            search.price = -1;
            search.seller_id = params.params.id;
            const cars = await CarService.GetSellerCars(params.params.id);
            setData({user, cars});
        })();
    }, []);

    return (
        <div>
            <section className="bg-gray-100 dark:bg-gray-100 pt-16 pb-5">
                <UserCard own={false} clickable={false} {...data.user}></UserCard><br/>
                <div className="text-center">
                    <a className="text-3xl text-center font-semibold">Posts</a>
                </div>
            </section>
            <div className='pt-5'>
                <Recommended cars={data.cars["cars"] == undefined ? [DefaultCar] : data.cars["cars"]}></Recommended>
            </div>
            <br/><br/><br/><br/><br/>
        </div>
    )
}
