"use client";
import Recommended from "./recommended";
import Post from "./post"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/carService";
import UserService from "@/app/api/userService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, rec: [DefaultCar], seller: UserService.DefaultSeller});
  useEffect(() => {
    CarService.GetPost(params.id).then(async car => {
      const [rec, seller] = await Promise.all([CarService.GetRecommended(car),
                                               UserService.GetSeller(car.seller_id)]);
      setData({car, rec, seller});
    });
  }, []);

  return(
    <div>
      <Post car={data.car} seller={data.seller}></Post>
      <hr />
      <p className="text-lg font-bold relative mx-auto max-w-screen-xl px-24 pt-8 pb-2">Recommended cars:</p>
      <Recommended cars={data.rec}></Recommended>
      <br/><br/><br/><br/><br/>
    </div>
  )
}