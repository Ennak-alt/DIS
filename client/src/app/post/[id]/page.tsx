"use client";
import Recommended from "./recommended";
import Post from "./post"
import React, { useState, useEffect } from 'react';
import CarService, {DefaultCar} from "@/app/api/hello/carService";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState({car: DefaultCar, rec: [DefaultCar]});
  useEffect(() => {
    const car = CarService.GetPost(params.id).then(car => {
      CarService.GetRecommended(car).then(rec => {
        setData({car, rec});
      });
    });
  }, []);

  return(
    <div>
      <Post car={data.car}></Post>
      <hr />
      <p className="text-lg font-bold relative mx-auto max-w-screen-xl px-24 pt-8 pb-2">Recommended cars:</p>
      <Recommended cars={data.rec}></Recommended>
    </div>
  )
}