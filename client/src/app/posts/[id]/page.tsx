"use client";
import Recommended from "./recommended";
import Post from "./post"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/hello/carService";
import UserService from "@/app/api/hello/userService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, rec: [DefaultCar], seller: UserService.DefaultUser});
  useEffect(() => {
    CarService.GetPost(params.id).then(async car => {
      const [rec, seller] = await Promise.all([CarService.GetRecommended(car),
                                               UserService.GetUser(car.seller_id)]);
      setData({car, rec, seller});
    });
  }, []);

  return(
    <div>
      <Post car={data.car} seller={data.seller}></Post>
      <hr />
      <p className="text-lg font-bold relative mx-auto max-w-screen-xl px-24 pt-8 pb-2">Recommended cars:</p>
      <Recommended cars={data.rec}></Recommended>
    </div>
  )
}